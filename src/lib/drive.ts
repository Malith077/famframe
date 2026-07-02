/**
 * Google Drive helpers — the web counterpart of the mobile app's
 * src/services/drive-service.ts. FamFrame keeps everything inside a single
 * "FamFrame" folder in the user's own Drive, reachable with the `drive.file`
 * scope because this app created it.
 */
import { getSession, writeSession, type Session } from "@/lib/session";
import { refreshAccessToken } from "@/lib/oauth";

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const APP_FOLDER_NAME = "FamFrame";

/** 60s safety margin so we refresh slightly before the token actually expires. */
const EXPIRY_SKEW_MS = 60_000;

export class NotAuthenticatedError extends Error {}

/**
 * Returns a currently-valid access token, transparently refreshing it (and
 * re-persisting the session cookie) when it is close to expiry.
 * Must be called from a Route Handler / Server Action (it may write a cookie).
 */
export async function getValidAccessToken(): Promise<string> {
  const session = await getSession();
  if (!session) throw new NotAuthenticatedError("No active session");

  if (Date.now() < session.expiresAt - EXPIRY_SKEW_MS) {
    return session.accessToken;
  }

  if (!session.refreshToken) {
    // Access token expired and we have nothing to refresh with.
    throw new NotAuthenticatedError("Session expired");
  }

  const tokens = await refreshAccessToken(session.refreshToken);
  const refreshed: Session = {
    ...session,
    accessToken: tokens.access_token,
    // Google usually omits refresh_token on refresh — keep the old one.
    refreshToken: tokens.refresh_token ?? session.refreshToken,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  };
  await writeSession(refreshed);
  return refreshed.accessToken;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  createdTime?: string;
  size?: string;
}

export interface DriveAbout {
  displayName?: string;
  emailAddress?: string;
  limitBytes?: number;
  usageBytes?: number;
}

async function driveFetch(token: string, path: string): Promise<Response> {
  return fetch(`${DRIVE_API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** Finds the FamFrame folder id, or null if the user hasn't created one yet. */
export async function findAppFolderId(token: string): Promise<string | null> {
  const q = encodeURIComponent(
    `mimeType='application/vnd.google-apps.folder' and name='${APP_FOLDER_NAME}' and trashed=false`,
  );
  const res = await driveFetch(token, `/files?q=${q}&spaces=drive&fields=files(id)`);
  if (!res.ok) throw new Error(`Drive folder lookup failed: ${await res.text()}`);
  const data = await res.json();
  return data.files?.[0]?.id ?? null;
}

/** Lists media inside the FamFrame folder (newest first). */
export async function listAppFolderMedia(token: string): Promise<DriveFile[]> {
  const folderId = await findAppFolderId(token);
  if (!folderId) return [];

  const q = encodeURIComponent(
    `'${folderId}' in parents and trashed=false and (mimeType contains 'image/' or mimeType contains 'video/')`,
  );
  const fields = encodeURIComponent(
    "files(id,name,mimeType,thumbnailLink,createdTime,size)",
  );
  const res = await driveFetch(
    token,
    `/files?q=${q}&orderBy=createdTime desc&pageSize=100&fields=${fields}`,
  );
  if (!res.ok) throw new Error(`Drive listing failed: ${await res.text()}`);
  const data = await res.json();
  return data.files ?? [];
}

/** Storage quota + the Google account the files belong to. */
export async function getDriveAbout(token: string): Promise<DriveAbout> {
  const res = await driveFetch(
    token,
    "/about?fields=user(displayName,emailAddress),storageQuota(limit,usage)",
  );
  if (!res.ok) throw new Error(`Drive about failed: ${await res.text()}`);
  const data = await res.json();
  return {
    displayName: data.user?.displayName,
    emailAddress: data.user?.emailAddress,
    limitBytes: data.storageQuota?.limit
      ? Number(data.storageQuota.limit)
      : undefined,
    usageBytes: data.storageQuota?.usage
      ? Number(data.storageQuota.usage)
      : undefined,
  };
}
