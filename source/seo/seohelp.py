"""Small SEO helpers shared by the page builders (repair, parts, videos, articles).

img_attrs(html, page_path) adds width/height (read from the image file) and
loading="lazy" to <img> tags that lack them. page_path is the page's URL path
relative to the site root, e.g. 'repair/parts/brakes/'. The site logo in the
header keeps eager loading.
"""
import os, re
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
_DIMS = {}


def _dims(path):
    if path not in _DIMS:
        _DIMS[path] = None
        try:
            if path.lower().endswith('.svg'):
                t = open(path, encoding='utf-8', errors='ignore').read(2000)
                w = re.search(r'<svg[^>]*\swidth="(\d+(?:\.\d+)?)"', t); h = re.search(r'<svg[^>]*\sheight="(\d+(?:\.\d+)?)"', t)
                vb = re.search(r'viewBox="[\d.\-]+[ ,]+[\d.\-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"', t)
                if w and h: _DIMS[path] = (round(float(w.group(1))), round(float(h.group(1))))
                elif vb: _DIMS[path] = (round(float(vb.group(1))), round(float(vb.group(2))))
            else:
                from PIL import Image
                with Image.open(path) as im:
                    _DIMS[path] = im.size
        except Exception:
            pass
    return _DIMS[path]


def _resolve(src, page_path):
    src = unquote(src.split('?')[0].split('#')[0])
    if src.startswith(('http:', 'https:', 'data:', '//')):
        if '/assets/' in src and ('motobike-five' in src or 'motopedia' in src):
            return os.path.join(ROOT, src.split('/assets/', 1)[1].join(['assets/', '']))
        return None
    if src.startswith('/'):
        return os.path.join(ROOT, src.lstrip('/'))
    return os.path.normpath(os.path.join(ROOT, page_path, src))


def img_attrs(html, page_path):
    def fix(m):
        tag = m.group(0)
        if 'ute-brand-logo' in tag:
            return tag
        add = ''
        if not re.search(r'\swidth=', tag) and not re.search(r'\sheight=', tag):
            s = re.search(r'\ssrc="([^"]+)"', tag)
            d = _dims(_resolve(s.group(1), page_path)) if s and _resolve(s.group(1), page_path) else None
            if d:
                add += f' width="{d[0]}" height="{d[1]}"'
        if not re.search(r'\sloading=', tag) and 'fetchpriority' not in tag:
            add += ' loading="lazy"'
        if not add:
            return tag
        return tag[:-2] + add + ' />' if tag.endswith('/>') else tag[:-1] + add + '>'
    return re.sub(r'<img\b[^>]*>', fix, html)
