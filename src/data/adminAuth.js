export const ADMIN_AUTH_REQUIRED = "delight-admin-auth-required";

export const adminFetch = async (url, options = {}) => {
  const response = await fetch(url, { ...options, credentials: "same-origin", cache: "no-store" });
  if (response.status === 401) window.dispatchEvent(new Event(ADMIN_AUTH_REQUIRED));
  return response;
};

const authRequest = async (body, signal) => {
  const response = await fetch("/api/admin/auth", {
    method: body ? "POST" : "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "관리자 인증을 처리하지 못했습니다.");
  if (typeof data.authenticated !== "boolean") throw new Error("인증 API에 연결하지 못했습니다. 서버 실행 상태를 확인해주세요.");
  return data;
};

export const fetchAdminSession = (signal) => authRequest(null, signal);
export const loginAdmin = (password) => authRequest({ action: "login", password });
export const logoutAdmin = () => authRequest({ action: "logout" });
