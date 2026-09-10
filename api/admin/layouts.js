const {
  LayoutApiError,
  getLayoutScope,
  saveLayoutScope,
} = require("../../server/layoutRepository");

const parseBody = (body) => {
  if (typeof body === "string") return JSON.parse(body);
  return body || {};
};

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  try {
    if (request.method === "GET") {
      return response.status(200).json(
        await getLayoutScope({
          section: request.query?.section,
          categoryId: request.query?.category,
        })
      );
    }

    if (request.method === "PUT") {
      const body = parseBody(request.body);
      return response.status(200).json(
        await saveLayoutScope({
          section: body.section,
          categoryId: body.categoryId,
          device: body.device,
          version: body.version,
          items: body.items,
        })
      );
    }

    response.setHeader("Allow", "GET, PUT");
    return response.status(405).json({
      error: "method_not_allowed",
      message: "GET과 PUT 요청만 지원합니다.",
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return response.status(400).json({
        error: "invalid_json",
        message: "요청 JSON 형식이 올바르지 않습니다.",
      });
    }

    if (error instanceof LayoutApiError) {
      return response.status(error.status).json({
        error: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      });
    }

    console.error("Admin layout API failed:", error?.message || "unknown error");
    return response.status(500).json({
      error: "internal_error",
      message: "배치 설정 처리 중 오류가 발생했습니다.",
    });
  }
};
