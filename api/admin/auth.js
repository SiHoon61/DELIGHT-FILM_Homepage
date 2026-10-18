const { getAdminSession, isSameOriginJson, loginAdmin, logoutAdmin } = require("../../server/adminAuth");

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (!["GET", "POST"].includes(request.method)) {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "method_not_allowed", message: "지원하지 않는 요청입니다." });
  }
  if (!isSameOriginJson(request)) return response.status(403).json({ error: "invalid_origin", message: "허용되지 않은 로그인 요청입니다." });
  try {
    if (request.method === "GET") {
      const session = await getAdminSession(request);
      return response.status(200).json({ authenticated: Boolean(session), ...(session || {}) });
    }
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    if (body?.action === "login") return await loginAdmin(request, response, body.password);
    if (body?.action === "logout") return await logoutAdmin(request, response);
    return response.status(400).json({ error: "invalid_action", message: "로그인 요청 형식을 확인해주세요." });
  } catch (error) {
    if (error instanceof SyntaxError) return response.status(400).json({ error: "invalid_json", message: "로그인 요청 형식을 확인해주세요." });
    // Never log passwords, tokens or connection strings.
    console.error("Admin authentication failed:", error?.code || "auth_unavailable");
    return response.status(503).json({ error: "auth_unavailable", message: "관리자 로그인을 처리하지 못했습니다. 서버 인증 설정과 DB 마이그레이션 상태를 확인해주세요." });
  }
};
