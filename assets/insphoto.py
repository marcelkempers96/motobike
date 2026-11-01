import sys,re
f,head,line=sys.argv[1],sys.argv[2],sys.argv[3]
L=open(f).read().split('\n')
i=next(k for k,l in enumerate(L) if l.startswith('#') and head in l)
# skip to end of first paragraph after heading
k=i+1
while k<len(L) and L[k].strip()=='' : k+=1
while k<len(L) and L[k].strip()!='': k+=1
L[k:k]=['',line]
open(f,'w').write('\n'.join(L))
print(f,'inserted at',k)
