import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForTokens, fetchGoogleUser } from "@/lib/oauth";
import { writeSession } from "@/lib/session";
import { getBaseUrl, getRedirectUri } from "@/lib/base-url";
import { OAUTH_STATE_COOKIE } from "../google/route";

/** Handles the redirect back from Google: verifies state, exchanges the code. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = getBaseUrl(request);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${base}/?auth_error=${encodeURIComponent(error)}`);
  }

  const store = await cookies();
  const expectedState = store.get(OAUTH_STATE_COOKIE)?.value;
  store.delete(OAUTH_STATE_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(`${base}/?auth_error=invalid_state`);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, getRedirectUri(request));
    const profile = await fetchGoogleUser(tokens.access_token);

    await writeSession({
      user: {
        id: profile.sub,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
      },
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    });

    return NextResponse.redirect(`${base}/dashboard`);
  } catch (e) {
    console.error("OAuth callback failed:", e);
    return NextResponse.redirect(`${base}/?auth_error=exchange_failed`);
  }
}
