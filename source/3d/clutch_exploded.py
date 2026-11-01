import sys, os, importlib.util
sys.path.insert(0, os.path.dirname(__file__))
META = {"title": "Wet multiplate clutch (exploded)", "category": "transmission", "kind": "part", "view": (-68, 18)}
A = 'clutch_exploded'


def build():
    spec = importlib.util.spec_from_file_location('clutch_base', os.path.join(os.path.dirname(__file__), 'clutch.py'))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    m.build(prefix=A, ex=True)
