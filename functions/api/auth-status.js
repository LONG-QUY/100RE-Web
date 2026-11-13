import { readSession, SESSION_TTL_SECONDS } from "../../src/session.js";
import { extractToken, jsonResponse } from "./_utils.js";

export async function onRequestGet({ request, env }) {
  const token = extractToken(request);
  const session = token ? await readSession(env?.MEMBERS_KV, `session:${token}`) : null;
  return jsonResponse({
    authenticated: !!session,
    user: session?.username ?? null,
    expiresAt: session ? session.createdAt + SESSION_TTL_SECONDS * 1000 : null
  });
}
