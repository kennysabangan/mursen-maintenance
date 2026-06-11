# Image Assets TODO

## Favicons (High Priority)
Generate PNG versions of favicon.svg for better browser compatibility:
- `favicon-16x16.png` (16×16)
- `favicon-32x32.png` (32×32)
- `favicon-192x192.png` (192×192)
- `favicon-512x512.png` (512×512)
- `apple-touch-icon.png` (180×180)

Use online tool: https://realfavicongenerator.net/ or ImageMagick:
```bash
# If ImageMagick is available:
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 192x192 favicon-192x192.png
convert favicon.svg -resize 512x512 favicon-512x512.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
```

## OG Image (High Priority)
Create `og-image.jpg` (1200×630) for social media sharing:
- Hero image with overlay
- Text: "Mursen" + "Professional Home Services"
- Tagline: "Lawn, Windows, Power Washing, Handyman"
- Location: "Covington & Cincinnati Metro"

## Current Assets
- ✅ favicon.svg (green house icon)
- ✅ hero-home.jpg (homepage hero)
- ✅ before-after/ gallery images
- ❌ PNG favicons (missing)
- ❌ og-image.jpg (missing)
