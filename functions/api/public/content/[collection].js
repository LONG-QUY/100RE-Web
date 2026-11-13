import { extractToken, jsonResponse, verifyToken } from "../../_utils.js";
import { handlePublicContent } from "../../../../src/routes/content.js";

export async function onRequest({ request, env, params }) {
  if (request.method !== "GET" && !await verifyToken(extractToken(request), env)) {
    return jsonResponse({ error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn." }, 401);
  }
  const result = await handlePublicContent(request, env, params.collection);
  return jsonResponse(result, result.status || (result.error ? 500 : 200));
}
