import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FamFrame handles your data. Your photos and videos are stored in your own Google Drive — never on our servers.",
  alternates: { canonical: "/privacy" },
};

// NOTE: Set your governing-law jurisdiction in the "Governing law" section and
// confirm the contact email below before publishing.
const EFFECTIVE_DATE = "2 July 2026";
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <header className="flex flex-col gap-3">
          <h1 className="font-headline text-4xl font-bold text-on-surface">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Last updated {EFFECTIVE_DATE}
          </p>
        </header>

        {/* The short version */}
        <div className="mt-8 flex gap-4 rounded-3xl border border-primary-container bg-primary-fixed/40 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <div className="flex flex-col gap-2">
            <p className="font-headline text-lg font-semibold text-on-surface">
              The short version
            </p>
            <p className="font-body leading-relaxed text-on-surface-variant">
              Your photos and videos are stored in <strong>your own Google
              Drive</strong> — they never touch our servers, and we can&apos;t
              see them. We only keep the small amount of information needed to run
              your shared albums (who&apos;s a member, invite codes, notifications).
              We don&apos;t sell your data or use it for advertising.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <Section title="1. Introduction">
            <p>
              FamFrame (&quot;FamFrame&quot;, &quot;we&quot;, &quot;us&quot;) provides a
              private space for families to share photos and videos, stored in
              each user&apos;s own Google Drive. This Privacy Policy explains what
              information we handle when you use the FamFrame mobile app and this
              website (together, the &quot;Service&quot;), and the choices you have.
            </p>
            <p>
              By using the Service, you agree to the practices described here. If
              you do not agree, please don&apos;t use the Service.
            </p>
          </Section>

          <Section title="2. Your photos and videos live in your Google Drive">
            <p>
              FamFrame is built around a simple principle:{" "}
              <strong>you own your data</strong>. When you add a photo or video, it
              is uploaded directly to a single folder named &quot;FamFrame&quot; in
              your own Google Drive. This media is never uploaded to, stored on, or
              processed by FamFrame&apos;s servers.
            </p>
            <p>
              To do this, the app uses Google&apos;s narrow{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 text-sm">
                drive.file
              </code>{" "}
              permission, which grants access <em>only</em> to the files the app
              itself creates or that you explicitly open with it. FamFrame cannot
              see, read, or access any other files in your Google Drive.
            </p>
          </Section>

          <Section title="3. Information you provide or that we access">
            <p>When you use FamFrame, we access or receive:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Google account profile.</strong> When you sign in with
                Google, we receive your name, email address, profile photo, and a
                Google account identifier, so we can identify you and show you to
                other family members in your albums.
              </li>
              <li>
                <strong>Album content and activity.</strong> Album names, invite
                codes, captions, comments/notes, and reactions you create.
              </li>
              <li>
                <strong>Nicknames.</strong> Any private nicknames you set for other
                members. These are visible only to you.
              </li>
            </ul>
          </Section>

          <Section title="4. Information we store on our servers">
            <p>
              To run shared albums, we store a limited amount of information in
              Google Firebase (our backend). This does <strong>not</strong> include
              your photos or videos. It includes:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Your account identifier, display name, email, and avatar URL.</li>
              <li>
                Albums you own or belong to, their invite codes, and the list of
                members.
              </li>
              <li>Pending join requests to albums.</li>
              <li>
                Captions, comments/notes, and references (IDs) to the media files
                in your Drive — not the media itself.
              </li>
              <li>
                A device push-notification token, if you enable notifications.
              </li>
              <li>Your private nicknames for other members.</li>
            </ul>
          </Section>

          <Section title="5. Google API Services — Limited Use disclosure">
            <p>
              FamFrame&apos;s use of information received from Google APIs adheres to
              the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. Specifically:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                We only use Google Drive access to provide and improve the
                user-facing features of FamFrame (storing and displaying your
                albums).
              </li>
              <li>
                We do not transfer this data to others except as needed to provide
                the Service, comply with the law, or with your consent.
              </li>
              <li>
                We do not use Google user data for advertising, and we do not allow
                humans to read it, except with your consent, for security, to
                comply with the law, or where the data is aggregated and
                anonymized.
              </li>
              <li>
                We do not use Google user data to train generalized artificial
                intelligence or machine-learning models.
              </li>
            </ul>
          </Section>

          <Section title="6. How we use information">
            <p>We use the information above to:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Provide, maintain, and secure the Service.</li>
              <li>
                Display albums and members, and let you invite and manage family.
              </li>
              <li>
                Send notifications you&apos;ve enabled (for example, when a new
                memory is added).
              </li>
              <li>Diagnose problems and prevent abuse.</li>
            </ul>
          </Section>

          <Section title="7. Sharing and third-party services">
            <p>
              We do not sell your personal information. We share data only with the
              service providers we rely on to operate FamFrame, and only as needed:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Google</strong> — Sign-In and Google Drive storage.
              </li>
              <li>
                <strong>Google Firebase / Google Cloud</strong> — authentication,
                database, and hosting for the album metadata described above.
              </li>
              <li>
                <strong>Expo</strong> — delivery of push notifications to your
                device.
              </li>
              <li>
                <strong>Sentry</strong> — crash and error reporting to help us fix
                bugs.
              </li>
            </ul>
            <p>
              We may also disclose information if required by law or to protect the
              rights, safety, and security of our users and the Service.
            </p>
          </Section>

          <Section title="8. Push notifications">
            <p>
              If you enable notifications, we store a device token so we can alert
              you about relevant activity in your albums. You can turn notifications
              off at any time in the app or in your device settings.
            </p>
          </Section>

          <Section title="9. Children's privacy">
            <p>
              FamFrame is intended for use by adults (parents, guardians, and family
              members). It is not directed to children, and we do not knowingly
              allow anyone under the age of 13 (or the minimum age in your country)
              to create an account.
            </p>
            <p>
              Albums often contain photos and videos of children. Those images are
              uploaded by the adults who control the album, who are responsible for
              obtaining any necessary consent and for deciding who they invite. If
              you believe a child has created an account, please contact us and we
              will address it.
            </p>
          </Section>

          <Section title="10. Data retention and deletion">
            <p>You are in control of your data:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Your media</strong> lives in your Google Drive. It stays
                there even if you stop using FamFrame, and you can delete it at any
                time from Google Drive.
              </li>
              <li>
                <strong>Leaving or deleting an album</strong> removes the related
                membership and metadata we hold for you.
              </li>
              <li>
                <strong>Revoking access</strong> — you can disconnect FamFrame from
                your Google account at any time via your{" "}
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
                <strong>Account deletion</strong> — to delete your FamFrame account
                and the metadata we hold, contact us at {CONTACT_EMAIL}.
              </li>
            </ul>
          </Section>

          <Section title="11. Security">
            <p>
              We use industry-standard measures to protect the information we hold,
              including encrypted connections and access controls that limit album
              data to its members. No method of transmission or storage is 100%
              secure, but keeping your media in your own Google Drive means your
              most sensitive content is protected by Google&apos;s security rather
              than ours.
            </p>
          </Section>

          <Section title="12. Your rights">
            <p>
              Depending on where you live, you may have rights to access, correct,
              export, or delete your personal information, and to object to or
              restrict certain processing (for example under the GDPR or CCPA). To
              exercise these rights, contact us at {CONTACT_EMAIL}. We will respond
              in accordance with applicable law.
            </p>
          </Section>

          <Section title="13. International data transfers">
            <p>
              We and our service providers may process information in countries
              other than your own. Where we do, we take steps to ensure your
              information receives an adequate level of protection.
            </p>
          </Section>

          <Section title="14. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the &quot;Last updated&quot; date above and, where
              appropriate, notify you in the app.
            </p>
          </Section>

          <Section title="15. Governing law">
            <p>
              This Privacy Policy is governed by the laws of{" "}
              <strong>Victoria, Australia</strong>, without regard to its
              conflict-of-laws principles.
            </p>
          </Section>

          <Section title="16. Contact us">
            <p>
              If you have any questions about this Privacy Policy or how we handle
              your information, contact us at{" "}
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
