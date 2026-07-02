/**
 * Resolves the app's public origin so the OAuth redirect URI is stable.
 * Prefers APP_URL (set this in production so it matches the URI registered in
 * Google Cloud Console); otherwise derives it from the incoming request.
 */
export function getBaseUrl(request: Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

export function getRedirectUri(request: Request): string {
  return `${getBaseUrl(request)}/api/auth/callback`;
}
