import { NextResponse } from "next/server";
import {
  getValidAccessToken,
  listAppFolderMedia,
  getDriveAbout,
  NotAuthenticatedError,
} from "@/lib/drive";

/** Returns the FamFrame Drive folder contents + storage info for the dashboard. */
export async function GET() {
  try {
    const token = await getValidAccessToken();
    const [files, about] = await Promise.all([
      listAppFolderMedia(token),
      getDriveAbout(token),
    ]);
    return NextResponse.json({ files, about });
  } catch (e) {
    if (e instanceof NotAuthenticatedError) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }
    console.error("Drive files route failed:", e);
    return NextResponse.json({ error: "drive_error" }, { status: 502 });
  }
}
