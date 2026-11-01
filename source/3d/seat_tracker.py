import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _kit_wbe import *

A = 'seat_tracker'
META = {"title": "Flat-tracker seat with tail hump", "category": "frame_body", "kind": "part", "view": (-38, 22)}

def build():
    # tuck-and-roll pad
    def Wp(x): return 24.0 - 5.0 * max(0.0, (x + 4) / 24.0) ** 1.4
    def roll(x, yf):
        side = max(0.0, min(1.0, (0.86 - abs(yf)) / 0.08))
        return 0.7 * side * (abs(math.cos(math.pi * yf * 2.5)) ** 0.35 - 0.75)
    pad, secs = pad_loft(A + '__pad', -19.0, 20.0, Wp, lambda x: 7.4 - 0.02 * x, lambda x: 2.6, M('leather_brown'), n=72, nx=44,
                         crown=0.6, top_mod=roll, ends_p=3.2, e=0.42)
    finish(pad, 0)
    path = [s[7] for s in secs[2:-2]] + [s[29] for s in reversed(secs[2:-2])]
    sweep(path, 0.28, A + '__piping', M('leather_brown'), 8, closed=True)
    # fibreglass tail hump
    def Wh(x): return 24.0 - 7.0 * ((-x - 15) / 25.0) ** 1.3 if x < -15 else 24.0
    def Zh(x):
        t = min(1.0, max(0.0, (x + 15.5) / -10.0))
        return 7.6 + 3.6 * (3 * t * t - 2 * t ** 3) - 0.08 * max(0.0, -x - 26)
    hump, _ = pad_loft(A + '__tail_hump', -40.0, -15.5, Wh, Zh, lambda x: 0.8, M('gloss_black'), n=48, nx=40, ends_p=4.0, e=0.36, crown=0.8)
    hm = hump.data.materials; hm.clear(); hm.append(mat('tracker_paint', (0.80, 0.76, 0.66), 0.0, 0.16, coat=1.0))
    finish(hump, 0)
    # base plate under both, and a small LED strip set into the hump tail
    base, _ = pad_loft(A + '__base_pan', -39.0, 19.5, lambda x: (min(Wp(x), Wh(x)) if x < -14 else Wp(x)) - 0.8, lambda x: 2.8, lambda x: 0.2,
                       M('plastic_black'), n=36, nx=36, ends_p=3.0, e=0.3)
    finish(base, 0)
    led = box((0.5, 6.0, 0.8), (-39.75, 0, 6.6), (0, 0, 0), 'led'); finish(led, 0.15, 2, m=M('glass_red'))
    led.name = A + '__tail_led'
