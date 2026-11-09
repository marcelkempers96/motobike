#!/bin/bash
# Portrait reel: frames + caption band (Reels safe area) + logo, then a 1.6 s motopedia.org end card.
# Usage: source/promo/make_reel.sh <frames_dir> <endcard.mp4> <out.mp4> "<caption line 1>" ["<line 2>"]
set -e
DIR="$1"; END="$2"; OUT="$3"; L1="$4"; L2="${5:-}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOGO="$ROOT/assets/brand/motopedia-logo-white.png"
FB=/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf
T=$(mktemp -d); printf '%s' "$L1" > $T/l1; printf '%s' "$L2" > $T/l2
Y2=""; [ -n "$L2" ] && Y2=",drawtext=fontfile=$FB:textfile=$T/l2:fontcolor=0xF07A55:fontsize=46:x=(w-text_w)/2:y=455"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$DIR/list.txt" -i "$LOGO" -i "$END" -filter_complex "\
[0:v]scale=1080:1920,setsar=1,fps=30,format=yuv420p,\
drawbox=x=60:y=250:w=iw-120:h=$([ -n "$L2" ] && echo 290 || echo 230):color=0x141414@0.86:t=fill,\
drawtext=fontfile=$FB:textfile=$T/l1:fontcolor=white:fontsize=58:x=(w-text_w)/2:y=375$Y2[b];\
[1:v]scale=300:-1[l];[b][l]overlay=(W-w)/2:285[v];[v]fade=t=in:st=0:d=0.2[v1];\
[2:v]fps=30,format=yuv420p,setsar=1[e];[v1][e]concat=n=2:v=1[o]" \
-map "[o]" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -movflags +faststart -an "$OUT"
rm -rf $T
