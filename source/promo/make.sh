#!/bin/bash
# Turn recorded frames into 1080x1080 MP4 clips with a caption and the Motopedia logo.
# Usage: source/promo/make.sh <frames_dir> <out.mp4> "<caption>" [interp]
set -e
DIR="$1"; OUT="$2"; CAP="$3"; INTERP="$4"; CROP="${5:-}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOGO="$ROOT/assets/brand/motopedia-logo-tagline-white.png"
FONT=/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf
MOTION="fps=30"
[ "$INTERP" = "1" ] && MOTION="minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1"
printf '%s' "$CAP" > /tmp/promo_cap.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i "$DIR/list.txt" -i "$LOGO" -filter_complex "\
[0:v]${CROP:+crop=$CROP,}scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080,setsar=1,$MOTION,format=yuv420p[v];\
[v]drawbox=x=0:y=ih-128:w=iw:h=128:color=0x141414@0.88:t=fill,\
drawtext=fontfile=$FONT:textfile=/tmp/promo_cap.txt:fontcolor=white:fontsize=36:x=44:y=h-128+(128-text_h)/2[b];\
[1:v]scale=250:-1[l];[b][l]overlay=W-w-40:H-128+(128-h)/2,fade=t=in:st=0:d=0.25[o]" \
-map "[o]" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -movflags +faststart -an "$OUT"
echo "$OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s"
