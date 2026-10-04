# IPTV Max share links

Published as the `texassoftwarehub-dev.github.io` GitHub Pages repository (public — required for
Pages on a free plan). The source lives here, in IPTVMaxNative's `LinkSite/`; see PLAN.md
"Share links".

- `.well-known/apple-app-site-association` — Universal Links for the iOS/macOS app.
- `.well-known/assetlinks.json` — App Links for the Android TV app. **Add the Play App Signing
  SHA-256 before release** (Play Console → App integrity); only the debug key is listed now.
- `.nojekyll` — without it Pages hides `.well-known`.
- `m/`, `s/`, `c/` — the same page (`page.template.html`, copied); `link.js` fills it from the
  link. After editing the template: `for k in m s c; do cp page.template.html $k/index.html; done`.
- Store buttons: set `APP_STORE_URL` / `PLAY_STORE_URL` at the top of `link.js`.
