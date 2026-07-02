import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of FamFrame — a private family photo and video app that stores your media in your own Google Drive.",
  alternates: { canonical: "/terms" },
};

// NOTE: Set your governing-law jurisdiction in the "Governing law" section and
// confirm the contact email below before publishing.
const EFFECTIVE_DATE = "2 July 2026";
const CONTACT_EMAIL = "support@famframe.app";

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

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <header className="flex flex-col gap-3">
          <h1 className="font-headline text-4xl font-bold text-on-surface">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Last updated {EFFECTIVE_DATE}
          </p>
        </header>

        {/* The short version */}
        <div className="mt-8 flex gap-4 rounded-3xl border border-primary-container bg-primary-fixed/40 p-6">
          <FileText className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <div className="flex flex-col gap-2">
            <p className="font-headline text-lg font-semibold text-on-surface">
              The short version
            </p>
            <p className="font-body leading-relaxed text-on-surface-variant">
              FamFrame lets your family share photos and videos, stored in your own
              Google Drive. <strong>You own your content.</strong> Use the Service
              lawfully and respect the people in your albums. The Service is
              provided &quot;as is,&quot; and these terms set out the rules and the
              legal bits.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <Section title="1. Acceptance of these terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) are an agreement between you
              and FamFrame (&quot;FamFrame&quot;, &quot;we&quot;, &quot;us&quot;)
              governing your use of the FamFrame mobile app and this website
              (together, the &quot;Service&quot;). By creating an account or using the
              Service, you agree to these Terms and to our{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
              . If you do not agree, do not use the Service.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old (or the minimum age of digital
              consent in your country) and able to form a binding contract to use
              the Service. The Service is intended for adults such as parents,
              guardians, and family members. By using it, you confirm that you meet
              these requirements.
            </p>
          </Section>

          <Section title="3. The Service">
            <p>
              FamFrame provides a private space to share photos and videos with
              family members you invite. Your media is stored in your own Google
              Drive rather than on our servers. We store only the limited
              information needed to operate shared albums, as described in our
              Privacy Policy.
            </p>
            <p>
              We may add, change, or remove features over time, and we may set
              reasonable limits on use of the Service.
            </p>
          </Section>

          <Section title="4. Your Google account and Google Drive">
            <p>
              The Service requires a Google account and access to your Google Drive
              in order to store and display your media. Your use of Google&apos;s
              services is subject to Google&apos;s own terms and policies. You are
              responsible for your Google account, for maintaining enough Drive
              storage, and for any changes you make to the FamFrame folder or its
              files directly in Google Drive.
            </p>
          </Section>

          <Section title="5. Your account and responsibilities">
            <p>
              You are responsible for the activity under your account and for
              keeping your sign-in secure. You agree to provide accurate information
              and to notify us of any unauthorized use. You are responsible for the
              family members you invite and for managing your albums&apos;
              membership.
            </p>
          </Section>

          <Section title="6. Your content">
            <p>
              You retain all ownership of the photos, videos, captions, and other
              content you add (&quot;Your Content&quot;). We do not claim ownership of
              it.
            </p>
            <p>
              Because Your Content is stored in your Google Drive, you grant us only
              the limited permission necessary to operate the Service — for example,
              to display Your Content to the family members you invite and to show
              references to it within the app. This permission ends when you remove
              the content or stop using the Service, subject to normal technical
              delays.
            </p>
            <p>
              You are solely responsible for Your Content and confirm that you have
              the rights necessary to share it.
            </p>
          </Section>

          <Section title="7. Acceptable use">
            <p>You agree not to use the Service to:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                upload or share content that is unlawful, infringing, or that
                violates someone else&apos;s privacy or rights;
              </li>
              <li>
                upload images or videos of other people — including children —
                without the consent of the individuals or their parents/guardians;
              </li>
              <li>
                upload any content that sexually exploits or endangers a minor;
              </li>
              <li>harass, abuse, or harm other members;</li>
              <li>
                attempt to gain unauthorized access to the Service, other
                accounts, or albums you were not invited to;
              </li>
              <li>
                reverse engineer, disrupt, or interfere with the Service or its
                security;
              </li>
              <li>use the Service to violate any applicable law.</li>
            </ul>
            <p>
              We may remove content or suspend accounts that violate these Terms,
              though your media in Google Drive remains under your control.
            </p>
          </Section>

          <Section title="8. Albums and invitations">
            <p>
              Album owners control who is invited to and removed from their albums.
              If you invite someone, you are responsible for choosing to share your
              content with them. If you join an album, you agree to respect the
              content and privacy of the other members.
            </p>
          </Section>

          <Section title="9. Third-party services">
            <p>
              The Service relies on third parties including Google (Sign-In and
              Drive), Google Firebase, Expo (push notifications), and Sentry (error
              reporting). Your use of those services may be subject to their own
              terms and policies. We are not responsible for third-party services.
            </p>
          </Section>

          <Section title="10. Intellectual property">
            <p>
              The Service, including the FamFrame name, logo, software, and design,
              is owned by us and protected by intellectual-property laws. We grant
              you a limited, non-exclusive, non-transferable, revocable license to
              use the Service for its intended personal, non-commercial purpose.
              These Terms do not grant you any rights in our trademarks or branding.
            </p>
          </Section>

          <Section title="11. Disclaimers">
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis, without warranties of any kind, whether express
              or implied, including fitness for a particular purpose and
              non-infringement. We do not warrant that the Service will be
              uninterrupted, error-free, or secure, or that content will always be
              available. You are responsible for maintaining your own backups; your
              media lives in your Google Drive.
            </p>
          </Section>

          <Section title="12. Limitation of liability">
            <p>
              To the maximum extent permitted by law, FamFrame and its providers will
              not be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of data, profits, or goodwill, arising
              from your use of (or inability to use) the Service. Our total liability
              for any claim relating to the Service will not exceed the greater of
              the amount you paid us in the twelve months before the claim, or USD
              50.
            </p>
            <p>
              <strong>Australian Consumer Law.</strong> Nothing in these Terms
              excludes, restricts, or modifies any consumer guarantee, right, or
              remedy you may have under the Australian Consumer Law or other laws
              that cannot lawfully be excluded. Where our liability for failing to
              comply with such a guarantee can be limited, our liability is limited,
              at our option, to re-supplying the relevant service or paying the cost
              of having it re-supplied. The disclaimers and limitations above apply
              only to the extent permitted by law.
            </p>
          </Section>

          <Section title="13. Indemnification">
            <p>
              You agree to indemnify and hold FamFrame harmless from any claims,
              damages, and expenses (including reasonable legal fees) arising from
              Your Content, your use of the Service, or your violation of these Terms
              or the rights of others.
            </p>
          </Section>

          <Section title="14. Termination">
            <p>
              You may stop using the Service at any time and disconnect FamFrame from
              your Google account. We may suspend or terminate your access if you
              violate these Terms or to protect the Service or its users. If your
              access ends, the metadata we hold may be deleted, but{" "}
              <strong>your media remains in your Google Drive</strong> under your
              control.
            </p>
          </Section>

          <Section title="15. Changes to the Service and these terms">
            <p>
              We may update these Terms from time to time. When we make material
              changes, we will revise the &quot;Last updated&quot; date and, where
              appropriate, notify you in the app. Continuing to use the Service after
              changes take effect means you accept the updated Terms.
            </p>
          </Section>

          <Section title="16. Governing law">
            <p>
              These Terms are governed by the laws of{" "}
              <strong>Victoria, Australia</strong>, without regard to its
              conflict-of-laws principles. The courts of Victoria, Australia will
              have exclusive jurisdiction over any disputes, unless applicable law
              requires otherwise.
            </p>
          </Section>

          <Section title="17. Contact us">
            <p>
              Questions about these Terms? Contact us at{" "}
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
