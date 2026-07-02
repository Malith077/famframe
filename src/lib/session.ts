/**
 * Encrypted session stored in an httpOnly cookie.
 *
 * The session holds the Google OAuth tokens plus a small user profile. It is
 * signed (JWT / HS256 via `jose`) with AUTH_SECRET so the client can't tamper
 * with it. Tokens never reach the browser as readable values.
 */
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "famframe_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface Session {
  user: SessionUser;
  accessToken: string;
  refreshToken?: string;
  /** Epoch milliseconds at which `accessToken` expires. */
  expiresAt: number;
}

function getKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      'Missing environment variable "AUTH_SECRET". Generate one with `openssl rand -base64 32`.',
    );
  }
  return new TextEncoder().encode(secret);
}

export async function sealSession(session: Session): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getKey());
}

export async function unsealSession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getKey());
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

/** Reads and verifies the session cookie. Safe to call from Server Components. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return unsealSession(token);
}

/** Persists a session. Only valid inside Route Handlers / Server Actions. */
export async function writeSession(session: Session): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, await sealSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Clears the session cookie. Only valid inside Route Handlers / Server Actions. */
export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
