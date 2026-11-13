import { SESSION_TTL_SECONDS } from "../../src/session.js";
import { ADMIN_USERNAME, ADMIN_PASSWORD, jsonResponse } from "./_utils.js";

export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const username = (payload.username || "").trim();
    const password = (payload.password || "").trim();

    const expectedUser = (env && env.ADMIN_USERNAME) || ADMIN_USERNAME;
    const expectedPass = (env && env.ADMIN_PASSWORD) || ADMIN_PASSWORD;

    if (username === expectedUser && password === expectedPass) {
      if (!env?.MEMBERS_KV) {
        return jsonResponse({ success: false, error: "Dịch vụ phiên đăng nhập chưa khả dụng." }, 503);
      }
      const token = crypto.randomUUID();
      const createdAt = Date.now();
      await env.MEMBERS_KV.put(`session:${token}`, JSON.stringify({ username, createdAt }), {
        expirationTtl: SESSION_TTL_SECONDS
      });

      return jsonResponse({
        success: true,
        token,
        expiresAt: createdAt + SESSION_TTL_SECONDS * 1000,
        user: username,
        message: "Login successful"
      });
    } else {
      return jsonResponse({
        success: false,
        error: "Sai tên đăng nhập hoặc mật khẩu!"
      }, 401);
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 400);
  }
}
