import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-surface-variant/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Brand />
          <p className="max-w-sm font-body text-sm text-on-surface-variant">
            Your family&apos;s photos and videos, stored privately in your own
            Google Drive.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-body text-sm text-on-surface-variant">
          <Link href="/terms" className="transition hover:text-on-surface">
            Terms of Service
          </Link>
          <Link href="/privacy" className="transition hover:text-on-surface">
            Privacy Policy
          </Link>
          <span className="text-outline">
            © {new Date().getFullYear()} FamFrame
          </span>
        </div>
      </div>
    </footer>
  );
}
