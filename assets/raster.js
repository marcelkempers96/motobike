// Rasterise SVG figures to PNG for the PDFs (Preview-safe). usage: node raster.js out_dir width file.svg...
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [,,outDir,w,...files]=process.argv;const W=parseInt(w);fs.mkdirSync(outDir,{recursive:true});
const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:W,height:1000},deviceScaleFactor:1});
for(const f of files){const svg=fs.readFileSync(f,'utf8').replace(/<\?xml[^>]*>/,'');
const html=`<html><head><link rel="stylesheet" href="file:///home/claude/mc/fonts/fonts.css"><style>html,body{margin:0;background:transparent}svg{width:${W}px;height:auto;display:block}</style></head><body>${svg}</body></html>`;
const tmp='/home/claude/mc/fonts/_r.html';fs.writeFileSync(tmp,html);await p.goto('file://'+tmp);await p.evaluate(async()=>{await document.fonts.ready});
const el=await p.$('svg');const out=path.join(outDir,path.basename(f).replace(/\.svg$/,'.png'));await el.screenshot({path:out,omitBackground:true});console.log(out);}
await b.close();})();
