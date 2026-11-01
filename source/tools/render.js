// usage: node render.js in.svg out.png [width]
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const os=require('os');
(async()=>{const [,,inp,out,w]=process.argv;const svg=fs.readFileSync(inp,'utf8');
const W=parseInt(w||'1600');
const html=`<html><head><link rel="stylesheet" href="file:///home/claude/mc/fonts/fonts.css"><style>body{margin:0;background:#F7F6F2} .plate{padding:24px;background-color:#F7F6F2;background-image:linear-gradient(#E4E7EF 1px,transparent 1px),linear-gradient(90deg,#E4E7EF 1px,transparent 1px);background-size:16px 16px} svg{width:100%;height:auto;display:block}</style></head><body><div class="plate">${svg}</div></body></html>`;
const tmp=path.join('/home/claude/mc/fonts','_render_'+process.pid+'.html');fs.writeFileSync(tmp,html);
const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:W,height:800}});
await p.goto('file://'+tmp,{waitUntil:'load'});await p.evaluate(async()=>{await document.fonts.ready;});
const el=await p.$('.plate');await el.screenshot({path:out});await b.close();fs.unlinkSync(tmp);})();
