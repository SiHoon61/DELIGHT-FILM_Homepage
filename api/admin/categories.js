const { ContentApiError } = require("../../server/contentRepository");
const { requireAdmin } = require("../../server/adminAuth");
const { getAdminCategories, writeAdminCategories } = require("../../server/categoryRepository");

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (!await requireAdmin(request, response)) return;
  if (!["GET", "POST", "PUT", "PATCH"].includes(request.method)) {
    response.setHeader("Allow", "GET, POST, PUT, PATCH");
    return response.status(405).json({ error: "method_not_allowed", message: "지원하지 않는 요청입니다." });
  }
  try {
    if (request.method === "GET") return response.status(200).json(await getAdminCategories());
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    const result = await writeAdminCategories(request.method, body || {});
    return response.status(request.method === "POST" ? 201 : 200).json(result);
  } catch (error) {
    if (error instanceof SyntaxError) return response.status(400).json({ error: "invalid_json", message: "요청 형식을 확인해주세요." });
    if (error instanceof ContentApiError) return response.status(error.status).json({ error: error.code, message: error.message });
    console.error("Admin category API failed:", error?.code || "unknown_error");
    return response.status(503).json({ error: "database_unavailable", message: "카테고리를 처리하지 못했습니다. DB 연결 상태를 확인해주세요." });
  }
};
