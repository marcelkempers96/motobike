#!/bin/bash
# Join the promo clips into one showreel (1080x1080), each trimmed, with short crossfades, ending on the end card.
# Usage: source/promo/showreel.sh <clips_dir> <endcard.mp4> <out.mp4>
set -e
C="$1"; END="$2"; OUT="$3"
# file:start:duration   (order = story of the site)
LIST=(
  "01-home:0:4"
  "02-3d-overview:0:5.5"
  "11-superbike:0:2.2"
  "12-vintage-v-twin:0:2.2"
  "17-v-twin-cruiser:0:2.2"
  "06-cockpit-dyno:0:5.2"
  "04-bike-builder:0:4.5"
  "07-wiring-lab:1:4"
  "08-circuit-builder:2.5:2"
  "05-under-the-engine:0:6"
  "10-course:0:3.5"
  "15-carburettor:0:3.5"
  "09-diagnose:0:5.5"
  "16-repair-parts:0.5:4"
  "13-plates:0.5:3.5"
  "14-3d-models:0.5:3.5"
)
F=0.35   # crossfade length
args=(); filt=""; n=0
for item in "${LIST[@]}"; do
  IFS=: read -r name ss dur <<< "$item"
  args+=(-ss "$ss" -t "$dur" -i "$C/$name.mp4")
  filt+="[$n:v]fps=30,settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v$n];"
  durs[$n]=$dur; n=$((n+1))
done
args+=(-i "$END"); filt+="[$n:v]fps=30,settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v$n];"; durs[$n]=3.5
prev="v0"; off=0
for ((i=1; i<=n; i++)); do
  off=$(echo "$off + ${durs[$((i-1))]} - $F" | bc)
  filt+="[$prev][v$i]xfade=transition=fade:duration=$F:offset=$off[x$i];"
  prev="x$i"
done
ffmpeg -y -loglevel error "${args[@]}" -filter_complex "${filt%;}" -map "[$prev]" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -an "$OUT"
echo "$OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s"
