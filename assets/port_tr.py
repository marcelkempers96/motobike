import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
from _twostroke import build_cylinder
META = {"title": "Two-stroke transfer ports (cutaway)", "category": "powertrain", "kind": "part", "view": (90, 12)}
A = 'port_tr'


def build():
    M = mats()
    # slice away everything forward of a plane just behind the axis, through the main transfer channels
    cut = box((40, 40, 60), (20 - 0.6, 0, 10), name='_front')
    build_cylinder(A, cut, M, piston_z=3.4)
    finalize(A)
