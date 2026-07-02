/**
 * Central site config. Update STORE_LINKS when the app is published — set the
 * URLs and flip `available` to switch the CTAs from "Coming soon" to live.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://famframe.app";

export const SITE_NAME = "FamFrame";
export const SITE_TAGLINE = "Your family's photos, shared privately";
export const SITE_DESCRIPTION =
  "A private space for your family's photos and videos, stored securely in your own Google Drive — a digital heirloom that never lives on our servers.";

export const STORE_LINKS = {
  ios: {
    /** e.g. "https://apps.apple.com/app/id0000000000" */
    url: null as string | null,
    available: false,
  },
  android: {
    /** e.g. "https://play.google.com/store/apps/details?id=com.famframe.app" */
    url: null as string | null,
    available: false,
  },
} as const;

export const APP_IS_LIVE = STORE_LINKS.ios.available || STORE_LINKS.android.available;
