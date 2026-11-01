import sys,glob,subprocess,os
from PIL import Image
pdf,out=sys.argv[1],sys.argv[2];first=int(sys.argv[3]) if len(sys.argv)>3 else 1;last=int(sys.argv[4]) if len(sys.argv)>4 else 999
d='/tmp/claude-0/sh';subprocess.run(f'rm -rf {d};mkdir -p {d}',shell=True)
subprocess.run(['pdftoppm','-r','40','-png','-f',str(first),'-l',str(last),pdf,d+'/p'])
fs=sorted(glob.glob(d+'/p-*.png'));ims=[Image.open(f) for f in fs];w,h=ims[0].size;c=6;r=(len(ims)+c-1)//c
M=Image.new('RGB',(c*(w+6),r*(h+6)),'#777')
for i,im in enumerate(ims):M.paste(im,((i%c)*(w+6),(i//c)*(h+6)))
M.save(out)
