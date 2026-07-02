# FamFrame Web

Marketing / SEO landing page for the **FamFrame** mobile app — a private space
for a family's photos and videos, stored in the user's *own* Google Drive. The
site's job is to explain the app, rank in search, and funnel visitors to the app
stores (and, later, to catch shared "join album" links — see
[INVITE-LINKS.md](INVITE-LINKS.md)).

Built with **Next.js 16 (App Router) + Tailwind v4**. The UI reuses the mobile
app's "Serene Connection" design system (sage-green primary, soft-blue
secondary, warm off-white, Plus Jakarta Sans + Inter), ported into CSS variables
in [`src/app/globals.css`](src/app/globals.css).

## Structure

```
src/
  app/
    page.tsx        # Landing page (hero, features, how-it-works, privacy, download)
    layout.tsx      # Fonts, metadata, JSON-LD structured data
    sitemap.ts      # /sitemap.xml
    robots.ts       # /robots.txt
    globals.css     # FamFrame design tokens
  components/        # Brand, header, footer, app-download CTA
  lib/site.ts       # Site URL + store links (single place to update at launch)
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required.

`NEXT_PUBLIC_SITE_URL` is optional and defaults to `https://famframe.app` (used
for canonical URLs, sitemap, and Open Graph tags).

## When the app is published

Edit [`src/lib/site.ts`](src/lib/site.ts): set the store `url`s and flip
`available: true`. The "Coming soon" buttons automatically become live store
links — no other changes needed.

## Deploy

Hosted on Vercel; `famframe.app` DNS is managed in Cloudflare (apex + `www`
pointing at Vercel, DNS-only). Pushing to `main` triggers a production deploy.
```
