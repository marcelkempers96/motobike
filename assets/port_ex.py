import sys, os, math, bpy
sys.path.insert(0, os.path.dirname(__file__))
from _eng import *
from _twostroke import build_cylinder
META = {"title": "Two-stroke exhaust port (cutaway)", "category": "powertrain", "kind": "part", "view": (12, 14)}
A = 'port_ex'


def build():
    M = mats()
    cut = box((40, 40, 60), (20, -20, 10), name='_quarter')    # remove the front-left quarter: x > 0, y < 0
    build_cylinder(A, cut, M, piston_z=3.3)
    finalize(A)
