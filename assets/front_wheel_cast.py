import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _wheelkit import *

A = 'front_wheel_cast'
META = {"title": "Front wheel, cast alloy (17 in)", "category": "wheels", "kind": "part", "view": (-30, 18)}

def build():
    cast_wheel(A, True)
