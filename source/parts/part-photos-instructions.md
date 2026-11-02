# Part photos: how to collect and use them

`download_part_photos.py` searches Wikimedia Commons for all 28 part types in `motorcycle-spare-parts-research.xlsx` (chain kits, CVT belts, roller weights, brake shoes and pads, spark plugs, filters, tyres, fork seals, EV controllers and the rest). It reads each file's licence, author and description from the Commons API, keeps only images that can be reused on a commercial site (CC0, public domain, CC BY, CC BY-SA; anything NC, ND or fair use is dropped), and downloads a 1200 px web copy with a JSON metadata file and a ready-made credit line. With the default 25 per part, a full run returns up to 700 photos, depending on what Commons holds for each part.

## Run it in Claude Code

Put the script in your project folder and paste this into Claude Code:

```
Run download_part_photos.py with --contact marcel@transitionslab.org.
Install requests and openpyxl first if missing. When it finishes, open
images/contact_sheet.html, list any part with fewer than 5 photos, and rerun
those parts with --loose --max-per-part 40.
```

Or run it yourself:

```
pip install requests openpyxl
python download_part_photos.py --contact marcel@transitionslab.org
python download_part_photos.py --contact marcel@transitionslab.org --parts drive-belt,roller-weights --loose --max-per-part 40
python download_part_photos.py --contact marcel@transitionslab.org --originals   # also full-resolution files
```

A full run takes roughly 10 to 15 minutes because the script waits one second between requests, as Wikimedia asks of automated clients.

## What you get

| File | Contents |
|---|---|
| `images/<part_id>/<part_id>-NN.jpg` | 1200 px web copy |
| `images/<part_id>/<part_id>-NN.json` | title, Commons page, original URL, size, licence and licence URL, author, description, date, categories, relevance score, alt text, credit line, repair slug |
| `images/manifest.xlsx` and `manifest.csv` | one row per photo, ready to upload to Google Sheets or join to the `Model x Part` sheet on `part_id` |
| `images/ATTRIBUTIONS.md` | credit lines grouped by part |
| `images/contact_sheet.html` | thumbnail grid for review; click a photo to open its Commons page |

## Review before publishing

The relevance filter needs a part keyword plus a motorcycle or scooter word in the title, description or categories, but some results will still be off, such as car brakes tagged "motorcycle" or engine diagrams. Go through the contact sheet, delete the misses, and add a `keep` column to the manifest. Check the `restrictions` column too: Commons uses it to flag trademarks and people in the photo, and those images should stay off product-style placements.

## Using the photos on the parts and repair pages

Every manifest row carries `part_id` and `repair_slug`, so the site build can attach photos to both page types without manual work. On a model-part page, use the best `keep` photo for that `part_id` as the hero image, with the `alt_text` field and the credit line as caption or hover text. On repair guides, show two or three photos for the part being replaced next to the steps. Commons photos show the part type, not the exact Boxer or BeAT version, so label them "typical drum brake shoes" rather than as the exact fitment part.

CC BY and CC BY-SA require the credit to be visible; a caption, hover title or linked credits page all satisfy this. CC BY-SA also means any photo you crop or edit has to be shared under the same licence.

## Model-specific product photos

Exact product shots for a specific model (a Boxer BM150 brake shoe set, a BeAT v-belt in the box) belong to the retailer or manufacturer. Copying them from shop pages for your own site is infringement, even with a link back. There are three clean routes:

1. **Affiliate product feeds and APIs.** Amazon (Product Advertising / Creators API), eBay Browse API, FC-Moto's Webgains datafeed and AliExpress Portals return image URLs that their affiliate terms let you display next to the affiliate link. Usually you must hotlink them rather than store them, and refresh them, so treat them as live data in the price box rather than files in `images/`.
2. **Permission from regional suppliers.** Car & General, Bajaj distributors and Muthuri Motoparts in Kenya, or OEM parts portals, can grant written permission to use their product images. This fits naturally with the sponsorship slot in the shop guide.
3. **Your own photos and renders.** A one-day shoot of parts bought for the first 84 priority pages, plus renders of your Sketchfab component models, gives images you own outright and can reuse for your own parts range in phase 2.
