import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildAuthUrl } from "@/lib/oauth";
import { getBaseUrl, getRedirectUri } from "@/lib/base-url";

export const OAUTH_STATE_COOKIE = "famframe_oauth_state";

/** Kicks off the Google consent flow. */
export async function GET(request: Request) {
  const base = getBaseUrl(request);

  // Fail gracefully if OAuth credentials haven't been configured yet.
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.AUTH_SECRET) {
    return NextResponse.redirect(`${base}/?auth_error=not_configured`);
  }

  const state = crypto.randomUUID();
  const redirectUri = getRedirectUri(request);

  const store = await cookies();
  store.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes to complete the consent flow
  });

  return NextResponse.redirect(buildAuthUrl(redirectUri, state));
}
