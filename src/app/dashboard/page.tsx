import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { Brand } from "@/components/brand";
import { getSession } from "@/lib/session";
import { DriveGallery } from "./drive-gallery";

export const metadata = {
  title: "Dashboard — FamFrame",
};

export default async function DashboardPage() {
  const session = await getSession();

  // Not signed in → send straight to the Google consent flow.
  if (!session) {
    redirect("/api/auth/google");
  }

  const { user } = session;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-surface-variant/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" aria-label="FamFrame home">
            <Brand />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt=""
                  className="h-9 w-9 rounded-full border border-surface-variant"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed font-headline text-sm font-bold text-primary">
                  {(user.name ?? user.email).charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="font-body text-sm font-semibold text-on-surface">
                  {user.name ?? "Signed in"}
                </span>
                <span className="font-body text-xs text-on-surface-variant">
                  {user.email}
                </span>
              </div>
            </div>
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-surface-variant px-4 py-2 font-body text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold text-on-surface">
            Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-2 font-body text-on-surface-variant">
            Everything below lives in the{" "}
            <span className="font-semibold text-on-surface">FamFrame</span>{" "}
            folder in your own Google Drive.
          </p>
        </div>

        <DriveGallery />
      </main>
    </>
  );
}
