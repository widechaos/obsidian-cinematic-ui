# Reproduce the previews

The fixture in `examples/preview.html` uses fictional content and the shipped CSS.
It is a DOM preview, not a native Obsidian capture or a guarantee of theme support.

Requirements: Node.js, Playwright, Chromium, and Python with Pillow for GIF export.

```sh
npm install --no-save playwright
npx playwright install chromium
node scripts/render-preview.cjs
python3 scripts/make-gif.py
```

Set `PLAYWRIGHT_CHANNEL=chrome` to use an installed Chrome instead of bundled Chromium.
The renderer checks four-row stacking behavior for its four-level example and verifies
that the warning animation stops under reduced motion. Frames are temporary and ignored.
