import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session";
import { getBaseUrl } from "@/lib/base-url";

export async function POST(request: Request) {
  await clearSession();
  return NextResponse.redirect(getBaseUrl(request), { status: 303 });
}
