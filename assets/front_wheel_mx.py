import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _wheelkit import *

A = 'front_wheel_mx'
META = {"title": "Front wheel, motocross (21 in)", "category": "wheels", "kind": "part", "view": (-30, 20)}

def build():
    mx_wheel(A, True)
