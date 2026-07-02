import { Home } from "lucide-react";

/** FamFrame wordmark + sage home glyph, matching the mobile app's brand lockup. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed">
        <Home className="h-5 w-5 text-primary" strokeWidth={2} />
      </span>
      <span className="font-headline text-2xl font-bold text-primary">FamFrame</span>
    </span>
  );
}
