const { getSql } = require("../../server/db");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      error: "method_not_allowed",
      message: "GET 요청만 지원합니다.",
    });
  }

  response.setHeader("Cache-Control", "no-store");

  try {
    const sql = getSql();
    const result = await sql`SELECT 1 AS connected`;

    return response.status(200).json({
      ok: result[0]?.connected === 1,
      database: "connected",
    });
  } catch (error) {
    console.error("Neon health check failed:", error?.message || "unknown error");
    return response.status(503).json({
      ok: false,
      database: "unavailable",
    });
  }
};
