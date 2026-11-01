#!/bin/bash
cd /home/claude/mc/lib3d
LOG=/home/claude/mc/assets/final.log
for a in "$@"; do
  SAMPLES=${SAMPLES:-32} timeout 1500 nice -n 19 python3 runner.py -- $a > /tmp/claude-0/final_$a.log 2>&1 && echo "ok $a" >> $LOG || echo "FAIL $a" >> $LOG
done
echo "BATCHDONE $1" >> $LOG
