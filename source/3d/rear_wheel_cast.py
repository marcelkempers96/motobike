import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _wheelkit import *

A = 'rear_wheel_cast'
META = {"title": "Rear wheel, cast alloy with cush drive (17 in)", "category": "wheels", "kind": "part", "view": (-30, 18)}

def build():
    cast_wheel(A, False)
