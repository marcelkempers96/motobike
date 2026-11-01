#!/bin/bash
# Final render + GLB export for every asset module (sequential: 2 cores).
cd /home/claude/mc/lib3d
LOG=/home/claude/mc/assets/final.log; : > $LOG
for f in parts/[!_]*.py; do
  a=$(basename $f .py)
  if [ -f /home/claude/mc/assets/models/$a.glb ] && [ "$1" != "--force" ]; then echo "skip $a" >> $LOG; continue; fi
  SAMPLES=${SAMPLES:-32} timeout 1500 python3 runner.py -- $a > /tmp/claude-0/final_$a.log 2>&1 && echo "ok $a" >> $LOG || echo "FAIL $a" >> $LOG
done
echo ALLDONE >> $LOG
