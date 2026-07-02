import Link from "next/link";
import { Brand } from "@/components/brand";
import { getSession } from "@/lib/session";

/** Top navigation. Shows Dashboard/avatar when signed in, otherwise a CTA. */
export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-30 border-b border-surface-variant/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="FamFrame home">
          <Brand />
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden font-body text-sm text-on-surface-variant transition hover:text-on-surface sm:block"
          >
            Features
          </a>
          <a
            href="#privacy"
            className="hidden font-body text-sm text-on-surface-variant transition hover:text-on-surface sm:block"
          >
            Privacy
          </a>

          {session ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-on-primary transition hover:opacity-90"
            >
              Dashboard
            </Link>
          ) : (
            <a
              href="/api/auth/google"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-on-primary transition hover:opacity-90"
            >
              Sign in
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
