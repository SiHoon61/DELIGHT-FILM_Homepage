const { createHmac, randomBytes } = require("node:crypto");
const { getSql } = require("./db");
const { isPasswordHash, verifyPassword } = require("./adminPassword");

const SESSION_SECONDS = 8 * 60 * 60;
const secureCookies = () => {
  if (["production", "preview"].includes(process.env.VERCEL_ENV)) return true;
  return process.env.NODE_ENV !== "development" && process.env.VERCEL_ENV !== "development";
};
const cookieName = () => secureCookies() ? "__Host-delight-admin" : "delight-admin-dev";

const getAuthConfig = () => {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!isPasswordHash(hash) || typeof secret !== "string" || !/^[a-f0-9]{64,}$/.test(secret)) {
    throw new Error("admin_auth_not_configured");
  }
  return { hash, secret };
};

const digest = (value, secret) => createHmac("sha256", secret).update(value).digest("hex");
const sessionDigest = (token, config) => digest(`session:${config.hash}:${token}`, config.secret);
const readToken = (request) => {
  const raw = request.headers?.cookie;
  if (typeof raw !== "string") return null;
  const pair = raw.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${cookieName()}=`));
  const token = pair?.slice(cookieName().length + 1);
  return typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
};

const setCookie = (response, token = "", age = 0) => {
  response.setHeader("Set-Cookie", `${cookieName()}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${secureCookies() ? "; Secure" : ""}`);
};

const sendError = (response, status, error, message) => response.status(status).json({ error, message });

// Cookie-authenticated mutations must originate from this exact web origin.
const isSameOriginJson = (request) => {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) return true;
  const origin = request.headers?.origin;
  const host = request.headers?.host;
  const contentType = request.headers?.["content-type"];
  if (typeof origin !== "string" || typeof host !== "string" || typeof contentType !== "string" || contentType.split(";")[0].trim().toLowerCase() !== "application/json") return false;
  try {
    const parsed = new URL(origin);
    return parsed.host === host.toLowerCase() && parsed.protocol === (secureCookies() ? "https:" : "http:");
  } catch {
    return false;
  }
};

const getAdminSession = async (request) => {
  const config = getAuthConfig();
  const token = readToken(request);
  if (!token) return null;
  const rows = await getSql()`SELECT expires_at AS "expiresAt" FROM admin_sessions
    WHERE token_hash=${sessionDigest(token, config)} AND expires_at > NOW()`;
  return rows[0] || null;
};

const requireAdmin = async (request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (!isSameOriginJson(request)) {
    sendError(response, 403, "invalid_origin", "허용되지 않은 관리자 요청입니다.");
    return false;
  }
  try {
    if (await getAdminSession(request)) return true;
    setCookie(response);
    sendError(response, 401, "authentication_required", "관리자 로그인이 필요합니다.");
  } catch {
    sendError(response, 503, "auth_unavailable", "관리자 인증을 확인하지 못했습니다. 서버 설정과 DB 연결을 확인해주세요.");
  }
  return false;
};

const consumeLoginAttempt = async (request, config) => {
  // Vercel overwrites X-Forwarded-For. Outside Vercel, use the socket IP.
  const forwarded = process.env.VERCEL === "1" && request.headers?.["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : request.socket?.remoteAddress || "unknown";
  const ipKey = `ip:${digest(`login:${ip}`, config.secret)}`;
  const sql = getSql();
  const [attempts] = await sql.transaction((tx) => [
    tx`INSERT INTO admin_login_attempts (scope_key)
       SELECT scope_key FROM unnest(${["global", ipKey]}::text[]) AS scope_key WHERE TRUE ORDER BY scope_key
       ON CONFLICT (scope_key) DO UPDATE SET
         attempts=CASE WHEN admin_login_attempts.window_start <= NOW()-INTERVAL '15 minutes' THEN 1 ELSE admin_login_attempts.attempts+1 END,
         window_start=CASE WHEN admin_login_attempts.window_start <= NOW()-INTERVAL '15 minutes' THEN NOW() ELSE admin_login_attempts.window_start END
       RETURNING scope_key, attempts, CEIL(EXTRACT(EPOCH FROM window_start+INTERVAL '15 minutes'-NOW()))::integer AS retry_after`,
    tx`DELETE FROM admin_login_attempts WHERE window_start < NOW()-INTERVAL '1 day'`,
    tx`DELETE FROM admin_sessions WHERE expires_at <= NOW()`,
  ]);
  const blocked = attempts.filter((row) => row.attempts > (row.scope_key === "global" ? 30 : 5));
  return blocked.length ? Math.max(...blocked.map((row) => row.retry_after), 1) : 0;
};

const loginAdmin = async (request, response, password) => {
  const config = getAuthConfig();
  const retryAfter = await consumeLoginAttempt(request, config);
  if (retryAfter) {
    response.setHeader("Retry-After", String(retryAfter));
    return sendError(response, 429, "login_rate_limited", "로그인 시도가 너무 많습니다. 최대 15분 후 다시 시도해주세요.");
  }
  if (typeof password !== "string" || !password || password.length > 512 || !await verifyPassword(password, config.hash)) {
    return sendError(response, 401, "invalid_credentials", "비밀번호를 확인해주세요.");
  }
  const token = randomBytes(32).toString("base64url");
  const previous = readToken(request);
  const sql = getSql();
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  await sql.transaction((tx) => [
    tx`DELETE FROM admin_sessions WHERE token_hash=${previous ? sessionDigest(previous, config) : ""}`,
    tx`INSERT INTO admin_sessions (token_hash, expires_at) VALUES (${sessionDigest(token, config)}, ${expiresAt})`,
  ]);
  setCookie(response, token, SESSION_SECONDS);
  return response.status(200).json({ authenticated: true, expiresAt });
};

const logoutAdmin = async (request, response) => {
  const config = getAuthConfig();
  const token = readToken(request);
  if (token) await getSql()`DELETE FROM admin_sessions WHERE token_hash=${sessionDigest(token, config)}`;
  setCookie(response);
  return response.status(200).json({ authenticated: false });
};

module.exports = { getAdminSession, isSameOriginJson, loginAdmin, logoutAdmin, requireAdmin };
