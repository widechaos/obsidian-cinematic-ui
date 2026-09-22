# Obsidian Cinematic UI

A polished CSS motion layer for Obsidian: cinematic enough to feel alive, restrained enough to keep writing comfortable.

为 Obsidian 打造的电影感视觉与微动效片段：让界面有生命力，但不干扰阅读与写作。

## Highlights

- Semantic glass Callouts with distinct colors for 14 built-in types
- Breathing glow for warning, caution, failure, danger, and bug Callouts
- Soft image reveal instead of a hard loading flash
- Checkbox completion ripple and strike-through feedback
- Non-empty inbox folder pulse (path is easy to customize)
- Selection glow, active-line glow, growing link underline
- Reading-mode code block lift and shadow
- Works in Live Preview and Reading View
- No JavaScript, no network requests, no bundled wallpaper, no personal paths

## Install

1. Download [`snippets/obsidian-cinematic-ui.css`](snippets/obsidian-cinematic-ui.css).
2. Put it in `<your-vault>/.obsidian/snippets/`.
3. In Obsidian, open **Settings → Appearance → CSS snippets**.
4. Refresh snippets and enable **obsidian-cinematic-ui**.

中文安装说明见 [`docs/安装与定制.md`](docs/安装与定制.md)。

## Design principles

The project follows three rules:

1. **Meaning before decoration.** Callout colors communicate state instead of becoming one universal neon effect.
2. **Motion needs an event.** Images reveal when rendered, checkboxes respond when completed, and code blocks lift only on hover.
3. **Themes are allowed to disagree.** The snippet uses scoped selectors and its own color tokens so themes such as Blue Topaz cannot silently erase the effects.

## Callout palette

| Family | Color |
| --- | --- |
| Note / Info | Blue |
| Abstract | Cyan |
| Todo / Example | Violet |
| Tip / Success | Teal / Green |
| Question | Amber |
| Warning / Caution | Orange / Gold |
| Failure / Danger / Bug | Rose / Red / Magenta |
| Quote | Slate |

See [`examples/callouts.md`](examples/callouts.md) for a ready-to-paste test page.

## Compatibility

- Obsidian 1.13+
- Dark themes are the primary target; light themes remain readable
- Tested with Blue Topaz
- Supports native Callouts and the common Admonition class structure

## Privacy

This repository contains no wallpaper images, vault content, credentials, analytics, or network code. The public snippet is deliberately separated from the author's local wallpaper generator.

## License

MIT © 2026 widechaos
