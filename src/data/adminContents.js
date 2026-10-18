import { isLocalAdminPreview, readLocalContents, writeLocalContents } from "./adminLocalPreview";
import { adminFetch } from "./adminAuth";

const request = async (method, body, signal) => {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  if (isLocalAdminPreview) return method === "GET" ? readLocalContents() : writeLocalContents(method, body);
  const response = await adminFetch("/api/admin/contents", {
    method,
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "콘텐츠 요청을 처리하지 못했습니다.");
  if (method === "GET" && (!Array.isArray(data.items) || !Array.isArray(data.categories))) {
    throw new Error("콘텐츠 API에 연결하지 못했습니다. vercel dev 실행 상태를 확인해주세요.");
  }
  if (method !== "GET" && !Number.isInteger(data.changedCount)) throw new Error("저장 응답을 확인하지 못했습니다.");
  return data;
};

export const fetchAdminContents = (signal) => request("GET", null, signal);
export const writeAdminContents = (method, body) => request(method, body);
