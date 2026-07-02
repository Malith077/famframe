import Link from "next/link";
import { Brand } from "@/components/brand";

/** Top navigation for the marketing site. */
export function SiteHeader() {
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
            href="#how-it-works"
            className="hidden font-body text-sm text-on-surface-variant transition hover:text-on-surface sm:block"
          >
            How it works
          </a>
          <a
            href="#privacy"
            className="hidden font-body text-sm text-on-surface-variant transition hover:text-on-surface sm:block"
          >
            Privacy
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-on-primary transition hover:opacity-90"
          >
            Get the app
          </a>
        </nav>
      </div>
    </header>
  );
}
