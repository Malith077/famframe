import { Apple, Play } from "lucide-react";
import { STORE_LINKS } from "@/lib/site";

/**
 * App-download call-to-action. While the app is pre-launch, store buttons render
 * as non-interactive "Coming soon" badges. When STORE_LINKS.*.available flips to
 * true (with a url), they become real links — no other code changes needed.
 */
export function AppStoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <StoreBadge
        icon={<Apple className="h-6 w-6" />}
        top="Coming soon on the"
        bottom="App Store"
        href={STORE_LINKS.ios.available ? STORE_LINKS.ios.url : null}
      />
      <StoreBadge
        icon={<Play className="h-5 w-5" />}
        top="Coming soon on"
        bottom="Google Play"
        href={STORE_LINKS.android.available ? STORE_LINKS.android.url : null}
      />
    </div>
  );
}

function StoreBadge({
  icon,
  top,
  bottom,
  href,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
  href: string | null;
}) {
  const inner = (
    <>
      <span className="text-on-primary">{icon}</span>
      <span className="flex flex-col text-left leading-tight">
        <span className="font-body text-[11px] text-on-primary/70">{top}</span>
        <span className="font-headline text-lg font-semibold text-on-primary">
          {bottom}
        </span>
      </span>
    </>
  );

  const base =
    "inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 shadow-[var(--shadow-card)]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} transition hover:-translate-y-0.5 hover:opacity-95`}
      >
        {inner}
      </a>
    );
  }

  // Pre-launch: not a link, visibly inert.
  return (
    <span className={`${base} cursor-default opacity-90`} aria-disabled="true">
      {inner}
    </span>
  );
}
