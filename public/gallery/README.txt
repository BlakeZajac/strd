Images live under public/gallery/{type}/ — hero and gallery photos share the same folder per type.

1. Add image files to public/gallery/{type}/ (e.g. lifestyle/hero.webp, lifestyle/my-photo.jpg)
2. Register the type in src/content/gallery-types/{type}.json with heroImage (and optional photoOrder)
3. All other images in that folder are picked up automatically for the gallery grid
4. Run npm run gallery:thumbs (or npm run dev / npm run build — thumbs generate automatically)

Thumbnails are generated into public/gallery/{type}/_thumbs/ as WebP (~800px wide). The grid uses thumbs; Fancybox opens the full-size original. Dimensions and thumb paths are stored in public/gallery/manifest.json (generated — do not edit by hand).

Optional photoOrder in gallery-types JSON — array of filenames or paths. Listed images sort first in that order; any others follow A–Z. Without photoOrder, everything sorts A–Z by path.
