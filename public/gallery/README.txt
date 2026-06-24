Images live under public/gallery/{type}/ — hero and gallery photos share the same folder per type.

1. Add image files to public/gallery/{type}/ (e.g. lifestyle/hero.webp, lifestyle/my-photo.jpg)
2. Register the hero in src/content/gallery-types/{type}.json → heroImage
3. Register each photo in src/content/gallery/ as its own JSON file → fullImage

Each photo uses a single full-size image. The grid crops it with CSS — no separate preview file needed.
