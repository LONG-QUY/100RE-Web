import { extractToken, jsonResponse, verifyToken } from "../../_utils.js";
import { handlePublicMembers } from "../../../../src/routes/members.js";

export async function onRequest({ request, env }) {
  if (request.method !== "GET" && !await verifyToken(extractToken(request), env)) {
    return jsonResponse({ error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn." }, 401);
  }
  const result = await handlePublicMembers(request, env);
  return jsonResponse(result, result.status || (result.error ? 500 : 200));
}
