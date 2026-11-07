"""Rebrand the module PDFs from the old name (Moto + Zero) to Motopedia.  (One-off; already run on 6 Nov 2026.)

Replaces the running header text with the same font, size and colour, swaps the cover
logo for the Motopedia logo, updates the metadata and saves as motopedia-module-*.pdf.
Usage: python3 source/course/rebrand_pdfs.py   (reads the old assets/pdf/moto-zero-module-*.pdf files)
"""
import glob, os, sys
import pymupdf as fitz

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LOGO = os.path.join(ROOT, 'assets/brand/motopedia-logo-tagline.png')
OLD, NEW = 'Moto' + ' Zero', 'Motopedia'  # split so a site-wide rename does not rewrite it


def font_for(doc, page, name):
  for xref, _ext, _t, base, *_ in page.get_fonts(full=True):
    if base.split('+')[-1] == name:
      return fitz.Font(fontbuffer=doc.extract_font(xref)[3])
  return fitz.Font('helv')


def rebrand(src, dst):
  doc = fitz.open(src)
  for pno, page in enumerate(doc):
    hits = []
    for b in page.get_text('dict')['blocks']:
      for line in b.get('lines', []):
        for s in line['spans']:
          if OLD.lower() in s['text'].lower():
            hits.append(s)
    cover_logo = None
    for s in hits:
      if pno == 0 and s['text'].strip().lower() == OLD.lower():
        cover_logo = fitz.Rect(s['bbox'])  # the cover word mark: replaced by the logo image below
        continue
      page.add_redact_annot(fitz.Rect(s['bbox']), fill=False)
    if cover_logo:
      # the mark (circle) sits left of the word, the "by Transitions Lab" line under it
      area = fitz.Rect(cover_logo.x0 - 44, cover_logo.y0 - 3, cover_logo.x1 + 4, cover_logo.y1 + 10)
      page.add_redact_annot(area, fill=False)
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE,
                          graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED if cover_logo else fitz.PDF_REDACT_LINE_ART_NONE)
    for s in hits:
      if pno == 0 and cover_logo and s['text'].strip().lower() == OLD.lower():
        continue
      text = s['text'].replace(OLD, NEW).replace(OLD.upper(), NEW.upper()).replace(OLD.lower(), NEW)
      f = font_for(doc, page, s['font'].split('+')[-1])
      c = s['color']; rgb = ((c >> 16 & 255) / 255, (c >> 8 & 255) / 255, (c & 255) / 255)
      w = f.text_length(text, fontsize=s['size'])
      x1 = s['bbox'][2]
      # text that ends near the right margin is right-aligned (running header); everything else keeps its start
      x = x1 - w if x1 > page.rect.width * 0.6 else s['origin'][0]
      tw = fitz.TextWriter(page.rect)
      tw.append((x, s['origin'][1]), text, font=f, fontsize=s['size'])
      tw.write_text(page, color=rgb)
    if cover_logo:
      h = 40
      page.insert_image(fitz.Rect(area.x0 + 2, area.y0, area.x0 + 2 + h * 1433 / 424, area.y0 + h), filename=LOGO, keep_proportion=True)
  m = doc.metadata or {}
  doc.set_metadata({k: (v.replace(OLD, NEW) if isinstance(v, str) else v) for k, v in m.items()})
  doc.save(dst, garbage=3, deflate=True)
  left = sum(len(p.search_for(OLD)) for p in fitz.open(dst))
  print(os.path.basename(dst), doc.page_count, 'pages,', left, 'left')


if __name__ == '__main__':
  for src in sorted(glob.glob(os.path.join(ROOT, 'assets/pdf/' + 'moto-' + 'zero-module-*.pdf'))):
    dst = src.replace('moto-' + 'zero-module-', 'motopedia-module-')
    if len(sys.argv) > 1 and sys.argv[1] not in src: continue
    rebrand(src, dst)
