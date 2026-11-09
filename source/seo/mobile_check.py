#!/usr/bin/env python3
"""Check 10 key pages at 390 px for horizontal overflow. Needs the local server on :8765.
python3 source/seo/mobile_check.py [--shots DIR]"""
import json, sys
from playwright.sync_api import sync_playwright
BASE = 'http://localhost:8765/'
PAGES = ['', 'learn/', 'repair/', 'repair/problems/cranks-no-start/', 'repair/repairs/engine-oil-service/', 'repair/bikes/honda/',
         'parts/', 'articles/how-a-motorcycle-engine-works/', 'videos/', 'crash-course/', 'overview/', 'repair/bikes/royal-enfield/royal-enfield-classic-650/']
shots = sys.argv[sys.argv.index('--shots') + 1] if '--shots' in sys.argv else None
out = []
with sync_playwright() as p:
    import os, glob
    exe = next(iter(sorted(glob.glob('/opt/pw-browsers/chromium-*/chrome-linux*/chrome'))), None) or '/usr/bin/google-chrome'
    b = p.chromium.launch(executable_path=exe if os.path.exists(exe) else None)
    pg = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    for u in PAGES:
        try:
            pg.goto(BASE + u, wait_until='load', timeout=30000); pg.wait_for_timeout(800)
            r = pg.evaluate('''() => { const W = document.documentElement.clientWidth; const sw = document.documentElement.scrollWidth;
              const bad = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > W + 1 && getComputedStyle(e).position !== 'fixed'; })
                .filter(e => !e.closest('.hm-ticker, .r-jump, .mz-vjump, [style*="overflow"]')).slice(0, 3).map(e => e.tagName.toLowerCase() + '.' + (e.className && e.className.baseVal === undefined ? e.className : '').toString().split(' ')[0]);
              const imgs = [...document.images].filter(i => i.complete && i.naturalWidth && i.getBoundingClientRect().width && Math.abs(i.getBoundingClientRect().height / i.getBoundingClientRect().width - i.naturalHeight / i.naturalWidth) > 0.25 && getComputedStyle(i).objectFit === 'fill').length;
              return { scrollWidth: sw, clientWidth: W, overflow: sw > W + 1, wide: bad, stretched_imgs: imgs, h1: document.querySelectorAll('h1').length, title: document.title }; }''')
            if shots: pg.screenshot(path=f'{shots}/{(u or "home").strip("/").replace("/", "_")}.png')
        except Exception as ex:
            r = {'error': str(ex)[:200]}
        r['page'] = '/' + u; out.append(r)
    b.close()
print(json.dumps(out, indent=1))
