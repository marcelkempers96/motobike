"""Inverted (upside-down) front fork pair: anodised outer tubes clamped in the triple clamps, inner tubes and axle feet below."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import forks

META = {"title": "Front forks (inverted / USD)", "category": "chassis", "kind": "part", "view": (40, 14)}

def build():
    forks.build_fork('forks_usd', usd=True)
