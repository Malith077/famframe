# FamFrame Web

Marketing site + Google Drive companion for the **FamFrame** mobile app — a
private space for a family's photos and videos, stored in the user's *own*
Google Drive.

Built with **Next.js 16 (App Router) + Tailwind v4**. The UI reuses the mobile
app's "Serene Connection" design system (sage-green primary, soft-blue
secondary, warm off-white, Plus Jakarta Sans + Inter), ported into CSS variables
in [`src/app/globals.css`](src/app/globals.css).

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page (hero, features, how-it-works, privacy, CTA) |
| `/dashboard` | Signed-in view listing the FamFrame Drive folder + storage usage |
| `/api/auth/google` | Starts the Google OAuth consent flow |
| `/api/auth/callback` | Exchanges the code, creates the session |
| `/api/auth/signout` | Clears the session |
| `/api/drive/files` | Returns the FamFrame folder's media (auto-refreshes tokens) |

## Authentication

A small, dependency-light Google OAuth 2.0 (authorization-code) flow:

- Requests the same narrow **`drive.file`** scope as the mobile app — the app
  only ever sees files it created, never the rest of the user's Drive.
- Tokens are stored in a signed (JWT / HS256 via [`jose`](https://github.com/panva/jose))
  **httpOnly cookie**; they never reach the browser as readable values.
- Access tokens are refreshed transparently in [`src/lib/drive.ts`](src/lib/drive.ts).

## Setup

1. **Create Google OAuth credentials** in the
   [Google Cloud Console](https://console.cloud.google.com) → *APIs & Services →
   Credentials → Create OAuth client ID → Web application*.
   - Authorized redirect URI (dev): `http://localhost:3000/api/auth/callback`
   - Enable the **Google Drive API** for the project.
2. **Configure env** — copy `.env.example` to `.env.local` and fill in:
   ```bash
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   AUTH_SECRET=$(openssl rand -base64 32)
   # APP_URL=https://your-domain.com   # production only
   ```
3. **Run it:**
   ```bash
   npm install
   npm run dev
   ```
   Open http://localhost:3000.

## Project layout

```
src/
  app/
    page.tsx                # Landing page
    dashboard/              # Protected dashboard + client Drive gallery
    api/auth/…              # OAuth start / callback / signout
    api/drive/files/        # Drive listing endpoint
  components/               # Brand, header, footer, Google button
  lib/
    oauth.ts                # Google OAuth endpoints & token exchange
    session.ts              # jose-signed cookie session
    drive.ts                # Drive API calls + token refresh
    base-url.ts             # Redirect-URI resolution
```
