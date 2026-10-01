"""Assemble the CSS-rendered breathing cycle (requires Pillow)."""
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1]
frames = [Image.open(p).convert('RGB') for p in sorted((root / 'assets/frames').glob('*.png'))]
if not frames:
    raise SystemExit('Run render-preview.cjs first')
frames[0].save(root / 'assets/callout-breathe.gif', save_all=True,
               append_images=frames[1:], duration=100, loop=0, optimize=False)
