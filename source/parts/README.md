# Spare parts section

- `motorcycle-spare-parts-research.xlsx`: the data (models, parts, model x part pages, shops).
- `build_parts.py`: builds `/parts/`, `assets/content/spare-parts.js` and the sitemap entries.
- `download_part_photos.py` + `part-photos-instructions.md`: collects reusable photos from Wikimedia Commons.

## Add real photos

1. On a computer with internet access (or here, once `commons.wikimedia.org` and `upload.wikimedia.org` are allowed):

   ```
   pip install requests openpyxl
   python3 source/parts/download_part_photos.py --contact marcel@transitionslab.org --out source/parts/images
   ```

2. Open `source/parts/images/contact_sheet.html`, delete misses, and optionally add a `keep` column (yes/no) to `manifest.csv`.
3. Rebuild: `python3 source/parts/build_parts.py`. Up to 4 photos per part are copied to `assets/parts-photos/`, the first becomes the image on every page for that part (credited in the caption), and part pages get a credited gallery. Photos Commons flags for trademarks or people are never used as the main image.
4. Commit `assets/parts-photos/` and `parts/`. (`source/parts/` is not deployed.)
