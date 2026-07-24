import type { Metadata } from "next";
import { Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "How to permanently delete your FamFrame account and associated data, and what is deleted or kept.",
  alternates: { canonical: "/delete-account" },
};

const EFFECTIVE_DATE = "23 July 2026";
const CONTACT_EMAIL = "privacy@famframe.app";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-headline text-2xl font-semibold text-on-surface">
        {title}
      </h2>
      <div className="flex flex-col gap-3 font-body leading-relaxed text-on-surface-variant">
        {children}
      </div>
    </section>
  );
}

export default function DeleteAccountPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <header className="flex flex-col gap-3">
          <h1 className="font-headline text-4xl font-bold text-on-surface">
            Delete Your Account
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Last updated {EFFECTIVE_DATE}
          </p>
        </header>

        {/* The short version */}
        <div className="mt-8 flex gap-4 rounded-3xl border border-primary-container bg-primary-fixed/40 p-6">
          <Trash2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <div className="flex flex-col gap-2">
            <p className="font-headline text-lg font-semibold text-on-surface">
              The short version
            </p>
            <p className="font-body leading-relaxed text-on-surface-variant">
              You can permanently delete your <strong>FamFrame</strong> account
              and the data we hold at any time, directly in the app — no email or
              request needed. Your photos and videos live in your own Google Drive,
              so they always remain under your control.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <Section title="How to delete your account">
            <p>
              You can delete your FamFrame account from within the app in a few
              taps:
            </p>
            <ol className="flex list-decimal flex-col gap-2 pl-5">
              <li>Open FamFrame and sign in.</li>
              <li>
                Go to <strong>Settings</strong>.
              </li>
              <li>
                Tap <strong>Delete Account</strong>.
              </li>
              <li>
                Confirm. For your security you&apos;ll be asked to re-authenticate,
                and your account is then permanently deleted.
              </li>
            </ol>
            <p>
              If you can&apos;t access the app for any reason, you can also request
              deletion by emailing us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              from the address associated with your account.
            </p>
          </Section>

          <Section title="What is deleted">
            <p>
              When you delete your account, we permanently remove the data we hold
              about you, including:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Your account and profile — name, email address, and user ID.</li>
              <li>The posts (photos and videos) you shared.</li>
              <li>
                Albums you created, together with their posts, invite codes, and
                pending join requests.
              </li>
              <li>Your notes, private nicknames, and notification preferences.</li>
            </ul>
          </Section>

          <Section title="What is kept">
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Your photos and videos remain in your own Google
                Drive.</strong>{" "}
                FamFrame never stores your media on its servers, so deleting your
                account removes FamFrame&apos;s references to those files but does
                not touch the files themselves. You can delete them from your Google
                Drive at any time, and you can revoke FamFrame&apos;s access via
                your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Google account permissions
                </a>
                .
              </li>
              <li>
                Anonymous, aggregated diagnostic and crash data that cannot be
                linked to you may be retained to help keep the app reliable.
              </li>
            </ul>
          </Section>

          <Section title="Retention">
            <p>
              Your account and associated data are removed immediately when you
              confirm deletion. Residual copies in routine backups are purged within
              90 days.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              If you have any questions about deleting your account or your data,
              contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
