/** FamFrame wordmark + logo mark, matching the mobile app's brand lockup. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/famframe-logo.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10"
      />
      <span className="font-headline text-2xl font-bold text-primary">FamFrame</span>
    </span>
  );
}
