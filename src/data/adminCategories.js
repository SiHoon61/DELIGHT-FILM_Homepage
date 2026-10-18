import { isLocalAdminPreview, writeLocalCategories } from "./adminLocalPreview";
import { adminFetch } from "./adminAuth";

export const writeAdminCategories = async (method, body) => {
  if (isLocalAdminPreview) return writeLocalCategories(method, body);
  const response = await adminFetch("/api/admin/categories", {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "카테고리를 저장하지 못했습니다.");
  if (!Number.isInteger(data.changedCount)) throw new Error("카테고리 저장 응답을 확인하지 못했습니다.");
  return data;
};
