import Link from "next/link";
import {
  Lock,
  Cloud,
  Users,
  Heart,
  Image as ImageIcon,
  ShieldCheck,
  ArrowRight,
  Bell,
  AlertCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleButton } from "@/components/google-button";

const FEATURES = [
  {
    icon: Lock,
    title: "Total Privacy",
    body: "Only the family members you invite can ever see your album. No public feeds, no strangers.",
  },
  {
    icon: Cloud,
    title: "You Own the Data",
    body: "Every photo and video syncs straight to your own Google Drive — it never lives on our servers.",
  },
  {
    icon: Users,
    title: "For the Whole Family",
    body: "Invite grandparents, aunts and uncles with a single link. Everyone stays in the loop.",
  },
  {
    icon: Bell,
    title: "Gentle Updates",
    body: "A quiet notification when a new memory is added — never noisy, never spammy.",
  },
];

const STEPS = [
  {
    icon: ShieldCheck,
    title: "Sign in with Google",
    body: "Grant FamFrame permission to a single folder in your Drive. That's the only access it ever gets.",
  },
  {
    icon: ImageIcon,
    title: "Add your memories",
    body: "Upload photos and videos of the little moments. They're compressed and stored in your Drive.",
  },
  {
    icon: Heart,
    title: "Share with family",
    body: "Send an invite link. Loved ones see every new memory the moment it's added.",
  },
];

const AUTH_ERRORS: Record<string, string> = {
  not_configured:
    "Google sign-in isn't configured yet. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and AUTH_SECRET to .env.local.",
  invalid_state: "Your sign-in session expired. Please try again.",
  exchange_failed: "We couldn't complete sign-in with Google. Please try again.",
  access_denied: "Sign-in was cancelled.",
};

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ auth_error?: string }>;
}) {
  const { auth_error } = await searchParams;
  const errorMessage = auth_error
    ? AUTH_ERRORS[auth_error] ?? "Something went wrong during sign-in."
    : null;

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {errorMessage && (
          <div className="mx-auto mt-4 flex max-w-6xl items-center gap-3 rounded-2xl border border-error-container bg-error-container/50 px-5 py-3.5 text-on-error-container">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-body text-sm">{errorMessage}</p>
          </div>
        )}
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-surface-lowest to-background"
          />
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 font-body text-sm font-semibold text-on-primary-fixed">
                  <Lock className="h-4 w-4" /> Private by design
                </span>
                <h1 className="font-headline text-5xl font-bold leading-[1.05] tracking-tight text-on-surface sm:text-6xl">
                  Your baby&apos;s photos,
                  <br />
                  <span className="text-primary">shared privately.</span>
                </h1>
                <p className="max-w-xl font-body text-lg leading-relaxed text-on-surface-variant">
                  FamFrame keeps your family&apos;s photos and videos stored
                  securely in your own Google Drive — creating a digital heirloom
                  that never lives on our servers.
                </p>
                <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
                  <GoogleButton />
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 px-2 py-3 font-body font-semibold text-primary transition hover:gap-3"
                  >
                    See how it works <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>

              <HeroCard />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-16">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-semibold text-on-surface sm:text-4xl">
              A calm home for your memories
            </h2>
            <p className="mt-4 font-body text-lg text-on-surface-variant">
              Everything you love about a shared album, without giving up
              control of your photos.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-surface-variant bg-surface-lowest p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary-container"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-fixed">
                  <f.icon className="h-7 w-7 text-primary" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-headline text-xl font-semibold text-on-surface">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-on-surface-variant">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-semibold text-on-surface sm:text-4xl">
              Set up in three steps
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-headline text-sm font-bold text-on-primary">
                    {i + 1}
                  </span>
                  <s.icon className="h-6 w-6 text-secondary" strokeWidth={2} />
                </div>
                <h3 className="font-headline text-xl font-semibold text-on-surface">
                  {s.title}
                </h3>
                <p className="font-body text-on-surface-variant">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy / Drive ownership */}
        <section id="privacy" className="mx-auto max-w-6xl px-5 py-16">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-on-primary sm:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-on-primary/15 px-4 py-1.5 font-body text-sm font-semibold">
                  <Cloud className="h-4 w-4" /> Stored in your Google Drive
                </span>
                <h2 className="font-headline text-3xl font-semibold leading-tight sm:text-4xl">
                  We can&apos;t see your photos. That&apos;s the point.
                </h2>
                <p className="font-body text-lg leading-relaxed text-on-primary/85">
                  FamFrame uses the Google Drive{" "}
                  <code className="rounded bg-on-primary/15 px-1.5 py-0.5 text-base">
                    drive.file
                  </code>{" "}
                  scope — it can only touch the single FamFrame folder it creates
                  for you. Your other files stay invisible to us, and your
                  memories stay yours forever, even if you stop using the app.
                </p>
                <GoogleButton
                  label="Connect your Google Drive"
                  className="mt-2 w-fit"
                />
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "Photos never stored on FamFrame servers",
                  "Scoped access to one folder only",
                  "Keep your files if you leave",
                  "Backed by Google's security & storage",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 rounded-2xl bg-on-primary/10 px-5 py-4 font-body"
                  >
                    <ShieldCheck className="h-5 w-5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-headline text-4xl font-bold text-on-surface">
            Start your family&apos;s digital heirloom
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-on-surface-variant">
            It takes less than a minute. No credit card, no data harvesting —
            just a private space for the people who matter.
          </p>
          <div className="mt-8 flex justify-center">
            <GoogleButton />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/** Decorative hero mock — a stylised photo grid framed like the app. */
function HeroCard() {
  const tones = [
    "bg-primary-container",
    "bg-secondary-container",
    "bg-primary-fixed",
    "bg-tertiary-container",
    "bg-secondary-fixed",
    "bg-primary-container",
  ];
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-[2rem] border border-surface-variant bg-surface-lowest p-5 shadow-[var(--shadow-modal)]">
        <div className="flex items-center gap-3 pb-4">
          <div className="h-10 w-10 rounded-full bg-primary-fixed" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-28 rounded-full bg-surface-highest" />
            <div className="h-2.5 w-20 rounded-full bg-surface-high" />
          </div>
          <Heart className="ml-auto h-5 w-5 text-secondary" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {tones.map((tone, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl ${tone}`}
              style={{ opacity: 0.9 - (i % 3) * 0.12 }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-surface-low px-4 py-2.5">
          <Cloud className="h-4 w-4 text-primary" />
          <span className="font-body text-xs text-on-surface-variant">
            Synced to your Google Drive
          </span>
        </div>
      </div>
    </div>
  );
}
