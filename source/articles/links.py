"""Shared link targets and the "Try it" / linked figure / "Go deeper" helpers used by arts1 to arts7.

Every src passed to try_box() and lfig() is relative to assets/; the width and height are read
from the file itself, so a missing image fails the build instead of shipping a broken page."""
import os
from html import escape

_ASSETS = os.path.join(os.path.dirname(__file__), '..', '..', 'assets')
_A = '../../assets/'

EN = '../../engine/#'                         # Under the Engine: overview, gearbox, clutch, shift, top, gen, start, final
WL = '../../wiring/#'                         # Wiring Lab tabs: harness, starting, charging, ignition
CB = '../../wiring/#build='                   # Circuit Builder presets
MD = '../../models/#'                         # 3D model library
QZ = '../../quiz/?topic='                     # module ids: foundations, engine, fuel, electrics, drivetrain-chassis, electric
EQ = '../../learn/#equations'
BUILD = '../../build/'
COCKPIT = '../../cockpit/'
VID = '../../videos/#'
REP = '../../repair/repairs/'
PRB = '../../repair/problems/'
PRT = '../../repair/parts/'


def OM(mode, part=None):
    """Overview link with an explicit bike mode and, optionally, a selected part."""
    return f'../../overview/?mode={mode}' + (f'&amp;part={part}' if part else '')


def _size(src):
    from PIL import Image
    with Image.open(os.path.join(_ASSETS, src)) as im:
        return im.size


def try_box(href, src, alt, title, text, button):
    """A "Try it" box: thumbnail and button both open the tool view."""
    w, h = _size(src)
    return f'''<aside class="mz-art-try">
  <a class="mz-art-try-img" href="{href}" tabindex="-1" aria-hidden="true"><img src="{_A}{src}" alt="{escape(alt)}" width="{w}" height="{h}" loading="lazy"></a>
  <div class="mz-art-try-body">
    <span class="ute-label">Try it</span>
    <p><strong>{title}</strong> {text}</p>
    <a class="ute-linkbtn" href="{href}">{button}</a>
  </div>
</aside>'''


def lfig(href, src, alt, cap, link_text):
    """An inline figure whose image links to the tool view it shows."""
    w, h = _size(src)
    return f'''<figure>
  <a href="{href}"><img src="{_A}{src}" alt="{escape(alt)}" width="{w}" height="{h}" loading="lazy"></a>
  <figcaption>{cap} <a href="{href}">{link_text}</a></figcaption>
</figure>'''


def deeper(items):
    """The "Go deeper" list at the end of an article body: (href, link text, note)."""
    li = '\n'.join(f'  <li><a href="{h}">{t}</a>{": " + n if n else ""}</li>' for h, t, n in items)
    return f'''<h2 id="go-deeper">Go deeper</h2>
<ul class="mz-art-deeper">
{li}
</ul>'''
