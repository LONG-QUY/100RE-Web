export const SESSION_TTL_SECONDS = 86400;

export async function readSession(kv, key) {
  if (!kv) return null;
  const raw = await kv.get(key);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);
    const now = Date.now();
    if (!Number.isFinite(session?.createdAt) || session.createdAt > now) return null;
    return now - session.createdAt < SESSION_TTL_SECONDS * 1000 ? session : null;
  } catch {
    return null;
  }
}
