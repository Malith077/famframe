# Join-album deep links (future work)

Goal: a shared link like `https://famframe.app/invite/<code>` should open the
FamFrame app straight to the invite/join screen when the app is installed, and
fall back to the store when it isn't. This is **not built yet** — this doc is the
checklist for when we implement it.

## How it fits together

```
Family member taps  https://famframe.app/invite/ABC123
        │
        ├─ App installed  → OS opens the app (Universal Link / App Link) → join screen
        └─ Not installed  → web page loads → "Open in app" + store buttons
```

The website's job is small: (1) host two verification files, (2) serve an
`/invite/[code]` page. The heavier lifting is app-side config + a rebuild.

## 1. Website changes (this repo)

### a. Association files (served from the domain root)

- **iOS** — `https://famframe.app/.well-known/apple-app-site-association`
  - JSON, **no file extension**, `Content-Type: application/json`.
  - Cleanest in Next.js as a Route Handler at
    `src/app/.well-known/apple-app-site-association/route.ts` returning JSON.
  - Contents (fill in the real Team ID + bundle id `com.famframe.app`):
    ```json
    {
      "applinks": {
        "apps": [],
        "details": [
          { "appID": "TEAMID.com.famframe.app", "paths": ["/invite/*"] }
        ]
      }
    }
    ```
- **Android** — `https://famframe.app/.well-known/assetlinks.json`
  - Route Handler at `src/app/.well-known/assetlinks.json/route.ts`.
  - Needs the app's signing-cert **SHA-256 fingerprint** (from Play Console →
    App signing, or `keytool`/EAS credentials):
    ```json
    [{
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "com.famframe.app",
        "sha256_cert_fingerprints": ["AA:BB:CC:..."]
      }
    }]
    ```

> Note: files under `.well-known` must be reachable **without** a Cloudflare
> redirect/challenge. If Cloudflare's proxy is ever turned on, add a rule so
> `/.well-known/*` is not challenged.

### b. The `/invite/[code]` page

- `src/app/invite/[code]/page.tsx` — a fallback landing page for the
  not-installed case: shows the album context if available, an "Open in FamFrame"
  button (attempts `famframe://invite/<code>`), and the store buttons.
- On installed devices, the OS intercepts the URL before the page matters.

## 2. Mobile app changes (family-nest repo — requires a rebuild)

In `app.json`:

- **iOS**: `ios.associatedDomains: ["applinks:famframe.app"]`
- **Android**: an `android.intentFilters` entry with `autoVerify: true` for
  scheme `https`, host `famframe.app`, path prefix `/invite`.
- The app already declares the `famframe` scheme and has an invite screen, so the
  Expo Router route just needs to accept the `<code>` param and route to it.

After editing `app.json`, rebuild both platforms (dev/EAS build) — Universal
Links and App Links only work in a real build, not Expo Go.

## 3. The deferred-deep-link gap (app NOT installed)

The invite code is **lost across a fresh install** — the store can't carry it
through. Options, easiest first:

1. **Manual entry (recommended for launch):** after installing, the user pastes
   or types the code. The app already has an "Enter invite code" screen, so no
   extra infrastructure is needed.
2. **Attribution SDK:** Branch or AppsFlyer OneLink can carry the code through
   install. More setup + a third-party dependency.
3. ~~Firebase Dynamic Links~~ — **shut down, do not use.**

## Testing checklist

- [ ] `apple-app-site-association` returns 200 as `application/json`, no redirect.
- [ ] `assetlinks.json` returns 200, correct SHA-256.
- [ ] Apple validator + `adb shell` App Links verification pass.
- [ ] Installed device: tapping the link opens the app on the join screen.
- [ ] No-app device: web fallback shows store buttons.
