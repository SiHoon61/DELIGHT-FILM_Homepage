const { createSampleWorksConfig } = require("../../server/sampleWorksConfig");
const { getWorksConfig } = require("../../server/worksRepository");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      error: "method_not_allowed",
      message: "GET 요청만 지원합니다.",
    });
  }

  response.setHeader("Cache-Control", "no-store");

  if (!process.env.DATABASE_URL) {
    return response.status(200).json(createSampleWorksConfig());
  }

  try {
    return response.status(200).json(await getWorksConfig());
  } catch (error) {
    console.error("Works configuration query failed:", error?.message || "unknown error");
    return response.status(503).json({
      error: "database_unavailable",
      message: "Works 설정을 불러오지 못했습니다.",
    });
  }
};
