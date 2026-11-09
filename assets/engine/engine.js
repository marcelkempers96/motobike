// Under the Engine: Three.js model, kinematics and UI wiring for the Motopedia engine explorer.
// Requires three@0.160.0 (see importmap.json). Units: millimetres. Axes: +x right (clutch side), +y up, +z forward.
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

const PI=Math.PI, TAU=2*PI, D2R=PI/180;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const wrapPI=a=>{a=(a+PI)%TAU;if(a<0)a+=TAU;return a-PI;};
const mod=(a,n)=>((a%n)+n)%n;

/* ---------------- renderer ---------------- */
const view=document.getElementById('view');
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.05;
renderer.localClippingEnabled=true;
view.prepend(renderer.domElement);
const scene=new THREE.Scene();
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(new RoomEnvironment(renderer),0.04).texture;
const camera=new THREE.PerspectiveCamera(32,1.6,5,6000);
camera.position.set(520,300,520);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true; controls.dampingFactor=.08; controls.target.set(0,40,-40);
controls.minDistance=120; controls.maxDistance=2200;
const key=new THREE.DirectionalLight(0xffffff,1.6); key.position.set(300,600,500); scene.add(key);
const fill=new THREE.DirectionalLight(0xdfe6ff,.6); fill.position.set(-500,200,-300); scene.add(fill);
scene.add(new THREE.HemisphereLight(0xffffff,0x9aa0aa,.45));
const root=new THREE.Group(); scene.add(root);

/* ---------------- materials ---------------- */
const std=(c,m,r,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:m,roughness:r},o));
const MAT={
  steel:std(0xc6cbd3,1,.24), chrome:std(0xf0f2f5,1,.1), dark:std(0x2c3037,.85,.36), black:std(0x17191d,.6,.42),
  alu:std(0xd3d6db,.85,.34), cast:std(0xb9bcc2,.7,.5), gold:std(0xd9a441,1,.28), bronze:std(0xc28a48,1,.33),
  copper:std(0xd2652f,.95,.3), copperDeep:std(0x9c3b16,.9,.38), rubber:std(0x141518,0,.85),
  friction:std(0x2d63cc,.15,.7), ceramic:std(0xf1efe8,0,.3), magnet:std(0x3b3e46,.4,.55),
  groove:std(0x050608,.2,.9), plastic:std(0x2a2c31,0,.6), green:std(0x2f8a4a,.2,.5), cable:std(0x1b1c20,0,.7),
  wireRed:std(0xc23a2e,0,.5), wireYel:std(0xd8b43a,0,.5), wireBlu:std(0x2b4fa8,0,.5), wireBlk:std(0x222,0,.5),
};
const ghostMat=new THREE.MeshPhysicalMaterial({color:0x9fb0cc,metalness:0,roughness:.25,transparent:true,opacity:.11,depthWrite:false,side:THREE.DoubleSide});
const ghostEdge=new THREE.MeshBasicMaterial({color:0x7d8db0,transparent:true,opacity:.25,depthWrite:false});
const ROLE={spl:0xE23B2E,free:0x2A4FE0,fix:0xF08A24,shaft:0xF3C12E};

/* ---------------- geometry helpers ---------------- */
// Plane angle a is measured in the y-z plane, a = atan2(z, y). Rotation about +x by t adds t to a.
const sp=(a,r)=>new THREE.Vector2(-r*Math.sin(a),r*Math.cos(a));
function finish(shape,w,bevel=.35){
  const g=new THREE.ExtrudeGeometry(shape,{depth:w,bevelEnabled:bevel>0,bevelThickness:bevel,bevelSize:bevel*.9,bevelSegments:1,curveSegments:10});
  g.translate(0,0,-w/2); g.rotateY(PI/2); return g;
}
function circlePath(r,cy=0,cz=0,hole=true){const p=new THREE.Path();const n=40;for(let i=0;i<=n;i++){const a=(hole?-1:1)*i/n*TAU;const v=sp(a,r);i?p.lineTo(v.x+(-cz),v.y+cy):p.moveTo(v.x+(-cz),v.y+cy);}return p;}
function arcSlot(a0,a1,r0,r1){const p=new THREE.Path();const n=12;for(let i=0;i<=n;i++){const v=sp(a0+(a1-a0)*i/n,r1);i?p.lineTo(v.x,v.y):p.moveTo(v.x,v.y);}for(let i=n;i>=0;i--){const v=sp(a0+(a1-a0)*i/n,r0);p.lineTo(v.x,v.y);}return p;}
function polarShape(fn,n=180){const s=new THREE.Shape();for(let i=0;i<n;i++){const a=i/n*TAU;const v=sp(a,fn(a));i?s.lineTo(v.x,v.y):s.moveTo(v.x,v.y);}s.closePath();return s;}
function gearShape(z,rp,ra,rf,prof){
  const p=TAU/z, s=new THREE.Shape();
  const half=prof==='spr'?(t=>p*(0.33-0.10*t-0.12*t*t)):(t=>p*(0.30-0.05*t-0.10*t*t));
  const ts=[0,.18,.42,.66,.86,1]; let first=true;
  const pt=(a,r)=>{const v=sp(a,r);if(first){s.moveTo(v.x,v.y);first=false;}else s.lineTo(v.x,v.y);};
  for(let k=0;k<z;k++){const c=k*p;
    for(const t of ts)pt(c-half(t),rf+(ra-rf)*t);
    for(let i=ts.length-1;i>=0;i--)pt(c+half(ts[i]),rf+(ra-rf)*ts[i]);
    const a0=c+half(0),a1=(k+1)*p-half(0);
    if(prof==='spr'){for(let j=1;j<4;j++){const u=j/4;pt(a0+(a1-a0)*u,rf-(ra-rf)*0.18*Math.sin(PI*u));}}
    else{for(let j=1;j<3;j++)pt(a0+(a1-a0)*j/3,rf);}
  }
  s.closePath(); return s;
}
// gear: z teeth, module m (or pitch radius), width w, options
function gearGeo(o){
  const rp=o.rp??o.m*o.z/2, ra=o.ra??rp+o.m, rf=o.rf??rp-1.25*o.m;
  const s=gearShape(o.z,rp,ra,rf,o.prof);
  if(o.bore)s.holes.push(circlePath(o.bore));
  if(o.windows){const {n,r0,r1,span}=o.windows;for(let k=0;k<n;k++){const c=k*TAU/n;s.holes.push(arcSlot(c-span/2,c+span/2,r0,r1));}}
  if(o.lighten){const {n,r,rr}=o.lighten;for(let k=0;k<n;k++){const a=(k+.5)*TAU/n;const p=new THREE.Path();for(let i=0;i<=24;i++){const t=-i/24*TAU;const c=sp(a,r);p.lineTo?0:0;const x=c.x+rr*Math.cos(t),y=c.y+rr*Math.sin(t);i?p.lineTo(x,y):p.moveTo(x,y);}s.holes.push(p);}}
  return finish(s,o.w,o.bevel??.35);
}
function ringGeo(r0,r1,w,bevel=.3){const s=new THREE.Shape();const n=64;for(let i=0;i<=n;i++){const v=sp(i/n*TAU,r1);i?s.lineTo(v.x,v.y):s.moveTo(v.x,v.y);}s.holes.push(circlePath(r0));return finish(s,w,bevel);}
function cylX(r,len,seg=40,r2){const g=new THREE.CylinderGeometry(r2??r,r,len,seg);g.rotateZ(-PI/2);return g;}
function mesh(g,m,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);return o;}
function boxAt(lx,ly,lz,m,x,y,z){return mesh(new THREE.BoxGeometry(lx,ly,lz),m,x,y,z);}
// cylinder between two points
function rod(a,b,r,m,seg=16){const d=new THREE.Vector3().subVectors(b,a);const L=d.length();const g=new THREE.CylinderGeometry(r,r,L,seg);const o=new THREE.Mesh(g,m);o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function helixGeo(R,turns,wire,len=1,seg=220){const pts=[];for(let i=0;i<=seg;i++){const t=i/seg;const a=t*turns*TAU;pts.push(new THREE.Vector3(R*Math.cos(a),t*len,R*Math.sin(a)));}return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),seg,wire,6,false);}
function tube(points,r,m,seg=64){return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),seg,r,8,false),m);}
// spline ribs along a shaft section
function splines(r,x0,x1,n,m,h=1.2){const g=new THREE.Group();for(let k=0;k<n;k++){const a=k*TAU/n;const b=boxAt(x1-x0,h*2,2.2,m,(x0+x1)/2,(r)*Math.cos(a),(r)*Math.sin(a));b.rotation.x=a;g.add(b);}return g;}
// ball bearing (static outer, balls)
function bearing(rIn,rOut,w,mat=MAT.steel){const g=new THREE.Group();const rm=(rIn+rOut)/2;const t=(rOut-rIn)*.28;g.add(mesh(ringGeo(rOut-t,rOut,w,.4),mat));g.add(mesh(ringGeo(rIn,rIn+t,w,.4),mat));const bs=(rOut-rIn-2*t)/2*1.05;const n=Math.max(7,Math.floor(TAU*rm/(bs*2.4)));const balls=new THREE.Group();for(let k=0;k<n;k++){const a=k*TAU/n;balls.add(mesh(new THREE.SphereGeometry(bs,14,10),MAT.chrome,0,rm*Math.cos(a),rm*Math.sin(a)));}g.add(balls);g.userData.balls=balls;g.traverse(o=>o.userData.noRole=true);return g;}
function hexNut(r,w,m=MAT.steel){const g=new THREE.CylinderGeometry(r,r,w,6);g.rotateZ(-PI/2);return new THREE.Mesh(g,m);}

/* ---------------- layout (mm). x across the bike (+x = right/clutch side), y up, z forward ---------------- */
const P2=(y,z)=>({y,z});
const unit=(y,z)=>{const l=Math.hypot(y,z);return P2(y/l,z/l);};
const addP=(a,d,s)=>P2(a.y+d.y*s,a.z+d.z*s);
const dst=(a,b)=>Math.hypot(a.y-b.y,a.z-b.z);
function circInt(c1,r1,c2,r2,pick){const d=dst(c1,c2);const a=(r1*r1-r2*r2+d*d)/(2*d);const h=Math.sqrt(Math.max(0,r1*r1-a*a));const u=P2((c2.y-c1.y)/d,(c2.z-c1.z)/d);const m=addP(c1,u,a);const p1=P2(m.y-u.z*h,m.z+u.y*h),p2=P2(m.y+u.z*h,m.z-u.y*h);return pick(p1,p2);}
const CR=P2(0,0);
const PRI={zc:18,zb:67,m:1.75}; const GB={m:2};
const MS=addP(CR,unit(-38,-63.5),PRI.m*(PRI.zc+PRI.zb)/2);   // mainshaft axis
const CS=addP(MS,unit(.2,-.98),GB.m*49/2);                   // countershaft axis
const KQ=addP(MS,unit(-.85,.53),GB.m*(30+22)/2);              // kick spindle
const BAL=addP(CR,unit(-.35,.94),1.75*28);                    // balancer
const DR=P2(-86,-100);                                        // shift drum
const SM=P2(50,-44);                                          // starter motor
const RD=circInt(CR,1.25*(46+14)/2,SM,1.25*(42+10)/2,(a,b)=>a.y>b.y?a:b); // reduction gear
const FM=addP(MS,unit(DR.y-MS.y,DR.z-MS.z),34);               // fork shaft for mainshaft fork
const FC=circInt(CS,45,DR,25,(a,b)=>a.y<b.y?a:b);             // fork shaft for countershaft forks
const GS=P2(-130,-72);                                        // gearshift spindle
const COL={c1:36,c5:18,c3:0,c4:-18,c2:-36};
const CYCLE={r:24.75,L:100,bore:28.25};
const CAM={y:200,base:13,lift:6.5};

/* ---------------- part registry ---------------- */
const PARTS={}, pickables=[], SYS={};
const SYSINFO=[
  ['crank','Crank and piston'],['valve','Cam drive and valvetrain'],['ign','Generator and ignition'],['start','Starting'],
  ['bal','Balancer'],['clutch','Clutch'],['box','Gearbox'],['shift','Gear selection'],['final','Final drive']];
function part(id,meta,obj){
  root.add(obj);
  const p=Object.assign({},meta,{id,obj,base:obj.position.clone(),ex:new THREE.Vector3(...(meta.ex||[0,0,0])),dyn:new THREE.Vector3(),mats:[],meshes:[]});
  const cache=new Map();
  obj.traverse(o=>{if(!o.isMesh)return;o.userData.pid=id;
    const k=o.material.uuid+(o.userData.noRole?'n':'')+(o.userData.cut?'c':'')+(o.userData.role||'');
    let m=cache.get(k);
    if(!m){m=o.material.clone();m.userData={baseColor:m.color.clone(),baseOp:m.opacity,baseTr:m.transparent,baseDW:m.depthWrite,noRole:!!o.userData.noRole,role:o.userData.role||null,cut:!!o.userData.cut,ghost:o.material===ghostMat||o.material===ghostEdge};if(m.userData.cut){if(!p.plane){p.plane=new THREE.Plane(new THREE.Vector3(0,0,-1),0);p.clipArr=[p.plane];}m.clippingPlanes=p.clipArr;m.side=THREE.DoubleSide;m.clipShadows=true;}cache.set(k,m);p.mats.push(m);}
    o.material=m;pickables.push(o);p.meshes.push(o);});
  PARTS[id]=p;(SYS[p.sys]=SYS[p.sys]||[]).push(id);return p;
}
const G=()=>new THREE.Group();
function at(g,pt,x=0){g.position.set(x,pt.y,pt.z);return g;}

/* ======================= CRANKSHAFT ======================= */
function webShape(){return polarShape(a=>{const ar=Math.abs(wrapPI(a-PI));const cw=ar<1.2?46:Math.max(25,46-(ar-1.2)*30);const s=CYCLE.r*Math.sin(a);const q=17*17-s*s;const boss=q>0?CYCLE.r*Math.cos(a)+Math.sqrt(q):0;return Math.max(cw,boss,24);},200);}
const crank=G(), crankSpin=G(); crank.add(crankSpin);
{ const ws=webShape();
  for(const sx of [-1,1]){const w=mesh(finish(ws,13,.8),MAT.steel,sx*16.5,0,0);crankSpin.add(w);
    const hole=mesh(cylX(5,13.6,20),MAT.dark,sx*16.5,-30,0);crankSpin.add(hole);}
  crankSpin.add(mesh(cylX(12.5,20),MAT.chrome,0,CYCLE.r,0));                // crank pin
  crankSpin.add(mesh(cylX(12,40),MAT.steel,-43,0,0));                         // left journal
  crankSpin.add(mesh(cylX(10.5,30,40,12),MAT.steel,-77,0,0));                 // left taper
  crankSpin.add(mesh(cylX(12,30),MAT.steel,38,0,0));
  crankSpin.add(mesh(cylX(11,26),MAT.steel,66,0,0));
  const n=hexNut(9,6);n.position.x=76;crankSpin.add(n);
}
const brgL=bearing(12,30,13), brgR=bearing(12,30,13); brgL.position.x=-34; brgR.position.x=34; crank.add(brgL,brgR);
part('crank',{sys:'crank',name:'Crankshaft',ex:[0,0,0],tag:[0,-50,0],
  desc:'Turns the up-and-down push of the piston into rotation. Two heavy webs carry the crank pin 24.75 mm off-centre and act as counterweights. Everything else on this stand is driven from it: cam chain, starter clutch and flywheel on the left, balancer and primary gear on the right.',
  spec:()=>[['Stroke','49.5 mm (throw 24.75 mm)'],['Main bearings','2 ball bearings, 25 mm bore'],['Drives','Cam chain, balancer, primary gear, flywheel']],rpm:()=>S.rpmShow},crank);

/* piston + conrod */
const piston=G(), rodG=G();
{ const body=mesh(new THREE.CylinderGeometry(CYCLE.bore,CYCLE.bore,30,48),MAT.alu,0,1,0);piston.add(body);
  const crown=mesh(new THREE.CylinderGeometry(CYCLE.bore-1,CYCLE.bore,2,48),MAT.alu,0,17,0);piston.add(crown);
  for(const [y,m] of [[12,MAT.dark],[8.5,MAT.dark],[5,MAT.dark]]){const t=mesh(new THREE.TorusGeometry(CYCLE.bore+.05,.7,6,48),m,0,y,0);t.rotation.x=PI/2;piston.add(t);}
  for(const s of [-1,1])piston.add(mesh(cylX(9,6),MAT.alu,s*18,0,0));
  piston.add(mesh(cylX(7.5,48),MAT.chrome,0,0,0));
  for(const s of [-1,1]){const c=mesh(new THREE.TorusGeometry(6,.8,6,20),MAT.steel,s*24.5,0,0);c.rotation.y=PI/2;piston.add(c);}
  const L=CYCLE.L;
  rodG.add(mesh(ringGeo(12.6,21,16,.6),MAT.steel,0,0,0));
  rodG.add(mesh(ringGeo(7.6,11.5,14,.5),MAT.steel,0,L,0));
  const beam=new THREE.Shape([new THREE.Vector2(-8,16),new THREE.Vector2(8,16),new THREE.Vector2(5,L-9),new THREE.Vector2(-5,L-9)]);
  rodG.add(mesh(finish(beam,8,.8),MAT.steel));
  const cap1=boxAt(4,6,40,MAT.steel,0,-3,0);cap1.visible=false;
}
part('piston',{sys:'crank',name:'Piston, rings and pin',ex:[0,120,0],tag:[0,22,0],
  desc:'An aluminium piston sealed to the cylinder by two compression rings and an oil ring. The gudgeon pin joins it to the small end of the connecting rod. Combustion pressure on the crown is what drives the whole engine.',
  spec:()=>[['Bore','56.5 mm'],['Rings','2 compression, 1 oil control'],['Swept volume','124 cc']],rpm:()=>null},piston);
part('conrod',{sys:'crank',name:'Connecting rod',ex:[0,70,0],tag:[0,50,0],
  desc:'Links the piston pin to the crank pin. Its small end only rocks back and forth while its big end follows the crank pin in a full circle on a caged needle bearing.',
  spec:()=>[['Centre distance','100 mm'],['Big end','Needle roller bearing'],['Rod ratio','2.02 : 1']],rpm:()=>null},rodG);

/* gas column + cylinder + head ghost */
const shell=G();
{ const barrel=mesh(new THREE.CylinderGeometry(CYCLE.bore+5,CYCLE.bore+5,112,48,1,true),ghostMat,0,92,0);shell.add(barrel);
  for(let y=62;y<=142;y+=9){const f=mesh(new THREE.CylinderGeometry(50,50,2.4,48,1,false),ghostMat,0,y,0);shell.add(f);}
  const head=mesh(new THREE.BoxGeometry(96,72,104),ghostMat,0,184,0);shell.add(head);
  for(let y=228;y<=246;y+=9)shell.add(mesh(new THREE.BoxGeometry(110,2.4,116),ghostMat,0,y,0));
  const ring=mesh(new THREE.TorusGeometry(CYCLE.bore+5,.5,6,60),ghostEdge,0,148,0);ring.rotation.x=PI/2;shell.add(ring);
  const ring2=ring.clone();ring2.position.y=36;shell.add(ring2);
}
part('shell',{sys:'valve',name:'Cylinder and head (outline)',ex:[0,140,0],tag:[-60,140,0],
  desc:'The finned cylinder barrel and cylinder head, drawn as a transparent outline so the piston and valves stay visible. The fins shed heat into the air stream. Toggle it under Show.',
  spec:()=>[['Cooling','Air, cast fins'],['Combustion chamber','Hemispherical, 2 valves']],rpm:()=>null},shell);
const gasMat=new THREE.MeshBasicMaterial({color:0x6aa0ff,transparent:true,opacity:.18,depthWrite:false});
const gas=mesh(new THREE.CylinderGeometry(CYCLE.bore-.5,CYCLE.bore-.5,1,40),gasMat);root.add(gas);

/* ======================= CAM DRIVE & VALVETRAIN ======================= */
const SPR=(z,p)=>p/(2*Math.sin(PI/z));
var PICKUP_ANG=105*D2R;
const CAMCH={p:6.35,zc:16,zk:32}; CAMCH.rc=SPR(16,6.35); CAMCH.rk=SPR(32,6.35);
const camSprC=G(); camSprC.position.x=-47;
camSprC.add(mesh(gearGeo({z:16,rp:CAMCH.rc,ra:CAMCH.rc+2.6,rf:CAMCH.rc-2.2,w:6,prof:'spr',bore:10}),MAT.dark));
crankSpin.add(camSprC);
// valve lift functions
function liftAt(phi,c,w){const d=mod(phi-c+360,720)-360;if(Math.abs(d)>=w/2)return 0;return CAM.lift*Math.pow(Math.cos(PI*d/w),2);}
const LIFT={in:phi=>liftAt(phi,110,240),ex:phi=>liftAt(phi,610,240)};
const head=G(); head.position.set(0,CAM.y,0);
const camSpin=G(); head.add(camSpin);
{ camSpin.add(mesh(cylX(8.5,72),MAT.steel,-14,0,0));
  for(const [k,x] of [['in',6],['ex',-6]]){const sh=polarShape(b=>CAM.base+LIFT[k](mod(-2*b/D2R,720)),240);camSpin.add(mesh(finish(sh,8,.5),MAT.chrome,x,0,0));}
  const spr=mesh(gearGeo({z:32,rp:CAMCH.rk,ra:CAMCH.rk+2.6,rf:CAMCH.rk-2.2,w:6,prof:'spr',bore:8,lighten:{n:4,r:19,rr:5}}),MAT.dark,-47,0,0);camSpin.add(spr);
  for(const x of [-34,22])head.add(mesh(ringGeo(8.6,15,9),MAT.steel,x,0,0));
}
part('camshaft',{sys:'valve',name:'Camshaft and cam sprocket',ex:[0,210,0],tag:[-47,40,0],
  desc:'Turns at exactly half crank speed, because each valve opens once every two crank revolutions. The 32-tooth sprocket is driven by the 16-tooth sprocket on the crank. Two lobes, one per valve, push the rocker arms.',
  spec:()=>[['Sprockets','16 T crank : 32 T cam = 2 : 1'],['Lobe lift','6.5 mm'],['Intake opens / closes','10° BTDC / 50° ABDC'],['Exhaust opens / closes','50° BBDC / 10° ATDC']],rpm:()=>S.rpmShow/2},head);
// rockers + valves
const VALVES={};
for(const [k,sz,x] of [['ex',1,-6],['in',-1,6]]){
  const pivot=P2(CAM.y+24,sz*21);
  const rk=G(); rk.position.set(x,pivot.y,pivot.z);
  const arm=new THREE.Shape();const pts=[[-11,-18.5*sz],[-6,-21*sz],[3,0],[-6,20*sz],[-11,19*sz],[-4,0]];
  // build arm in (y,z) relative coords via sp-free manual mapping: shape (xs,ys)=(-z,y)
  arm.moveTo(-pts[0][1],pts[0][0]);for(const p of pts.slice(1))arm.lineTo(-p[1],p[0]);arm.closePath();
  rk.add(mesh(finish(arm,7,.8),MAT.steel));
  rk.add(mesh(cylX(4.5,14),MAT.chrome));
  rk.add(mesh(cylX(2.8,9),MAT.chrome,0,-9,19*sz));      // adjuster
  const vg=G();
  const tip=new THREE.Vector3(x,CAM.y+13,sz*40), seat=new THREE.Vector3(x,150,sz*15);
  const axis=new THREE.Vector3().subVectors(seat,tip).normalize();
  vg.position.copy(tip); vg.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),axis);
  const vL=tip.distanceTo(seat);
  const valveMove=G(); vg.add(valveMove);
  valveMove.add(mesh(new THREE.CylinderGeometry(2.75,2.75,vL,16),MAT.chrome,0,-vL/2,0));
  const hr=k==='in'?13:11;
  valveMove.add(mesh(new THREE.CylinderGeometry(hr,3.5,4,40),MAT.chrome,0,-vL+1,0));
  valveMove.add(mesh(new THREE.CylinderGeometry(9,7,3,24),MAT.steel,0,-6,0));   // retainer
  const spring=mesh(helixGeo(8,6.5,1.3,1),MAT.chrome);spring.position.y=-30;vg.add(spring);
  const spring2=mesh(helixGeo(5.6,7.5,.9,1),MAT.chrome);spring2.position.y=-30;vg.add(spring2);
  vg.add(mesh(new THREE.CylinderGeometry(10,10,1.5,24),MAT.steel,0,-30.7,0));
  VALVES[k]={rk,valveMove,spring,spring2,sz,vg};
  part('rocker'+k,{sys:'valve',name:(k==='in'?'Intake':'Exhaust')+' rocker arm',ex:[0,230,0],tag:[0,8,0],
    desc:'A lever on a fixed shaft. The cam lobe lifts one end and the other end presses the valve stem down, opening the valve. A screw adjuster sets the tappet clearance, the gap that has to be checked on every service.',
    spec:()=>[['Ratio','About 1 : 1'],['Tappet clearance', k==='in'?'0.08 mm cold':'0.08 mm cold']],rpm:()=>null},rk);
  part('valve'+k,{sys:'valve',name:(k==='in'?'Intake':'Exhaust')+' valve and springs',ex:[0,180,0],tag:[0,-20,0],
    desc:k==='in'?'Lets the fresh air and fuel mixture into the cylinder. It is the larger of the two valves because the mixture enters at low pressure. Two nested springs close it again as the cam lobe passes.':'Lets the burnt gas out towards the exhaust pipe. It runs much hotter than the intake valve and is smaller because the gas leaves under pressure. Two nested springs snap it shut.',
    spec:()=>[['Head diameter',k==='in'?'26 mm':'22 mm'],['Stem','5.5 mm'],['Springs','Inner and outer, opposite wind']],rpm:()=>null},vg);
}
// spark plug
const plug=G();
{ const a=new THREE.Vector3(14,157,0), b=new THREE.Vector3(48,212,0);
  const d=new THREE.Vector3().subVectors(b,a);const L=d.length();
  plug.position.copy(a); plug.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());
  plug.add(mesh(new THREE.CylinderGeometry(5,5,14,20),MAT.steel,0,7,0));
  const hx=new THREE.CylinderGeometry(8,8,8,6);plug.add(mesh(hx,MAT.steel,0,18,0));
  plug.add(mesh(new THREE.CylinderGeometry(5,6,22,24),MAT.ceramic,0,33,0));
  plug.add(mesh(new THREE.CylinderGeometry(2.6,2.6,7,12),MAT.chrome,0,47,0));
  plug.add(mesh(new THREE.CylinderGeometry(9,7,24,24),MAT.rubber,0,52,0));
  plug.add(mesh(new THREE.CylinderGeometry(1.1,1.1,4,8),MAT.chrome,0,-1,0));
}
const sparkLight=new THREE.PointLight(0x9fc4ff,0,180,1.5); sparkLight.position.set(12,152,0); root.add(sparkLight);
const sparkGlow=mesh(new THREE.SphereGeometry(5,16,12),new THREE.MeshBasicMaterial({color:0xcfe2ff,transparent:true,opacity:0,depthWrite:false}),13,154,0);root.add(sparkGlow);
part('plug',{sys:'ign',name:'Spark plug',ex:[40,170,0],tag:[0,60,0],
  desc:'Needs more than 20,000 volts to jump its electrode gap. It fires a few degrees before top dead centre on the compression stroke, so the burning mixture reaches peak pressure just after the piston turns down.',
  spec:()=>[['Gap','0.6 to 0.7 mm'],['Fires','Once every 720° of crank rotation'],['Timing','15° BTDC at idle']],rpm:()=>null},plug);

/* cam chain */
const chainPath=(()=>{const c1=P2(0,0),r1=CAMCH.rc,c2=P2(CAM.y,0),r2=CAMCH.rk;const d=CAM.y;const b=Math.asin((r2-r1)/d);
  // back run on z<0 side, going up; front run z>0 going down
  const pts=[];const N=400;
  const tB0=P2(c1.y+r1*Math.sin(b), -r1*Math.cos(b)), tB1=P2(c2.y+r2*Math.sin(b),-r2*Math.cos(b));
  const seg=[];
  const lineSeg=(a,c)=>seg.push({t:'l',a,c,len:dst(a,c)});
  const arcSeg=(cen,r,a0,a1)=>seg.push({t:'a',cen,r,a0,a1,len:Math.abs(a1-a0)*r});
  const aB=Math.atan2(-Math.cos(b),Math.sin(b)); // plane angle of back tangent point
  lineSeg(tB0,tB1);
  arcSeg(c2,r2,aB,-aB);
  const tF1=P2(c2.y+r2*Math.sin(b),r2*Math.cos(b)), tF0=P2(c1.y+r1*Math.sin(b),r1*Math.cos(b));
  lineSeg(tF1,tF0);
  arcSeg(c1,r1,-aB,TAU+aB);
  let L=0;for(const s of seg){s.s0=L;L+=s.len;}
  const at=s=>{s=mod(s,L);for(const g of seg){if(s<=g.s0+g.len){const u=(s-g.s0)/g.len;if(g.t==='l')return {p:P2(g.a.y+(g.c.y-g.a.y)*u,g.a.z+(g.c.z-g.a.z)*u),ang:Math.atan2(g.c.z-g.a.z,g.c.y-g.a.y)};const a=g.a0+(g.a1-g.a0)*u;return {p:P2(g.cen.y+g.r*Math.cos(a),g.cen.z+g.r*Math.sin(a)),ang:a+PI/2};}}return at(0);};
  return {L,at};
})();
function makeChain(nLinks,pitch,plateL,plateH,gap,rollR,matPlate=MAT.steel){
  const plates=new THREE.InstancedMesh(new THREE.BoxGeometry(1.1,plateH,plateL),matPlate,nLinks*2);
  const rollers=new THREE.InstancedMesh(new THREE.CylinderGeometry(rollR,rollR,gap+2.4,12).rotateZ(-PI/2),MAT.chrome,nLinks);
  const g=G();g.add(plates,rollers);g.userData={plates,rollers,n:nLinks,pitch,gap};
  plates.instanceMatrix.setUsage(THREE.DynamicDrawUsage);rollers.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  return g;
}
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_v=new THREE.Vector3(),_s=new THREE.Vector3(1,1,1);
function layChain(ch,pathAt,L,s0,x0,visibleFn){
  const {plates,rollers,n,gap}=ch.userData;const step=L/n;
  for(let i=0;i<n;i++){const s=s0+i*step;const a=pathAt(s),b=pathAt(s+step);
    const my=(a.p.y+b.p.y)/2,mz=(a.p.z+b.p.z)/2;const ang=Math.atan2(b.p.z-a.p.z,b.p.y-a.p.y);
    const vis=visibleFn?visibleFn(s):true;const sc=vis?1:0;
    _e.set(ang-PI/2,0,0);_q.setFromEuler(_e);_s.set(sc,sc,sc);
    const off=(i%2?gap/2+.6:gap/2+1.8);
    _v.set(x0-off,my,mz);_m.compose(_v,_q,_s);plates.setMatrixAt(2*i,_m);
    _v.set(x0+off,my,mz);_m.compose(_v,_q,_s);plates.setMatrixAt(2*i+1,_m);
    _v.set(x0,a.p.y,a.p.z);_m.compose(_v,_q,_s);rollers.setMatrixAt(i,_m);}
  plates.instanceMatrix.needsUpdate=true;rollers.instanceMatrix.needsUpdate=true;
}
const camChain=makeChain(Math.round(chainPath.L/CAMCH.p),CAMCH.p,7.6,5.4,4.4,1.9);
const camChainG=G();camChainG.add(camChain);
// guides: front (fixed guide) + back (tensioner slipper)
{ const mk=(side,col)=>{const pts=[];for(let i=0;i<=10;i++){const y=30+i*13;const t=y/CAM.y;const z=side*(CAMCH.rc+(CAMCH.rk-CAMCH.rc)*t+4.5)+side*Math.sin(PI*i/10)*(side<0?3:0);pts.push(new THREE.Vector3(-47,y,z));}
    const shape=new THREE.Shape();shape.moveTo(-4,-2.2);shape.lineTo(4,-2.2);shape.lineTo(4,2.2);shape.lineTo(-4,2.2);
    return new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{steps:40,bevelEnabled:false,extrudePath:new THREE.CatmullRomCurve3(pts)}),col);};
  camChainG.add(mk(1,MAT.rubber));camChainG.add(mk(-1,MAT.rubber));
  camChainG.add(rod(new THREE.Vector3(-47,70,-30),new THREE.Vector3(-47,40,-48),3.2,MAT.steel));
}
part('camchain',{sys:'valve',name:'Cam chain, guide and tensioner',ex:[-40,90,0],tag:[-47,110,-25],
  desc:'A roller chain that keeps the camshaft locked to the crank at a 2 : 1 ratio, so the valves always open at the right moment. The crank pulls the front run tight against a fixed guide; a sprung slipper on the slack rear run takes up stretch as the chain wears.',
  spec:()=>[['Pitch','6.35 mm (1/4 in)'],['Links',String(camChain.userData.n)],['Ratio','16 T : 32 T']],rpm:()=>null},camChainG);

/* ======================= GENERATOR / IGNITION ======================= */
const rotor=G(), rotorSpin=G(); rotor.position.x=0; rotor.add(rotorSpin);
{ const prof=[[10,-62],[17,-62],[17,-69],[56.5,-69],[56.5,-104],[51.5,-104],[51.5,-73],[17,-73],[10,-73]].map(([r,y])=>new THREE.Vector2(r,y));
  const lg=new THREE.LatheGeometry(prof,80);lg.rotateZ(-PI/2);
  const shellM=mesh(lg,MAT.steel);shellM.userData.cut=true;rotorSpin.add(shellM);
  // geometry rotated: lathe y -> x but sign: rotateZ(-90) maps y->x? check: (x=r,y)->(y,-r): yes y->x
  for(let k=0;k<6;k++){const a=k*TAU/6+PI/6;const s=new THREE.Shape();const n=10;for(let i=0;i<=n;i++){const v=sp(a-.42+.84*i/n,51.4);i?s.lineTo(v.x,v.y):s.moveTo(v.x,v.y);}for(let i=n;i>=0;i--){const v=sp(a-.42+.84*i/n,47.5);s.lineTo(v.x,v.y);}
    const mg=mesh(finish(s,28,.2),MAT.magnet,-88,0,0);mg.userData.cut=true;rotorSpin.add(mg);}
  const bump=boxAt(22,2.6,9,MAT.steel,-80,0,0);const ba=CRANK_BUMP();bump.position.set(-82,57.6*Math.cos(ba),57.6*Math.sin(ba));bump.rotation.x=ba;rotorSpin.add(bump);
  for(let k=0;k<4;k++){const a=k*TAU/4+.4;const b=hexNut(3.2,3,MAT.steel);b.position.set(-67,30*Math.cos(a),30*Math.sin(a));rotorSpin.add(b);}
}
function CRANK_BUMP(){return PICKUP_ANG+15*D2R;}
part('rotor',{sys:'ign',name:'Flywheel rotor (magneto)',ex:[-120,0,0],tag:[-86,62,0],
  desc:'A steel cup bolted to the crank taper with six permanent magnets on its inner rim. As it spins around the fixed stator coils it generates alternating current, and its mass smooths out the single cylinder\'s uneven power pulses. A raised bar on the outside triggers the pickup coil once per revolution.',
  spec:()=>[['Magnets','6 ceramic segments'],['Output','AC, roughly 12 V lighting, 100-250 V exciter'],['Reluctor','1 bar, 15° before the timing mark']],rpm:()=>S.rpmShow},rotor);
const stator=G();
const exciterMats=[];
{ stator.position.x=-88;
  stator.add(mesh(ringGeo(16,25,16,.4),MAT.cast));
  for(let k=0;k<6;k++){const a=k*TAU/6;const arm=boxAt(14,17,8,MAT.cast,0,(25+8)*Math.cos(a),(25+8)*Math.sin(a));arm.rotation.x=a;stator.add(arm);
    const shoe=boxAt(16,2.6,22,MAT.cast,0,43.4*Math.cos(a),43.4*Math.sin(a));shoe.rotation.x=a;stator.add(shoe);
    const exc=k===3;
    const coil=new THREE.Group();coil.position.set(0,32*Math.cos(a),32*Math.sin(a));coil.rotation.x=a;
    coil.add(mesh(new THREE.CylinderGeometry(9,9,15,24),exc?MAT.copperDeep:MAT.copper));
    const turns=exc?16:8;for(let i=0;i<turns;i++){const t=mesh(new THREE.TorusGeometry(9.05,exc?.28:.45,4,24),exc?MAT.copper:MAT.copperDeep,0,-7+14*i/(turns-1),0);t.rotation.x=PI/2;coil.add(t);}
    if(exc)coil.userData.exc=true;
    stator.add(coil);}
  stator.add(mesh(ringGeo(5,15,8),MAT.steel,-10,0,0));
}
part('stator',{sys:'ign',name:'Stator coils',ex:[-80,0,0],tag:[0,0,-50],
  desc:'Six coils wound on a laminated iron core, bolted to the left crankcase cover so they never turn. Five feed the lighting and charging circuit. The darker exciter coil at the bottom has a denser winding of thinner wire, which gives the higher voltage the CDI unit needs to fire the plug.',
  spec:()=>[['Poles','6'],['Exciter coil','Fine wire, many turns, 100-250 V AC'],['Lighting coils','Heavier wire, 12-14 V AC']],rpm:()=>0},stator);
const pickup=G();
{ pickup.position.set(-82,64*Math.cos(PICKUP_ANG),64*Math.sin(PICKUP_ANG));pickup.rotation.x=PICKUP_ANG;
  pickup.add(boxAt(26,9,14,MAT.plastic,0,4,0));pickup.add(mesh(new THREE.CylinderGeometry(4.5,4.5,10,16),MAT.copper,0,1,0));
  pickup.add(boxAt(10,4,10,MAT.steel,0,-2,0));
}
part('pickup',{sys:'ign',name:'Pickup coil',ex:[-120,30,20],tag:[0,10,0],
  desc:'A small magnet wrapped in a coil of wire, mounted just outside the rotor. When the reluctor bar on the rotor sweeps past, it induces a short voltage pulse that tells the CDI unit exactly when to fire.',
  spec:()=>[['Signal','About 1-3 V pulse'],['Air gap','0.5 to 0.8 mm']],rpm:()=>null},pickup);
// CDI + coil + wires
const cdi=G(); cdi.position.set(-150,90,-60);
cdi.add(boxAt(18,58,40,MAT.plastic));cdi.add(boxAt(8,14,26,MAT.gold,-12,22,0));
part('cdi',{sys:'ign',name:'CDI unit',ex:[-60,30,0],tag:[0,36,0],
  desc:'Capacitive discharge ignition. A capacitor inside charges from the exciter coil. When the pickup pulse arrives, a silicon controlled rectifier switches and dumps the stored charge into the ignition coil in one burst. The kill switch simply shorts the exciter feed to ground.',
  spec:()=>[['Type','AC-CDI'],['Inputs','Exciter, pickup, kill switch, earth'],['Output','Ignition coil primary']],rpm:()=>null},cdi);
const icoil=G(); icoil.position.set(70,250,-40);
icoil.add(boxAt(30,26,48,MAT.black));icoil.add(mesh(new THREE.CylinderGeometry(7,7,14,16),MAT.black,0,0,30));
part('icoil',{sys:'ign',name:'Ignition coil',ex:[40,60,0],tag:[0,22,0],
  desc:'A step-up transformer. A few hundred turns on the primary side, many thousands on the secondary. It multiplies the CDI pulse up to 200 times, to the 20,000 volts or more that the plug gap needs.',
  spec:()=>[['Step-up','About 1 : 100 to 1 : 200'],['Output','20-30 kV']],rpm:()=>null},icoil);
const wires=G();
const wireMats=[];
{ const add=(pts,m,r=1.6)=>{const mm=m.clone();wireMats.push(mm);wires.add(tube(pts.map(p=>new THREE.Vector3(...p)),r,mm,80));};
  add([[-104,34,-40],[-125,50,-58],[-142,75,-62]],MAT.wireRed);
  add([[-82,24,64],[-115,70,40],[-142,90,-40]],MAT.wireBlu);
  add([[-142,110,-60],[-60,240,-80],[55,250,-50]],MAT.wireYel);
  add([[70,250,-12],[66,240,10],[52,232,8],[48,224,0]],MAT.cable,3);
}
part('wires',{sys:'ign',name:'Ignition wiring',ex:[-40,40,0],tag:[-120,60,-55],
  desc:'Red carries exciter coil voltage to the CDI, blue carries the pickup pulse, yellow runs from the CDI to the ignition coil, and the thick black high-tension lead feeds the plug cap. Watch them flash each time the plug fires.',
  spec:()=>[['Exciter feed','Red'],['Pickup','Blue'],['Coil primary','Yellow'],['HT lead','Black, 7 mm']],rpm:()=>null},wires);

/* ======================= STARTING: ELECTRIC ======================= */
const stDriven=G(), stDrivenSpin=G(); stDriven.position.x=-60; stDriven.add(stDrivenSpin);
const rollers=G();
{ const gg=gearGeo({z:46,m:1.25,w:8,bore:21});stDrivenSpin.add(mesh(gg,MAT.gold));
  for(let k=0;k<6;k++){const a=k*TAU/6;const r=mesh(cylX(2.6,7,14),MAT.chrome,0,18.4*Math.cos(a),18.4*Math.sin(a));rollers.add(r);
    const sprg=mesh(cylX(1,6,8),MAT.steel,0,18.4*Math.cos(a+.32),18.4*Math.sin(a+.32));rollers.add(sprg);}
  stDriven.add(rollers);
  crankSpin.add(mesh(ringGeo(12,15.6,9),MAT.steel,-60,0,0));
}
part('stclutch',{sys:'start',name:'Starter driven gear and one-way clutch',ex:[-60,-40,0],tag:[0,-32,0],
  desc:'A roller-type one-way clutch. When the starter turns the 46-tooth outer race, six spring-loaded rollers wedge between it and the inner race on the crank and drive the engine. Once the engine fires and the inner race overtakes, the rollers drop back and the starter gear freewheels, so the motor is never over-spun.',
  spec:()=>[['Teeth','46 T, module 1.25'],['Rollers','6, spring-loaded'],['Locks','Starter driving crank only']],rpm:()=>S.starterW},stDriven);
const reduct=G(), reductSpin=G(); at(reduct,RD,0); reduct.add(reductSpin);
{ reductSpin.add(mesh(gearGeo({z:14,m:1.25,w:8,bore:4}),MAT.dark,-60,0,0));
  reductSpin.add(mesh(gearGeo({z:42,m:1.25,w:4.5,bore:4,lighten:{n:5,r:16,rr:4}}),MAT.dark,-53,0,0));
  reductSpin.add(mesh(cylX(4,18),MAT.steel,-57,0,0));
}
part('reduction',{sys:'start',name:'Starter reduction gear',ex:[-60,40,-20],tag:[-56,30,0],
  desc:'A double gear that multiplies starter motor torque. The 42-tooth gear is driven by the 10-tooth motor pinion and the 14-tooth gear drives the starter clutch. Overall the motor turns about 14 times for each crank revolution.',
  spec:()=>[['Teeth','42 T / 14 T, module 1.25'],['Overall starter ratio','13.8 : 1']],rpm:()=>S.starterW*46/14},reduct);
const stMotor=G(), stPin=G(); at(stMotor,SM,0); stMotor.add(stPin);
{ const body=mesh(cylX(19,72,48),MAT.steel,4,0,0);body.userData.cut=true;stMotor.add(body);
  const a1=mesh(cylX(19.5,10,48),MAT.dark,-36,0,0);stMotor.add(a1);const a2=mesh(cylX(19.5,10,48),MAT.dark,44,0,0);stMotor.add(a2);
  const arm=mesh(cylX(13,60,32),MAT.copper,4,0,0);stMotor.add(arm);
  stMotor.add(mesh(new THREE.CylinderGeometry(3,3,12,12),MAT.copper,30,22,0));
  stPin.add(mesh(gearGeo({z:10,m:1.25,w:6,bore:0}),MAT.steel,-53,0,0));stPin.add(mesh(cylX(3.2,20),MAT.steel,-45,0,0));
  for(let k=0;k<8;k++){const a=k*TAU/8;const s=boxAt(56,2,4,MAT.dark,4,13.2*Math.cos(a),13.2*Math.sin(a));s.rotation.x=a;stPin.add(s);}
}
part('starter',{sys:'start',name:'Starter motor',ex:[0,90,-80],tag:[4,26,0],
  desc:'A 12 V brushed DC motor fed from the battery through the starter relay. It only turns while the button is held. The cutaway shows its armature spinning inside the case.',
  spec:()=>[['Pinion','10 T, module 1.25'],['Supply','12 V via starter relay'],['Free speed','About 9,000 rpm']],rpm:()=>S.starterW*46/14*42/10},stMotor);

/* ======================= STARTING: KICK ======================= */
const kick=G(), kickSpin=G(), kickGear=G(), kickGearSpin=G(); at(kick,KQ,0); kick.add(kickSpin); kick.add(kickGear); kickGear.add(kickGearSpin);
const kickLever=G();
{ kickSpin.add(mesh(cylX(7,120),MAT.steel,88,0,0));
  // helical spline: twisted ribs
  for(let k=0;k<6;k++){const pts=[];for(let i=0;i<=12;i++){const x=38+i*2.2;const a=k*TAU/6+i*.06;pts.push(new THREE.Vector3(x,7.4*Math.cos(a),7.4*Math.sin(a)));}kickSpin.add(tube(pts,1.1,MAT.steel,24));}
  kickGearSpin.add(mesh(gearGeo({z:30,m:2,w:8,bore:7.2,lighten:{n:5,r:18,rr:4.5}}),MAT.dark));
  kickGearSpin.add(mesh(ringGeo(7.2,12,14),MAT.dark));
  {const ks=mesh(helixGeo(11,4,1.2,26),MAT.steel);ks.rotation.z=-PI/2;ks.position.x=118;kickSpin.add(ks);}
  // lever
  kickLever.position.x=150;
  kickLever.add(mesh(cylX(11,18),MAT.steel));
  kickLever.add(boxAt(8,140,11,MAT.chrome,4,72,0));
  const peg=G();peg.position.set(14,150,0);peg.add(mesh(cylX(5,24),MAT.steel,10,0,0));peg.add(mesh(cylX(9,46),MAT.rubber,34,0,0));
  for(let i=0;i<6;i++)peg.add(mesh(cylX(9.6,2.5),MAT.rubber,16+i*7,0,0));
  kickLever.add(peg);
  kickSpin.add(kickLever);
}
part('kick',{sys:'start',name:'Kickstarter lever and spindle',ex:[90,-60,40],tag:[150,40,0],
  desc:'Pushing the lever down turns the spindle. A helical spline on the spindle forces the 30-tooth kick gear to slide sideways into mesh before it starts to turn it, then a return spring brings everything back and the gear slides out of mesh again.',
  spec:()=>[['Kick gear','30 T, module 2'],['Lever travel','About 105°'],['Crank turns per kick','About 1.5 revolutions']],rpm:()=>null},kick);
const kickIdle=G(), kickIdleSpin=G(); at(kickIdle,MS,54); kickIdle.add(kickIdleSpin);
kickIdleSpin.add(mesh(gearGeo({z:22,m:2,w:6,bore:8.5}),MAT.dark));
for(let k=0;k<4;k++){const a=k*TAU/4;const l=boxAt(8,5,5,MAT.dark,6,13*Math.cos(a),13*Math.sin(a));l.rotation.x=a;kickIdleSpin.add(l);}
part('kickidle',{sys:'start',name:'Kick idle gear',ex:[60,-30,-20],tag:[0,26,0],
  desc:'A 22-tooth gear that freewheels on the mainshaft and is locked by lugs to the back of the clutch basket. When the kick gear slides into it, the kick drives the clutch basket, the basket drives the primary gear, and the primary gear turns the crank. Because it bypasses the clutch plates, the engine can be kicked in any gear with the clutch pulled.',
  spec:()=>[['Teeth','22 T, module 2'],['Path','Kick gear, basket, crank']],rpm:()=>Math.abs(S.basketW)},kickIdle);

/* ======================= BALANCER ======================= */
const balDrive=mesh(gearGeo({z:28,m:1.75,w:8,bore:11,lighten:{n:6,r:16,rr:3.5}}),MAT.dark,50,0,0); crankSpin.add(balDrive);
const balancer=G(), balSpin=G(); at(balancer,BAL,0); balancer.add(balSpin);
{ balSpin.add(mesh(gearGeo({z:28,m:1.75,w:8,bore:8}),MAT.dark,50,0,0));
  balSpin.add(mesh(cylX(8,44),MAT.steel,58,0,0));
  const s=new THREE.Shape();const n=30;s.moveTo(sp(-PI/2,9).x,sp(-PI/2,9).y);for(let i=0;i<=n;i++){const v=sp(-PI/2+PI*i/n,30);s.lineTo(v.x,v.y);}const e=sp(PI/2,9);s.lineTo(e.x,e.y);s.closePath();
  balSpin.add(mesh(finish(s,12,.8),MAT.steel,68,0,0));
  balancer.add(mesh(ringGeo(8,16,9),MAT.steel,40,0,0));
}
part('balancer',{sys:'bal',name:'Balancer shaft',ex:[0,-20,110],tag:[68,34,0],
  desc:'A single cylinder shakes because the piston stops and reverses twice per revolution. This shaft carries an offset weight and is geared to the crank at 1 : 1 but turning the opposite way, so its weight cancels much of the primary vibration.',
  spec:()=>[['Drive','28 T : 28 T, module 1.75'],['Speed','Crank speed, opposite direction']],rpm:()=>S.rpmShow},balancer);

/* ======================= PRIMARY + CLUTCH ======================= */
const priDrive=mesh(gearGeo({z:18,m:1.75,w:9,bore:10}),MAT.dark,68,0,0); crankSpin.add(priDrive);
const clutch={};
const basket=G(), basketSpin=G(); at(basket,MS,0); basket.add(basketSpin);
{ basketSpin.add(mesh(gearGeo({z:67,m:1.75,w:8,bore:18,lighten:{n:6,r:38,rr:8}}),MAT.dark,68,0,0));
  const back=mesh(ringGeo(18,56.5,3.5,.5),MAT.cast,74,0,0);back.userData.cut=true;basketSpin.add(back);
  for(let k=0;k<8;k++){const a=k*TAU/8;const s=new THREE.Shape();const n=8;const h=15*D2R;for(let i=0;i<=n;i++){const v=sp(a-h+2*h*i/n,57);i?s.lineTo(v.x,v.y):s.moveTo(v.x,v.y);}for(let i=n;i>=0;i--){const v=sp(a-h+2*h*i/n,52.5);s.lineTo(v.x,v.y);}
    const f=mesh(finish(s,32,.4),MAT.cast,91.5,0,0);f.userData.cut=true;basketSpin.add(f);}
  for(let k=0;k<6;k++){const a=k*TAU/6+.3;const rv=mesh(cylX(3,12,10),MAT.steel,72,44*Math.cos(a),44*Math.sin(a));basketSpin.add(rv);
    const dmp=mesh(new THREE.CylinderGeometry(3.2,3.2,9,10),MAT.rubber,69,28*Math.cos(a),28*Math.sin(a));dmp.rotation.x=a;basketSpin.add(dmp);}
}
part('basket',{sys:'clutch',name:'Clutch basket and primary driven gear',ex:[60,0,0],tag:[90,62,0],
  desc:'The 67-tooth primary driven gear is riveted to the basket through rubber dampers. It is always driven by the 18-tooth gear on the crank but freewheels on the mainshaft, so on its own it passes no power to the gearbox. The friction plates ride in its slots.',
  spec:()=>[['Primary reduction','67 T : 18 T = 3.722 : 1'],['Module','1.75'],['Slots','8 fingers']],rpm:()=>Math.abs(S.basketW)},basket);
const hub=G(), hubSpin=G(); at(hub,MS,0); hub.add(hubSpin);
{ hubSpin.add(mesh(ringGeo(30,34,24,.4),MAT.alu,89,0,0));hubSpin.children[0].userData.cut=true;
  hubSpin.add(mesh(ringGeo(9,34,3,.4),MAT.alu,78.5,0,0));
  hubSpin.add(mesh(ringGeo(8.2,14,22,.4),MAT.alu,88,0,0));
  for(let k=0;k<12;k++){const a=k*TAU/12;const r=boxAt(22,2.6,3,MAT.alu,90,35*Math.cos(a),35*Math.sin(a));r.rotation.x=a;hubSpin.add(r);}
  for(let k=0;k<4;k++){const a=k*TAU/4+PI/4;hubSpin.add(mesh(cylX(4.2,24,16),MAT.alu,89,21*Math.cos(a),21*Math.sin(a)));}
}
part('hub',{sys:'clutch',name:'Clutch inner hub',ex:[100,0,0],tag:[100,-20,0],
  desc:'Splined to the gearbox mainshaft, so whatever turns the hub turns the gearbox input. Grooves on its outside drive the steel plates. Four posts take the bolts that hold the clutch springs.',
  spec:()=>[['Drives','Steel plates (12 grooves)'],['Mounted','Splined to mainshaft']],rpm:()=>Math.abs(S.mainW)},hub);
// plates
const FR=[],ST=[];
const PLATE_X=[];{let x=79;for(let i=0;i<9;i++){const fr=i%2===0;const w=fr?3:1.6;PLATE_X.push({x:x+w/2,fr,w});x+=w;}}
const fricGroup=G(), steelGroup=G(); at(fricGroup,MS,0); at(steelGroup,MS,0);
{ const fs=new THREE.Shape();const n=200;for(let i=0;i<=n;i++){const a=i/n*TAU;const k=Math.round(a/(TAU/8)-.5);const ac=(k+.5)*TAU/8;const r=Math.abs(wrapPI(a-ac))<6*D2R?56.3:51.5;const v=sp(a,r);i?fs.lineTo(v.x,v.y):fs.moveTo(v.x,v.y);}fs.holes.push(circlePath(37.5));
  const fg=finish(fs,3,.15);
  const ss=new THREE.Shape();for(let i=0;i<=64;i++){const v=sp(i/64*TAU,50);i?ss.lineTo(v.x,v.y):ss.moveTo(v.x,v.y);}
  const hole=new THREE.Path();for(let i=0;i<=240;i++){const a=-i/240*TAU;const k=Math.round(a/(TAU/12));const r=Math.abs(wrapPI(a-k*TAU/12+TAU/24))<5*D2R?34.2:37.2;const v=sp(a,r);i?hole.lineTo(v.x,v.y):hole.moveTo(v.x,v.y);}ss.holes.push(hole);
  const sg=finish(ss,1.6,.1);
  for(const p of PLATE_X){if(p.fr){const m=mesh(fg,MAT.friction,p.x,0,0);m.userData.cut=true;fricGroup.add(m);FR.push(m);}else{const m=mesh(sg,MAT.steel,p.x,0,0);m.userData.cut=true;steelGroup.add(m);ST.push(m);}}
}
part('friction',{sys:'clutch',name:'Friction plates (5)',ex:[120,0,0],tag:[86,58,30],
  desc:'Aluminium plates faced with friction material, with tabs on the outside that slide in the basket slots. They always turn with the basket, so with the engine running they spin at engine speed divided by 3.72.',
  spec:()=>[['Count','5'],['Thickness','3.0 mm new, service limit 2.6 mm'],['Driven by','Clutch basket']],rpm:()=>Math.abs(S.basketW)},fricGroup);
part('steel',{sys:'clutch',name:'Steel plates (4)',ex:[140,0,0],tag:[86,-48,-20],
  desc:'Plain steel plates with teeth on the inside that slide on the inner hub grooves. They always turn with the hub and the mainshaft. Squeeze them against the friction plates and the two sets lock together; release the pressure and they slip freely.',
  spec:()=>[['Count','4'],['Thickness','1.6 mm'],['Warp limit','0.2 mm']],rpm:()=>Math.abs(S.mainW)},steelGroup);
const pplate=G(), pplateSpin=G(); at(pplate,MS,0); pplate.add(pplateSpin);
const springsG=G(), springsSpin=G(); at(springsG,MS,0); springsG.add(springsSpin);
const CSPR=[];
{ const pp=mesh(ringGeo(12,49,4,.5),MAT.alu,102.5,0,0);pp.userData.cut=true;pplateSpin.add(pp);
  for(let k=0;k<4;k++){const a=k*TAU/4+PI/4;const cup=mesh(ringGeo(5,8,8,.4),MAT.alu,108,21*Math.cos(a),21*Math.sin(a));cup.userData.cut=true;pplateSpin.add(cup);}
  for(let k=0;k<6;k++){const a=k*TAU/6;const r=boxAt(3,24,2.5,MAT.alu,106,26*Math.cos(a),26*Math.sin(a));r.rotation.x=a;r.userData.cut=true;pplateSpin.add(r);}
  pplateSpin.add(mesh(ringGeo(4,12.5,5,.3),MAT.steel,106,0,0));for(let k=0;k<3;k++){const a=k*TAU/3;const b=boxAt(5,2.4,7,MAT.alu,106,15*Math.cos(a),15*Math.sin(a));b.rotation.x=a;b.userData.cut=true;pplateSpin.add(b);}
  for(let k=0;k<4;k++){const a=k*TAU/4+PI/4;const y=21*Math.cos(a),z=21*Math.sin(a);
    const s=mesh(helixGeo(5.6,5,1.1,1),MAT.chrome);s.rotation.z=-PI/2;s.position.set(105,y,z);springsSpin.add(s);CSPR.push(s);
    const bolt=mesh(cylX(3,20,12),MAT.steel,108,y,z);springsSpin.add(bolt);
    const hd=hexNut(5.2,3.5);hd.position.set(119,y,z);springsSpin.add(hd);
    springsSpin.add(mesh(cylX(7,1.2,20),MAT.steel,117,y,z));}
}
part('pplate',{sys:'clutch',name:'Pressure plate',ex:[170,0,0],tag:[104,40,-30],
  desc:'Clamps the plate stack against the hub. The four springs push it inwards. Pulling the lever pushes it outwards via the push rod, which unloads the stack and disconnects the engine from the gearbox.',
  spec:()=>[['Lift','About 2 mm (drawn larger)'],['Release bearing','Centre ball bearing']],rpm:()=>Math.abs(S.mainW)},pplate);
part('csprings',{sys:'clutch',name:'Clutch springs and bolts',ex:[200,0,0],tag:[118,30,0],
  desc:'Four coil springs held by bolts screwed into the inner hub posts. Their preload is what makes the plates grip. Weak or sagged springs are the most common cause of clutch slip on a hard-worked commuter bike.',
  spec:()=>[['Count','4'],['Free length','35 mm, service limit 33.5 mm']],rpm:()=>Math.abs(S.mainW)},springsG);
// push rod + lifter
const pushrod=G(); at(pushrod,MS,0);
pushrod.add(mesh(cylX(2.4,182,12),MAT.chrome,13,0,0));
part('pushrod',{sys:'clutch',name:'Clutch push rod',ex:[0,-20,0],tag:[-74,10,0],
  desc:'Runs through a hole bored down the centre of the mainshaft. The lifter arm on the left pushes one end and the other end lifts the pressure plate on the right.',
  spec:()=>[['Diameter','4.8 mm'],['Length','184 mm']],rpm:()=>null},pushrod);
const lifter=G(), lifterSpin=G(); lifter.position.set(-82,MS.y,MS.z); lifter.add(lifterSpin);
{ lifterSpin.add(mesh(new THREE.CylinderGeometry(5,5,70,20),MAT.steel,0,26,0));
  lifterSpin.add(boxAt(3,10,8,MAT.steel,4,0,0));
  const arm=boxAt(8,4,42,MAT.steel,0,60,18);lifterSpin.add(arm);
  lifterSpin.add(mesh(new THREE.CylinderGeometry(3.5,3.5,6,12),MAT.chrome,0,62,36));
  lifter.add(tube([[0,64,38],[0,70,70],[10,96,120],[30,130,160]].map(p=>new THREE.Vector3(...p)),3,MAT.cable,40));
  lifter.add(mesh(new THREE.CylinderGeometry(4.5,4.5,22,16).rotateX(PI/2),MAT.rubber,0,68,58));
}
part('lifter',{sys:'clutch',name:'Clutch actuator arm and cable',ex:[-40,30,0],tag:[0,70,20],
  desc:'The clutch cable from the handlebar lever pulls this arm and rotates its spindle. A flat cut into the spindle bears on the end of the push rod and shoves it towards the clutch.',
  spec:()=>[['Free play at lever','10 to 20 mm'],['Operation','Cable, left hand']],rpm:()=>null},lifter);

/* ======================= GEARBOX ======================= */
const SH={};
const mainshaft=G(), mainSpin=G(); at(mainshaft,MS,0); mainshaft.add(mainSpin);
{ const sm=mesh(cylX(8,172,32),MAT.steel,16,0,0);sm.userData.shaft=true;mainSpin.add(sm);
  mainSpin.add(splines(8,-46,-26,8,MAT.steel,1));mainSpin.add(splines(8,-8,8,8,MAT.steel,1));mainSpin.add(splines(8,78,100,8,MAT.steel,1));
  // M1 integral gear (fixed)
  const m1=mesh(gearGeo({z:13,m:2,w:10,bore:0}),MAT.dark,COL.c1,0,0);m1.userData.role='fix';mainSpin.add(m1);
  const nut=hexNut(10,4);nut.position.x=101;mainSpin.add(nut);
  for(const x of [-50,46]){const b=bearing(8.2,20,10);b.position.x=x;mainshaft.add(b);}
}
part('mainshaft',{sys:'box',name:'Mainshaft with 1st gear',ex:[0,-60,-30],tag:[-60,14,0],role:'shaft',
  desc:'The gearbox input shaft. The clutch hub is splined to its right-hand end, so it only turns when the clutch is engaged. Its 13-tooth first gear is machined as part of the shaft. The shaft is hollow for the clutch push rod.',
  spec:()=>[['1st gear (M1)','13 T, fixed'],['Bearings','2 ball bearings'],['Centre distance','49 mm to countershaft']],rpm:()=>Math.abs(S.mainW)},mainshaft);
const countershaft=G(), counterSpin=G(); at(countershaft,CS,0); countershaft.add(counterSpin);
{ const sm=mesh(cylX(9.5,148,32),MAT.steel,-24,0,0);counterSpin.add(sm);
  counterSpin.add(splines(9.5,10,26,10,MAT.steel,1));counterSpin.add(splines(9.5,-28,-8,10,MAT.steel,1));counterSpin.add(splines(9.5,-90,-68,10,MAT.steel,1));
  for(const x of [-52,46]){const b=bearing(9.7,22,10);b.position.x=x;countershaft.add(b);}
}
part('countershaft',{sys:'box',name:'Countershaft (output shaft)',ex:[0,-80,-110],tag:[-30,-18,0],role:'shaft',
  desc:'The gearbox output shaft. The front sprocket sits on its left-hand end outside the crankcase, so it turns whenever the rear wheel turns. Its gears are either splined to it or freewheel on it.',
  spec:()=>[['Gears','C1 to C5'],['Output','14 T front sprocket']],rpm:()=>Math.abs(S.counterW)},countershaft);
// gear pairs
const GEARS={};
const WIN_M={n:4,r0:10.5,r1:15.5,span:52*D2R}, WIN_C={n:4,r0:12,r1:17.5,span:52*D2R};
function dogs(group,face,r0,r1,dir){for(let k=0;k<4;k++){const a=k*TAU/4;const len=4.5;const b=boxAt(len,r1-r0,22*D2R*((r0+r1)/2),MAT.dark,face+dir*len/2,((r0+r1)/2)*Math.cos(a),((r0+r1)/2)*Math.sin(a));b.rotation.x=a;group.add(b);}}
function slider(z,bore,win,sides){const g=G();const rp=z,rf=rp-2.5;const h=4.5;
  g.add(mesh(gearGeo({z,m:2,w:h,bore}),MAT.dark,-3.75,0,0));g.add(mesh(gearGeo({z,m:2,w:h,bore}),MAT.dark,3.75,0,0));
  g.add(mesh(ringGeo(bore,rf-1.2,3.2,.2),MAT.dark,0,0,0));
  for(const s of sides)dogs(g,s*6,win.r0+.7,win.r1-.7,s);return g;}
function freeGear(z,bore,win){const g=G();g.add(mesh(gearGeo({z,m:2,w:10,bore,windows:win}),MAT.dark));const bu=mesh(ringGeo(bore-1.2,bore+.2,10.6,.2),MAT.bronze);bu.userData.noRole=true;g.add(bu);return g;}
function gearPart(id,shaftP,x,obj,meta){const g=G();at(g,shaftP,x);const sp_=G();g.add(sp_);sp_.add(obj);GEARS[id]={g,spin:sp_,x0:x};part(id,meta,g);return GEARS[id];}
const GDATA={
  M1:{z:13},M2:{z:17},M3:{z:20},M4:{z:23},M5:{z:25},C1:{z:36},C2:{z:32},C3:{z:29},C4:{z:26},C5:{z:24}};
gearPart('M2',MS,COL.c2,(()=>{const g=G();g.add(mesh(gearGeo({z:17,m:2,w:10,bore:8}),MAT.dark));return g;})(),{sys:'box',name:'M2, mainshaft 2nd gear',ex:[0,-60,-30],role:'spl',tag:[0,22,0],
  desc:'17 teeth, splined to the mainshaft and held in place by a circlip. It always drives C2 on the countershaft. In 2nd gear the C4 slider locks C2 to the countershaft.',spec:()=>[['Teeth','17 T, module 2'],['Pair','M2 17 : C2 32 = 1.882'],['Type','Splined, fixed position']],rpm:()=>Math.abs(S.mainW)});
gearPart('M3',MS,COL.c3,slider(20,8,WIN_M,[-1,1]),{sys:'box',name:'M3, mainshaft 3rd gear (slider)',ex:[0,-60,-30],role:'spl',tag:[0,24,0],
  desc:'20 teeth, splined to the mainshaft so it can slide sideways while always turning with the shaft. Dog teeth on both faces lock it to M4 (4th gear) or M5 (5th gear). As a plain gear it drives C3 in 3rd.',spec:()=>[['Teeth','20 T, module 2'],['Pair','M3 20 : C3 29 = 1.450'],['Dogs','4 per face'],['Fork','Mainshaft fork']],rpm:()=>Math.abs(S.mainW)});
gearPart('M4',MS,COL.c4,freeGear(23,8.6,WIN_M),{sys:'box',name:'M4, mainshaft 4th gear',ex:[0,-60,-30],role:'free',tag:[0,27,0],
  desc:'23 teeth, freewheeling on a bush on the mainshaft. It is always turned by C4. In 4th gear the M3 slider moves left, its dogs enter these windows, and M4 becomes locked to the mainshaft.',spec:()=>[['Teeth','23 T, module 2'],['Pair','M4 23 : C4 26 = 1.130'],['Type','Freewheeling, dog windows']],rpm:()=>Math.abs(S.wM4)});
gearPart('M5',MS,COL.c5,freeGear(25,8.6,WIN_M),{sys:'box',name:'M5, mainshaft 5th gear',ex:[0,-60,-30],role:'free',tag:[0,29,0],
  desc:'25 teeth, freewheeling on the mainshaft and always turned by C5. In 5th gear the M3 slider moves right and locks it. This pair is an overdrive: the countershaft turns faster than the mainshaft.',spec:()=>[['Teeth','25 T, module 2'],['Pair','M5 25 : C5 24 = 0.960'],['Type','Freewheeling, dog windows']],rpm:()=>Math.abs(S.wM5)});
gearPart('C1',CS,COL.c1,freeGear(36,10.2,WIN_C),{sys:'box',name:'C1, countershaft 1st gear',ex:[0,-80,-110],role:'free',tag:[0,40,0],
  desc:'The biggest gear in the box, 36 teeth, freewheeling on the countershaft and always driven by the 13-tooth M1. In 1st gear the C5 slider moves right and its dogs lock C1 to the countershaft.',spec:()=>[['Teeth','36 T, module 2'],['Pair','M1 13 : C1 36 = 2.769'],['Type','Freewheeling, dog windows']],rpm:()=>Math.abs(S.wC1)});
gearPart('C5',CS,COL.c5,slider(24,9.6,WIN_C,[1]),{sys:'box',name:'C5, countershaft 5th gear (slider)',ex:[0,-80,-110],role:'spl',tag:[0,28,0],
  desc:'24 teeth, splined to the countershaft. It is the slider for 1st gear: its dogs face C1. As a plain gear it is driven by M5 when 5th is selected.',spec:()=>[['Teeth','24 T, module 2'],['Selects','1st (locks C1)'],['Fork','Countershaft fork, left']],rpm:()=>Math.abs(S.counterW)});
gearPart('C3',CS,COL.c3,freeGear(29,10.2,WIN_C),{sys:'box',name:'C3, countershaft 3rd gear',ex:[0,-80,-110],role:'free',tag:[0,33,0],
  desc:'29 teeth, freewheeling on the countershaft and always driven by M3. In 3rd gear the C4 slider moves right and locks it.',spec:()=>[['Teeth','29 T, module 2'],['Pair','M3 20 : C3 29 = 1.450'],['Type','Freewheeling, dog windows']],rpm:()=>Math.abs(S.wC3)});
gearPart('C4',CS,COL.c4,slider(26,9.6,WIN_C,[-1,1]),{sys:'box',name:'C4, countershaft 4th gear (slider)',ex:[0,-80,-110],role:'spl',tag:[0,30,0],
  desc:'26 teeth, splined to the countershaft with dogs on both faces. Sliding left it locks C2 for 2nd gear, sliding right it locks C3 for 3rd. As a plain gear it is driven by M4 in 4th.',spec:()=>[['Teeth','26 T, module 2'],['Selects','2nd (C2) and 3rd (C3)'],['Fork','Countershaft fork, right']],rpm:()=>Math.abs(S.counterW)});
gearPart('C2',CS,COL.c2,freeGear(32,10.2,WIN_C),{sys:'box',name:'C2, countershaft 2nd gear',ex:[0,-80,-110],role:'free',tag:[0,36,0],
  desc:'32 teeth, freewheeling on the countershaft and always driven by M2. In 2nd gear the C4 slider moves left and locks it.',spec:()=>[['Teeth','32 T, module 2'],['Pair','M2 17 : C2 32 = 1.882'],['Type','Freewheeling, dog windows']],rpm:()=>Math.abs(S.wC2)});

/* ======================= SHIFT DRUM, FORKS, STAR, SPINDLE ======================= */
// fork offsets vs drum angle (deg)
function kf(keys,t){if(t<=keys[0][0])return keys[0][1];for(let i=1;i<keys.length;i++){if(t<=keys[i][0]){const [t0,v0]=keys[i-1],[t1,v1]=keys[i];return v0+(v1-v0)*smooth((t-t0)/(t1-t0));}}return keys[keys.length-1][1];}
const TRAVEL=5;
const FORKS={
  C5:{keys:[[-30,TRAVEL],[2,TRAVEL],[28,0],[300,0]],shaft:CS,fs:FC,col:COL.c5,rg:24-2.5-1.2},
  C4:{keys:[[-30,0],[32,0],[58,-TRAVEL],[64,-TRAVEL],[90,0],[116,TRAVEL],[300,TRAVEL],],shaft:CS,fs:FC,col:COL.c4,rg:26-2.5-1.2},
  M3:{keys:[[-30,0],[150,0],[176,-TRAVEL],[184,-TRAVEL],[210,0],[236,TRAVEL],[300,TRAVEL]],shaft:MS,fs:FM,col:COL.c3,rg:20-2.5-1.2},
};
// C4 must return to centre after 3rd: correct keys
FORKS.C4.keys=[[-30,0],[32,0],[58,-TRAVEL],[64,-TRAVEL],[90,0],[116,TRAVEL],[124,TRAVEL],[150,0],[300,0]];
const DRUM_R=16;
const drum=G(), drumSpin=G(); at(drum,DR,0); drum.add(drumSpin);
{ const body=mesh(cylX(DRUM_R,118,48),MAT.black,-4,0,0);drumSpin.add(body);
  drumSpin.add(mesh(cylX(8,20,24),MAT.black,-70,0,0));
  for(const [id,f] of Object.entries(FORKS)){
    const ap=Math.atan2(f.fs.z-DR.z,f.fs.y-DR.y);f.alpha=ap;
    const pts=[];for(let t=-25;t<=265;t+=2.5){const a=ap-t*D2R;pts.push(new THREE.Vector3(f.col+kf(f.keys,t),(DRUM_R-.5)*Math.cos(a),(DRUM_R-.5)*Math.sin(a)));}
    drumSpin.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),180,2.6,10,false),MAT.groove));
  }
  // neutral switch contact on drum end
  const nc=mesh(cylX(1.8,4,10),MAT.bronze,-81,6*Math.cos(0),6*Math.sin(0));drumSpin.add(nc);
}
part('drum',{sys:'shift',name:'Shift drum',ex:[0,-150,-40],tag:[-30,-24,0],
  desc:'A drum with three channels cut around it. A pin on each shift fork rides in one channel, so as the drum turns the channels push the forks sideways. The channel shapes decide which dog clutch moves at each drum position and make sure each one returns to neutral before the next engages.',
  spec:()=>[['Positions','1, N, 2, 3, 4, 5'],['Step','60° per gear, 30° from 1st to neutral'],['Channels','3']],rpm:()=>null},drum);
// star (detent cam) on drum right end
const STAR_X=60, GAMMA=-PI/2;   // roller sits behind the drum, clear of the ratchet arm
function starR(a){const ar=wrapPI(a-(GAMMA-30*D2R));// local angle relative to neutral ridge
  const l=wrapPI(a-GAMMA);const u=(Math.cos(6*l)*-1+1)/2;let r=12.5+6.5*Math.pow(u,1.4);
  if(Math.abs(ar)<14*D2R)r=Math.min(r,16.2);return r;}
{ const st=polarShape(starR,360);const sm=mesh(finish(st,7,.6),MAT.black,STAR_X,0,0);drumSpin.add(sm);
  for(let k=0;k<6;k++){const a=GAMMA+k*TAU/6+PI;drumSpin.add(mesh(cylX(1.9,6,12),MAT.gold,STAR_X+6,8.5*Math.cos(a),8.5*Math.sin(a)));}
}
// stopper arm with roller
const stopper=G(); stopper.position.set(STAR_X,DR.y,DR.z);
const STOP={pivot:P2(-30,-22),L:0};
{ const rest=P2(0,-(starR(GAMMA)+4.5));STOP.L=dst(STOP.pivot,rest);
  STOP.arm=G();STOP.arm.position.set(0,STOP.pivot.y,STOP.pivot.z);stopper.add(STOP.arm);
  STOP.arm.add(mesh(cylX(5,8),MAT.gold));
  STOP.armBar=boxAt(4,5,STOP.L,MAT.gold,0,0,-STOP.L/2);STOP.arm.add(STOP.armBar);
  STOP.roller=mesh(cylX(4.5,7,20),MAT.chrome,0,0,-STOP.L);STOP.arm.add(STOP.roller);
  STOP.spring=mesh(helixGeo(3.4,11,.75,1),MAT.steel);stopper.add(STOP.spring);
  STOP.anchor=new THREE.Vector3(0,-40,-12);
}
part('stopper',{sys:'shift',name:'Star cam and stopper arm',ex:[60,-150,-40],tag:[0,-30,-20],
  desc:'The star plate on the end of the drum has a valley for every gear. A spring-loaded roller on the stopper arm drops into the valleys and holds the drum exactly in place. A roller cannot rest on a ridge, so the drum can never stop between gears. The one exception is the ridge between 1st and 2nd, which is ground flat so the roller can rest there: that flat is neutral, which is why it sits half a click between 1st and 2nd.',
  spec:()=>[['Valleys','5 gears plus one spare'],['Neutral','Ground-flat ridge between 1st and 2nd'],['Pins','6, for the ratchet pawl']],rpm:()=>null},stopper);
// forks
const FORKG={};
for(const [id,f] of Object.entries(FORKS)){
  const g=G();g.position.set(f.col,0,0);
  const S_=f.shaft, F_=f.fs;const dir=Math.atan2(F_.z-S_.z,F_.y-S_.y);
  // sector plate in groove (local origin at shaft axis)
  const sec=new THREE.Shape();const span=46*D2R,r0=f.rg-.6,r1=f.rg+7.5;const n=16;
  for(let i=0;i<=n;i++){const v=sp(dir-span+2*span*i/n,r0);i?sec.lineTo(v.x,v.y):sec.moveTo(v.x,v.y);}for(let i=n;i>=0;i--){const v=sp(dir-span+2*span*i/n,r1);sec.lineTo(v.x,v.y);}
  const plate=mesh(finish(sec,2.6,.3),MAT.steel,0,S_.y,S_.z);g.add(plate);
  const mid=addP(S_,P2(Math.cos(dir),Math.sin(dir)),r1-1);
  g.add(rod(new THREE.Vector3(0,mid.y,mid.z),new THREE.Vector3(0,F_.y,F_.z),3.4,MAT.steel));
  g.add(mesh(cylX(7,16,24),MAT.steel,0,F_.y,F_.z));
  const pd=unit(DR.y-F_.y,DR.z-F_.z);const tip=addP(DR,P2(-pd.y,-pd.z),DRUM_R-2.2);
  g.add(rod(new THREE.Vector3(0,F_.y,F_.z),new THREE.Vector3(0,tip.y,tip.z),2.3,MAT.chrome));
  FORKG[id]=g;
  part('fork'+id,{sys:'shift',name:(id==='M3'?'Mainshaft fork':(id==='C5'?'Countershaft fork, 1st':'Countershaft fork, 2nd/3rd')),ex:[0,id==='M3'?-95:-115,id==='M3'?-30:-80],tag:[0,F_.y,F_.z],
    desc:id==='M3'?'Sits in the groove of the M3 slider on the mainshaft. Its pin rides in the drum\'s right-hand channel and moves M3 left for 4th and right for 5th.':id==='C5'?'Sits in the groove of the C5 slider. Its channel moves it only once, to push C5 against C1 for 1st gear.':'Sits in the groove of the C4 slider. Its channel moves it left for 2nd gear and right for 3rd, returning through the middle in between.',
    spec:()=>[['Travel','±5 mm (drawn)'],['Rides on','Fork shaft'],['Wear check','Claw thickness and pin']],rpm:()=>null},g);
}
const forkShafts=G();
forkShafts.add(mesh(cylX(5,140,20),MAT.chrome,0,FM.y,FM.z));forkShafts.add(mesh(cylX(5,140,20),MAT.chrome,-6,FC.y,FC.z));
part('forkshafts',{sys:'shift',name:'Fork shafts',ex:[0,-105,-55],tag:[-62,FM.y,FM.z],
  desc:'Plain ground shafts fixed in the crankcase. The forks slide along them, steered only by their pins in the drum channels.',spec:()=>[['Count','2']],rpm:()=>null},forkShafts);
// gearshift spindle + ratchet arm + pedal
const gsp=G(), gspSpin=G(); at(gsp,GS,0); gsp.add(gspSpin);
const RATCH=G();
{ gspSpin.add(mesh(cylX(6,205,24),MAT.steel,-34,0,0));
  gspSpin.add(splines(6,-140,-128,12,MAT.steel,.8));
  {const gs=mesh(helixGeo(9,3.2,1.2,1),MAT.steel);gs.rotation.z=-PI/2;gs.position.set(50,0,0);gs.scale.set(1,14,1);gsp.add(gs);}
  // ratchet arm: from spindle up to star pins
  const tgt=P2(DR.y-GS.y,DR.z-GS.z);const L=Math.hypot(tgt.y,tgt.z);const ang=Math.atan2(tgt.z,tgt.y);
  RATCH.rotation.x=ang;RATCH.position.x=72;gspSpin.add(RATCH);
  const s=new THREE.Shape();const e=L-8.5;
  s.moveTo(-4,0);s.lineTo(4,0);s.lineTo(4,e-16);s.lineTo(13,e-6);s.lineTo(12,e+1);s.lineTo(8.5,e-4);s.lineTo(2,e-12);s.lineTo(-2,e-12);s.lineTo(-8.5,e-4);s.lineTo(-12,e+1);s.lineTo(-13,e-6);s.lineTo(-4,e-16);s.closePath();
  // shape coords (xs,ys) -> world (z=-xs, y=ys) after finish(); arm extends along local +y
  RATCH.add(mesh(finish(s,3,.4),MAT.gold));
  RATCH.add(mesh(ringGeo(6.2,11,4),MAT.gold));
  // pedal on left
  const ped=G();ped.position.x=-142;
  ped.add(mesh(cylX(9,12),MAT.steel));ped.add(boxAt(8,10,80,MAT.chrome,0,-4,40));
  const peg=G();peg.position.set(-6,-6,78);peg.add(mesh(cylX(4,16),MAT.steel,-6,0,0));peg.add(mesh(cylX(8,34),MAT.rubber,-28,0,0));ped.add(peg);
  gspSpin.add(ped);
}
part('shiftspindle',{sys:'shift',name:'Gearshift spindle, pedal and ratchet',ex:[0,-170,0],tag:[-142,-10,40],
  desc:'The gear pedal turns this spindle a few degrees. Its ratchet arm on the right catches a pin on the star plate and rotates the drum one step, then a centring spring returns the spindle and pedal for the next shift. The pedal always comes back to the same place, which is why this is called a return shift.',
  spec:()=>[['Pattern','1 down, 4 up (1-N-2-3-4-5)'],['Drum step','60° per click']],rpm:()=>null},gsp);
const nsw=G(); nsw.position.set(-87,DR.y,DR.z);
nsw.add(mesh(cylX(9,10,6),MAT.steel));nsw.add(mesh(cylX(5,10,20),MAT.plastic,-9,0,0));
const nswLamp=mesh(new THREE.SphereGeometry(3.5,16,12),new THREE.MeshStandardMaterial({color:0x2f8a4a,emissive:0x39d36b,emissiveIntensity:0}),-16,0,0);nsw.add(nswLamp);
part('nswitch',{sys:'shift',name:'Neutral switch',ex:[-60,-150,-40],tag:[0,14,0],
  desc:'A contact screwed into the crankcase opposite the end of the drum. In neutral a pin on the drum touches it and earths the green neutral lamp on the dashboard. The lamp here lights when the drum reaches neutral.',
  spec:()=>[['Wire','Light green / red'],['Closes in','Neutral only']],rpm:()=>null},nsw);

/* ======================= FINAL DRIVE ======================= */
const FS={z:14,p:15.875}; FS.r=SPR(14,15.875);
const sprocket=G(), sprSpin=G(); at(sprocket,CS,-78); sprocket.add(sprSpin);
sprSpin.add(mesh(gearGeo({z:14,rp:FS.r,ra:FS.r+4.6,rf:FS.r-5.2,w:8,prof:'spr',bore:9.5}),MAT.gold));
sprSpin.add(mesh(ringGeo(9.5,16,10),MAT.gold));
{const pl=mesh(ringGeo(10,22,2),MAT.steel,-6,0,0);sprSpin.add(pl);for(let k=0;k<2;k++){const b=hexNut(3,3);const a=k*PI;b.position.set(-8,16*Math.cos(a),16*Math.sin(a));sprSpin.add(b);}}
part('sprocket',{sys:'final',name:'Front sprocket',ex:[-60,-80,-110],tag:[0,46,0],
  desc:'14 teeth, on the left end of the countershaft outside the crankcase. It drives the rear sprocket through a 428 chain. Changing it by one tooth changes overall gearing by about 7 percent.',
  spec:()=>[['Teeth','14 T'],['Chain','428 (12.7 mm pitch shown as 15.9 mm 520 equivalent)'],['Rear sprocket','43 T, ratio 3.071']],rpm:()=>Math.abs(S.counterW)},sprocket);
const driveChainPath=(()=>{const c=CS,r=FS.r;const back=330;
  const seg=[];const lineSeg=(a,b)=>seg.push({t:'l',a,c:b,len:dst(a,b)});const arcSeg=(cen,r,a0,a1)=>seg.push({t:'a',cen,r,a0,a1,len:Math.abs(a1-a0)*r});
  lineSeg(P2(c.y+r,c.z-back),P2(c.y+r,c.z));arcSeg(c,r,0,PI);lineSeg(P2(c.y-r,c.z),P2(c.y-r,c.z-back));
  let L=0;for(const s of seg){s.s0=L;L+=s.len;}
  const at=s=>{s=mod(s,L);for(const g of seg){if(s<=g.s0+g.len+1e-6){const u=(s-g.s0)/g.len;if(g.t==='l')return {p:P2(g.a.y+(g.c.y-g.a.y)*u,g.a.z+(g.c.z-g.a.z)*u)};const a=g.a0+(g.a1-g.a0)*u;return {p:P2(g.cen.y+g.r*Math.cos(a),g.cen.z+g.r*Math.sin(a))};}}return {p:P2(0,0)};};
  return {L,at};})();
const driveChain=makeChain(Math.round(driveChainPath.L/FS.p),FS.p,19,11,7.8,4.4,MAT.dark);
const driveChainG=G();driveChainG.add(driveChain);
part('chain',{sys:'final',name:'Drive chain',ex:[-60,-80,-110],tag:[-78,CS.y+FS.r,CS.z-220],
  desc:'Carries power from the front sprocket to the rear wheel. The top run is the tight side, pulled forward by the front sprocket. Only a short length is drawn here.',
  spec:()=>[['Pitch','15.875 mm'],['Adjust','20 to 30 mm slack, checked mid-run']],rpm:()=>null},driveChainG);

/* ======================= drive phases ======================= */
function phase(pa,za,pb,zb){const d=Math.atan2(pb.z-pa.z,pb.y-pa.y);const pA=TAU/za,pB=TAU/zb;return pB*d/pA+d+PI-pB/2;}
const PH={
  basket:phase(CR,18,MS,67), bal:phase(CR,28,BAL,28), kick:phase(MS,22,KQ,30),
  C1:phase(MS,13,CS,36), C2:phase(MS,17,CS,32), C3:phase(MS,20,CS,29), M4:phase(CS,26,MS,23), M5:phase(CS,24,MS,25),
  red:phase(CR,46,RD,14), pin:phase(RD,42,SM,10)};

/* ======================= state & simulation ======================= */
const POS=[{n:'1',a:0},{n:'N',a:30},{n:'2',a:60},{n:'3',a:120},{n:'4',a:180},{n:'5',a:240}];
const S={engine:'off',rpm:0,rpmShow:0,throttle:0,clutch:0,clutchHeld:false,clutchLatch:false,
  pos:1,drum:30,shiftAnim:null,queue:[],crankA:0,basketA:0,mainA:0,mainW:0,counterA:0,counterW:0,basketW:0,
  kickSpin:0,kickSlide:0,kick:null,estart:null,starterA:0,starterW:0,starterLocked:false,
  ts:0.05,explode:0,camS:0,chainS:0,spark:0,sparkPrevCycle:0,wM4:0,wM5:0,wC1:0,wC2:0,wC3:0,lockState:null,msg:'',fireT:0};
const prev={};
function lockInfo(){const o={C5:kf(FORKS.C5.keys,S.drum),C4:kf(FORKS.C4.keys,S.drum),M3:kf(FORKS.M3.keys,S.drum)};
  let lock=null;if(o.C5>3.4)lock={free:'C1',m:'M1',c:'C5',slider:'C5',R:36/13,n:'1',txt:'M1 drives C1, and the dogs on C5 lock C1 to the countershaft'};else if(o.C4<-3.4)lock={free:'C2',m:'M2',c:'C4',slider:'C4',R:32/17,n:'2',txt:'M2 drives C2, and the dogs on C4 lock C2 to the countershaft'};else if(o.C4>3.4)lock={free:'C3',m:'M3',c:'C4',slider:'C4',R:29/20,n:'3',txt:'M3 drives C3, and the dogs on C4 lock C3 to the countershaft'};else if(o.M3<-3.4)lock={free:'M4',m:'M3',c:'C4',slider:'M3',R:26/23,n:'4',txt:'the dogs on M3 lock M4 to the mainshaft, and M4 drives C4, which is splined to the countershaft'};else if(o.M3>3.4)lock={free:'M5',m:'M3',c:'C5',slider:'M3',R:24/25,n:'5',txt:'the dogs on M3 lock M5 to the mainshaft, and M5 drives C5, which is splined to the countershaft'};
  return {o,lock};}

function step(dtR){
  dtR=Math.min(dtR,.05);
  // clutch lever
  const want=(S.clutchHeld||S.clutchLatch)?1:0;S.clutch+=clamp(want-S.clutch,-dtR*4,dtR*4);
  // engine speed
  let crankVisRate=null; // rad per real second override while cranking
  if(S.kick){S.kick.t+=dtR;const t=S.kick.t;let spin,slide;
    if(t<.14){slide=t/.14;spin=8*D2R*(t/.14);}else if(t<.62){slide=1;const u=(t-.14)/.48;spin=(8+97*u*u)*D2R;}else if(t<1.2){const u=(t-.62)/.58;slide=clamp(1-u*3,0,1);spin=105*D2R*(1-ease(u));}else{spin=0;slide=0;S.kick=null;if(S.engine==='off'){S.engine='running';S.rpm=1500;S.fireT=.6;}}
    const d=spin-S.kickSpin;S.kickSpin=spin;S.kickSlide=slide;
    if(slide>.6&&d>0){S.crankA+=d*(30/22)*(67/18);S.rpmShow=d/dtR*(30/22)*(67/18)/TAU*60;}else S.rpmShow=0;}
  if(S.estart){S.estart.t+=dtR;const t=S.estart.t;S.starterLocked=true;crankVisRate=TAU*Math.min(1,t*3)*1.1;S.rpm=0;
    if(t>1.7){S.estart=null;S.starterLocked=false;S.engine='running';S.rpm=1500;S.fireT=.6;S.starterW=320;}}
  if(S.engine==='running'){const target=1400+S.throttle*(8500-1400);S.rpm+=(target-S.rpm)*Math.min(1,dtR*2.4);}
  else if(S.engine==='stopping'){S.rpm=Math.max(0,S.rpm-dtR*Math.max(900,S.rpm*1.2));if(S.rpm<=0){S.engine='off';S.rpm=0;}}
  const dt=dtR*S.ts;
  let dCrank;
  if(crankVisRate!==null){dCrank=crankVisRate*dtR;S.rpmShow=320;}
  else if(S.kick){dCrank=0;}
  else {dCrank=S.rpm/60*TAU*dt;S.rpmShow=S.rpm;}
  S.crankA+=dCrank;
  const prevBasket=S.basketA;S.basketA=-S.crankA*18/67+PH.basket;const dB=S.basketA-prevBasket;
  const dtv=Math.max(dt,1e-6);
  S.basketW=(S.kick||S.estart)?-S.rpmShow*18/67:-S.rpm*18/67;
  // mainshaft
  const e=1-S.clutch;const {o,lock}=lockInfo();S.lockState=lock;
  let dM;
  if(e>.96){dM=dB;S.mainW=S.basketW;}
  else{const k=(lock?3:7)*e, drag=lock?.22:1.1;S.mainW+=(k*(S.basketW-S.mainW)-drag*S.mainW)*dtR;dM=S.mainW/60*TAU*dt;}
  S.mainA+=dM;
  let dC;
  if(lock){dC=-dM/lock.R;S.counterW=-S.mainW/lock.R;}else{S.counterW*=Math.exp(-.45*dtR);dC=S.counterW/60*TAU*dt;}
  S.counterA+=dC;
  S.wC1=S.mainW*13/36;S.wC2=S.mainW*17/32;S.wC3=S.mainW*20/29;S.wM4=S.counterW*26/23;S.wM5=S.counterW*24/25;
  // starter train
  if(S.starterLocked){S.starterA=S.crankA;S.starterW=S.rpmShow;}else{S.starterW*=Math.exp(-2.2*dtR);S.starterA+=S.starterW/60*TAU*dt;}
  // shifting
  if(!S.shiftAnim&&S.queue.length){startShift(S.queue.shift());}
  if(S.shiftAnim){const a=S.shiftAnim;a.t+=dtR;const u=clamp(a.t/a.dur,0,1);S.drum=a.from+(a.to-a.from)*ease(clamp((u-.08)/.8,0,1));a.u=u;if(u>=1){S.shiftAnim=null;S.drum=a.to;}}
  // spark timing
  const cyc=mod(S.crankA/D2R,720);
  const fired=(S.engine==='running'||S.engine==='stopping')&&S.rpm>200;
  if(fired&&S.sparkPrevCycle<345&&cyc>=345&&cyc<400){S.spark=1;}
  S.sparkPrevCycle=cyc;
  S.spark=Math.max(0,S.spark-dtR*7);
  return {o,lock,cyc,dCrank};
}

function startShift(dir){
  let to=S.pos;
  if(dir==='up'){to=S.pos===0?2:Math.min(5,S.pos+1);}
  else if(dir==='down'){to=S.pos===2?0:Math.max(0,S.pos-1);}
  else if(dir==='half'){to=S.pos===0?1:S.pos===2?1:S.pos;}
  if(to===S.pos){flash(dir==='up'?'Already in top gear. The drum channel ends here.':'Already in 1st. Push down further and nothing happens.');return;}
  const from=POS[S.pos].a, end=POS[to].a;
  S.shiftAnim={from,to:end,t:0,dur:.55,dir:end>from?1:-1,u:0};S.pos=to;
}

/* ======================= apply to scene ======================= */
const UP=new THREE.Vector3();
function apply(st){
  const {o,cyc}=st;const A=S.crankA;
  crankSpin.rotation.x=A; rotorSpin.rotation.x=A;
  brgL.userData.balls.rotation.x=A*.4;brgR.userData.balls.rotation.x=A*.4;
  // piston + rod
  const r=CYCLE.r,L=CYCLE.L;const pz=r*Math.sin(A),py=r*Math.cos(A);const yS=py+Math.sqrt(L*L-pz*pz);
  piston.position.set(PARTS.piston.base.x,yS,0).addScaledVector(PARTS.piston.ex,S.explode);
  rodG.position.set(0,py,pz).addScaledVector(PARTS.conrod.ex,S.explode);rodG.rotation.x=Math.atan2(-pz,yS-py);
  // gas
  const crown=yS+18+S.explode*PARTS.piston.ex.y, top=148+S.explode*PARTS.shell.ex.y;
  gas.visible=PARTS.shell.obj.visible&&S.explode<.02;gas.scale.y=Math.max(.1,top-crown);gas.position.y=(top+crown)/2;
  let gc=0x9ab0d0,go=.0;const live=S.engine!=='off'||S.kick||S.estart;
  if(live){if(cyc<180){gc=0x5b95ff;go=.16;}else if(cyc<360){gc=0x7d6bff;go=.12+.18*(cyc-180)/180;}else if(cyc<540){const u=(cyc-360)/180;gc=new THREE.Color(0xff6a1a).lerp(new THREE.Color(0xb0703c),u).getHex();go=(S.engine==='running'?.55*(1-u)+.1:.12);}else{gc=0x8a8f98;go=.18*(1-(cyc-540)/180)+.05;}}
  gasMat.color.setHex(gc);gasMat.opacity=go;
  // cam & valves
  camSpin.rotation.x=A/2;
  for(const k of ['in','ex']){const V=VALVES[k];const l=LIFT[k](cyc);
    V.rk.rotation.x=V.sz*l/18.5; V.valveMove.position.y=-l*1.02; const comp=(30-6-l)/(30-6);V.spring.scale.y=24*comp;V.spring.position.y=-30;V.spring2.scale.y=24*comp;
    V.spring.position.y=-30;}
  // spark
  sparkLight.intensity=S.spark*2.5e4;sparkGlow.material.opacity=S.spark*.9;sparkGlow.scale.setScalar(.6+S.spark);
  // cam chain
  layChain(camChain,s=>chainPath.at(s),chainPath.L,A*CAMCH.rc,-47);
  // rotor bump/pickup
  // starter
  stDrivenSpin.rotation.x=S.starterA;
  rollers.rotation.x=S.starterLocked?S.crankA:S.crankA; rollers.scale.setScalar(S.starterLocked?1:1.0);
  const red=-S.starterA*46/14+PH.red;reductSpin.rotation.x=red;stPin.rotation.x=-red*42/10+PH.pin;
  // balancer
  balSpin.rotation.x=-A+PH.bal;
  // basket, hub
  basketSpin.rotation.x=S.basketA;kickIdleSpin.rotation.x=S.basketA;fricGroup.rotation.x=S.basketA;
  hubSpin.rotation.x=S.mainA;steelGroup.rotation.x=S.mainA;mainSpin.rotation.x=S.mainA;pplateSpin.rotation.x=S.mainA;springsSpin.rotation.x=S.mainA;
  // clutch release
  const dx=S.clutch*5;
  pplateSpin.position.x=dx;
  CSPR.forEach(s=>{s.position.x=105+dx;s.scale.y=Math.max(.3,12-dx);});
  FR.forEach((m,i)=>{m.position.x=PLATE_X[i*2].x+dx*(i*2+1)/10;});
  ST.forEach((m,i)=>{m.position.x=PLATE_X[i*2+1].x+dx*(i*2+2)/10;});
  PARTS.pushrod.dyn.x=dx;
  lifterSpin.rotation.y=-S.clutch*.5;
  // gearbox
  counterSpin.rotation.x=S.counterA;sprSpin.rotation.x=S.counterA;
  const gm=S.mainA, gc_=S.counterA;
  GEARS.M2.spin.rotation.x=gm;GEARS.M3.spin.rotation.x=gm;
  GEARS.C4.spin.rotation.x=gc_;GEARS.C5.spin.rotation.x=gc_;
  GEARS.C1.spin.rotation.x=-gm*13/36+PH.C1;GEARS.C2.spin.rotation.x=-gm*17/32+PH.C2;GEARS.C3.spin.rotation.x=-gm*20/29+PH.C3;
  GEARS.M4.spin.rotation.x=-gc_*26/23+PH.M4;GEARS.M5.spin.rotation.x=-gc_*24/25+PH.M5;
  GEARS.M3.spin.position.x=o.M3;GEARS.C4.spin.position.x=o.C4;GEARS.C5.spin.position.x=o.C5;
  PARTS.forkM3.dyn.x=o.M3;PARTS.forkC4.dyn.x=o.C4;PARTS.forkC5.dyn.x=o.C5;
  // kick
  kickSpin.rotation.x=S.kickSpin;
  kickGear.position.x=46+S.kickSlide*8;
  kickGearSpin.rotation.x=S.kickSlide>.6?(-S.basketA*22/30+PH.kick):S.kickSpin;
  // drum + star + stopper
  const th=S.drum*D2R;drumSpin.rotation.x=th;
  // roller: find arm angle so roller rests on star
  {const p=STOP.pivot;const f=ph=>{const ry=p.y+STOP.L*Math.cos(ph),rz=p.z+STOP.L*Math.sin(ph);return Math.hypot(ry,rz)-(starR(Math.atan2(rz,ry)-th)+4.5);};
    let best=STOP.phi??Math.atan2(-(starR(GAMMA)+4.5)-p.z,-p.y),bv=1e9;const c0=best;
    for(let i=-30;i<=30;i++){const ph=c0+i*.012;const v=Math.abs(f(ph));if(v<bv-1e-9||(Math.abs(v-bv)<1e-6&&Math.abs(ph-c0)<Math.abs(best-c0))){bv=v;best=ph;}}
    STOP.phi=best;const phi=best;
    STOP.arm.rotation.x=phi+PI/2;
    const rw=new THREE.Vector3(0,p.y+STOP.L*.55*Math.cos(phi),p.z+STOP.L*.55*Math.sin(phi));const d=new THREE.Vector3().subVectors(STOP.anchor,rw);
    STOP.spring.position.copy(rw);STOP.spring.scale.set(1,d.length(),1);STOP.spring.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());}
  // ratchet + pedal
  let rot=0;if(S.shiftAnim){const u=S.shiftAnim.u;rot=S.shiftAnim.dir*.26*(u<.6?Math.sin(u/.6*PI/2):Math.cos((u-.6)/.4*PI/2));}
  gspSpin.rotation.x=-rot;
  nswLamp.material.emissiveIntensity=Math.abs(S.drum-30)<3?2.2:0;
  // drive chain
  {const L=driveChainPath.L,st=L/driveChain.userData.n;layChain(driveChain,s=>driveChainPath.at(s),L,S.counterA*FS.r,-78,s=>mod(s,L)<L-1.6*st);}
}

/* ======================= power path, highlight, explode ======================= */
let selected=null, hovered=null, isolate=null;
const OPT={cut:true,shell:true,path:true,func:false,tags:false};
function pathParts(lock){
  const running=S.engine==='running'||S.kick||S.estart;if(!running)return [];
  const out=['crank','piston','conrod','basket'];
  if(S.kick)out.push('kick','kickidle');
  if(S.estart)out.push('starter','reduction','stclutch');
  if(S.clutch<.5){out.push('friction','steel','hub','mainshaft');if(lock){const gm=lock.m==='M1'?'mainshaft':lock.m;out.push(gm,lock.free,lock.slider,'countershaft','sprocket','chain');if(lock.c!==lock.slider)out.push(lock.c);}}
  return [...new Set(out)];
}
const accentC=new THREE.Color(0xC8502A), selC=new THREE.Color(0xff8a3d);
const SPARKP=new Set(['wires','plug','cdi','icoil','pickup']);
const sparkC=new THREE.Color(0xffb070);
function paint(t){
  const lock=S.lockState;const pp=OPT.path&&!OPT.func?new Set(pathParts(lock)):new Set();
  const pulse=.5+.5*Math.sin(t*5);
  for(const p of Object.values(PARTS)){
    const isSel=selected===p.id, isHov=hovered===p.id, inPath=pp.has(p.id);
    const dim=isolate&&!isolate.has(p.sys);const sp_=SPARKP.has(p.id)&&S.spark>.05;
    for(const m of p.mats){const u=m.userData;const role=u.role||p.role;
      if(OPT.func&&!u.noRole&&role&&!u.ghost)m.color.setHex(ROLE[role]);else m.color.copy(u.baseColor);
      const tr=dim?true:u.baseTr;if(m.transparent!==tr){m.transparent=tr;m.needsUpdate=true;}if(dim){m.opacity=u.ghost?u.baseOp*.3:.07;m.depthWrite=false;}else{m.opacity=u.baseOp;m.depthWrite=u.baseDW;}
      if(m.emissive){if(dim)m.emissiveIntensity=0;else if(isSel){m.emissive.copy(selC);m.emissiveIntensity=.55;}else if(isHov){m.emissive.copy(selC);m.emissiveIntensity=.3;}else if(sp_){m.emissive.copy(sparkC);m.emissiveIntensity=S.spark*1.1;}else if(inPath){m.emissive.copy(accentC);m.emissiveIntensity=.16+.2*pulse;}else m.emissiveIntensity=0;}
      if(u.cut)m.clippingPlanes=OPT.cut?p.clipArr:null;
    }
  }
}
function applyExplode(){
  for(const p of Object.values(PARTS)){if(p.id==='piston'||p.id==='conrod')continue;
    p.obj.position.copy(p.base).addScaledVector(p.ex,S.explode).add(p.dyn);}
  for(const p of Object.values(PARTS)){if(!p.plane)continue;p.plane.constant=p.obj.position.z;}
}

/* ======================= UI ======================= */
const $=id=>document.getElementById(id);
function flash(t,warn){S.msg=t;S.msgWarn=!!warn;S.msgT=4;}
function updateMsg(){
  const bar=$('msgbar');let t,cls='';
  if(S.msgT>0){t=S.msg;cls=S.msgWarn?'warn':'';}
  else if(S.kick)t='Kicking: the helical spline slides the kick gear into the kick idle gear, which turns the clutch basket, which turns the crank through the primary gears.';
  else if(S.estart)t=S.engine==='off'?'Starter motor turning. The one-way clutch rollers are wedged, so the motor drives the crank through 13.8 : 1 of reduction.':'';
  else if(S.engine==='off')t='Engine stopped. Kick it or press the starter button. You can shift gears with the engine stopped.';
  else if(S.engine==='stopping')t='Kill switch: the CDI exciter feed is earthed, the plug stops firing and the engine runs down.';
  else{const l=S.lockState;
    if(S.fireT>0)t='Fired. The crank now overruns the starter clutch, so the rollers release and the starter gear coasts to a stop.';
    else if(!l)t=S.clutch>.5?'Running in neutral with the clutch pulled. The basket and friction plates spin with the engine; the hub, steel plates and mainshaft slow down.':'Running in neutral. The clutch is engaged, so the mainshaft turns, but no dog is engaged: every countershaft gear just spins on its shaft.';
    else if(S.clutch>.5)t=`In ${l.n}${['st','nd','rd','th','th'][+l.n-1]} with the clutch pulled. The plates are apart, so the rear wheel coasts and the engine runs free.`;
    else t=`In ${l.n}${['st','nd','rd','th','th'][+l.n-1]}: ${l.txt}. Gear ratio ${l.R.toFixed(3)} : 1, overall ${(l.R*67/18*43/14).toFixed(2)} : 1 from crank to rear wheel.`;}
  if(!t)t='';
  if($('msg').textContent!==t)$('msg').textContent=t;
  bar.className='msgbar '+(cls||((S.engine==='running')?'run':''));
}
$('bKick').onclick=()=>{if(S.engine!=='off'||S.kick||S.estart){flash('The engine is already running. A kick only makes sense with it stopped.');return;}S.kick={t:0};S.kickSpin=0;};
$('bElec').onclick=()=>{if(S.engine!=='off'||S.kick||S.estart){flash('Engine already running. The one-way clutch would just freewheel.');return;}S.estart={t:0};};
$('bKill').onclick=()=>{if(S.engine==='running'){S.engine='stopping';}};
$('throttle').oninput=e=>{S.throttle=e.target.value/100;$('throttleOut').textContent=S.throttle<.02?'idle':Math.round(1400+S.throttle*7100)+' rpm';};
const bC=$('bClutch');
const cOn=e=>{e.preventDefault();S.clutchHeld=true;bC.classList.add('down');}, cOff=()=>{S.clutchHeld=false;bC.classList.remove('down');};
bC.addEventListener('pointerdown',cOn);bC.addEventListener('pointerup',cOff);bC.addEventListener('pointerleave',cOff);bC.addEventListener('pointercancel',cOff);
bC.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){S.clutchHeld=true;bC.classList.add('down');e.preventDefault();}});
bC.addEventListener('keyup',cOff);
$('clutchLatch').onchange=e=>S.clutchLatch=e.target.checked;
$('bUp').onclick=()=>S.queue.push('up');$('bDown').onclick=()=>S.queue.push('down');
{ const box=$('gearChips');for(const p of ['1','N','2','3','4','5']){const b=document.createElement('button');b.textContent=p;b.dataset.g=p;if(p==='N')b.classList.add('n');b.setAttribute('aria-label','Select '+(p==='N'?'neutral':'gear '+p));
  b.onclick=()=>{const tgt=POS.findIndex(q=>q.n===p);let cur=S.pos+S.queue.reduce((a,q)=>a,0);// queue path
    S.queue=[];let c=S.pos;if(tgt===1){if(c===1)return;// neutral
      if(c>2){while(c>2){S.queue.push('down');c--;}}S.queue.push('half');return;}
    if(c===1){S.queue.push(tgt===0?'down':'up');c=tgt===0?0:2;}
    while(c<tgt){S.queue.push('up');c=c===0?2:c+1;}while(c>tgt){S.queue.push('down');c=c===2?0:c-1;}};
  box.appendChild(b);} }
document.querySelectorAll('#speedBtns button').forEach(b=>b.onclick=()=>{S.ts=+b.dataset.ts;document.querySelectorAll('#speedBtns button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('explode').oninput=e=>{S.explode=e.target.value/100;$('explodeOut').textContent=S.explode<.01?'assembled':Math.round(S.explode*100)+'%';applyExplode();};
$('optCut').onchange=e=>OPT.cut=e.target.checked;
$('optShell').onchange=e=>{OPT.shell=e.target.checked;PARTS.shell.obj.visible=OPT.shell;};
$('optPath').onchange=e=>OPT.path=e.target.checked;
$('optFunc').onchange=e=>{OPT.func=e.target.checked;$('funcLegend').hidden=!OPT.func;};
$('optTags').onchange=e=>{OPT.tags=e.target.checked;$('tags').hidden=!OPT.tags;};
window.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.key==='ArrowUp'){S.queue.push('up');e.preventDefault();}if(e.key==='ArrowDown'){S.queue.push('down');e.preventDefault();}});

// camera views
const CAMS={
  overview:{p:[500,330,420],t:[0,55,-55],iso:null},
  gearbox:{p:[-10,340,-20],t:[0,-45,-88],iso:['box','final']},
  clutch:{p:[380,70,170],t:[80,-40,-64],iso:['clutch','box']},
  shift:{p:[360,-120,-140],t:[40,-98,-100],iso:['shift']},
  top:{p:[270,320,270],t:[0,165,0],iso:['valve','crank','ign']},
  gen:{p:[-390,130,250],t:[-80,15,0],iso:['ign','start','crank']},
  start:{p:[400,-20,300],t:[70,-45,-35],iso:['start','crank','clutch']},
  final:{p:[-400,40,-320],t:[-80,-30,-170],iso:['final','box','shift']}};
function setIsolate(list){isolate=list?new Set(list):null;document.querySelectorAll('[data-sys]').forEach(x=>x.setAttribute('aria-pressed',!!(isolate&&isolate.has(x.dataset.sys))));
  const f=$('focusPill');if(isolate){f.hidden=false;f.querySelector('span').textContent='Showing '+[...isolate].map(k=>SYSINFO.find(q=>q[0]===k)[1].toLowerCase()).join(', ');}else f.hidden=true;}
let camAnim=null;
function goCam(k){const c=CAMS[k];setIsolate(c.iso);camAnim={t:0,p0:camera.position.clone(),t0:controls.target.clone(),p1:new THREE.Vector3(...c.p),t1:new THREE.Vector3(...c.t)};document.querySelectorAll('[data-cam]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cam===k));}
document.querySelectorAll('[data-cam]').forEach(b=>b.onclick=()=>{goCam(b.dataset.cam);if(b.dataset.cam==='final')showChainMoving();});
// The drive chain is turned by the countershaft, which stands still in neutral, and moves very slowly at 1/20 speed.
// In the final drive view: start the engine if needed, select first gear and use 1/5 speed so the chain is seen moving.
function showChainMoving(){
  if(S.engine!=='running'&&!S.estart){S.estart={t:0};}
  if(S.pos===1&&!S.queue.length)S.queue.push('down');
  if(S.ts<0.2){S.ts=0.2;document.querySelectorAll('#speedBtns button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.ts==='0.2'));}
  flash('First gear selected so the chain turns. In neutral the countershaft, sprocket and chain stand still.');
}
$('showAll').onclick=()=>{setIsolate(null);document.querySelectorAll('[data-cam]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cam==='overview'));};

// parts list
function buildList(){const host=$('plist');host.innerHTML='';
  for(const [sys,label] of SYSINFO){const ids=SYS[sys]||[];if(!ids.length)continue;
    const d=document.createElement('details');d.className='sys';if(sys==='box'||sys==='clutch')d.open=true;
    const s=document.createElement('summary');s.innerHTML=`<span>${label} <span class="n">${ids.length}</span></span>`;
    const ib=document.createElement('button');ib.textContent='Isolate';ib.setAttribute('aria-pressed','false');ib.dataset.sys=sys;
    ib.onclick=e=>{e.preventDefault();e.stopPropagation();setIsolate(isolate&&isolate.size===1&&isolate.has(sys)?null:[sys]);};
    s.appendChild(ib);d.appendChild(s);
    const ul=document.createElement('ul');ul.className='plist';
    for(const id of ids){const p=PARTS[id];const li=document.createElement('li');const b=document.createElement('button');b.dataset.pid=id;
      const t=(p.spec()[0]||[])[1]||'';b.innerHTML=`<span>${p.name}</span><i>${/T/.test(t)&&t.length<26?t.split(',')[0]:''}</i>`;
      b.onclick=()=>select(id,true);li.appendChild(b);ul.appendChild(li);}
    d.appendChild(ul);host.appendChild(d);}
}
function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function select(id,focus){selected=id;const p=PARTS[id];if(focus&&p&&isolate&&!isolate.has(p.sys))setIsolate(null);
  document.querySelectorAll('.plist button').forEach(b=>b.setAttribute('aria-current',b.dataset.pid===id));
  if(!p){return;}
  const sysName=(SYSINFO.find(s=>s[0]===p.sys)||[])[1];
  $('info').innerHTML=`<p class="eyebrow">${esc(sysName)}</p><h2>${esc(p.name)}</h2><p>${esc(p.desc)}</p><table class="kv"><tbody>${p.spec().map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}<tr><td>Turning now</td><td class="live" id="liveRpm">–</td></tr></tbody></table>`;
  if(focus){const wp=new THREE.Vector3();p.obj.getWorldPosition(wp);if(p.tag){wp.x+=0;}const box=new THREE.Box3().setFromObject(p.obj);const c=box.getCenter(new THREE.Vector3());const sz=box.getSize(new THREE.Vector3()).length();
    const dir=camera.position.clone().sub(controls.target).normalize();const dist=clamp(sz*2.2,220,900);
    camAnim={t:0,p0:camera.position.clone(),t0:controls.target.clone(),p1:c.clone().addScaledVector(dir,dist),t1:c};}
}
// picking
const ray=new THREE.Raycaster(), ndc=new THREE.Vector2();
function pick(ev){const r=renderer.domElement.getBoundingClientRect();ndc.set((ev.clientX-r.left)/r.width*2-1,-(ev.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,camera);
  const hits=ray.intersectObjects(pickables,false);
  for(const h of hits){let o=h.object;let vis=true;let q=o;while(q){if(!q.visible){vis=false;break;}q=q.parent;}if(!vis)continue;const p=PARTS[o.userData.pid];if(!p)continue;
    if(isolate&&!isolate.has(p.sys))continue;
    if(o.material.clippingPlanes&&o.material.clippingPlanes.length&&o.material.clippingPlanes[0].distanceToPoint(h.point)<0)continue;
    if(o.material.userData.ghost&&hits.length>1&&h!==hits[hits.length-1])continue;
    return {p,ev};}
  return null;}
let downXY=null;
renderer.domElement.addEventListener('pointerdown',e=>downXY=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{if(!downXY)return;if(Math.hypot(e.clientX-downXY[0],e.clientY-downXY[1])<5){const h=pick(e);if(h)select(h.p.id,false);}downXY=null;});
let hoverT=0;
renderer.domElement.addEventListener('pointermove',e=>{const now=performance.now();if(now-hoverT<50||e.buttons)return;hoverT=now;const h=pick(e);const tip=$('tip');
  if(h){hovered=h.p.id;const r=view.getBoundingClientRect();tip.hidden=false;tip.innerHTML=`${esc(h.p.name)}<small>${esc((h.p.spec()[0]||['',''])[1])}</small>`;tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';renderer.domElement.style.cursor='pointer';}
  else{hovered=null;tip.hidden=true;renderer.domElement.style.cursor='';}});
renderer.domElement.addEventListener('pointerleave',()=>{hovered=null;$('tip').hidden=true;});

// tags overlay
const TAGS=['crank','piston','camshaft','camchain','valvein','valveex','plug','rotor','stator','pickup','cdi','icoil','starter','stclutch','kick','kickidle','balancer','basket','pplate','lifter','mainshaft','countershaft','M3','C4','C5','C1','drum','stopper','shiftspindle','sprocket'];
for(const [id,z] of Object.entries(GDATA))if(PARTS[id])PARTS[id].short=id+' · '+z.z+' T';
Object.assign(PARTS.stclutch,{short:'Starter clutch'});Object.assign(PARTS.kick,{short:'Kickstarter'});Object.assign(PARTS.stopper,{short:'Star cam and stopper'});Object.assign(PARTS.shiftspindle,{short:'Gear pedal and ratchet'});Object.assign(PARTS.basket,{short:'Clutch basket · 67 T'});Object.assign(PARTS.camshaft,{short:'Camshaft · 32 T'});Object.assign(PARTS.rotor,{short:'Flywheel rotor'});Object.assign(PARTS.kickidle,{short:'Kick idle · 22 T'});
const tagEls={};for(const id of TAGS){const s=document.createElement('span');s.textContent=PARTS[id].short||PARTS[id].name.replace(/ \(.+\)/,'');$('tags').appendChild(s);tagEls[id]=s;}
function placeTags(){if(!OPT.tags)return;const r=view.getBoundingClientRect();const v=new THREE.Vector3();
  for(const id of TAGS){const p=PARTS[id];p.obj.getWorldPosition(v);if(p.tag)v.add(new THREE.Vector3(...p.tag));
    v.project(camera);const el=tagEls[id];const show=v.z<1&&Math.abs(v.x)<1.05&&Math.abs(v.y)<1.05&&!(isolate&&!isolate.has(p.sys))&&p.obj.visible;el.hidden=!show;
    if(show){el.style.left=((v.x+1)/2*r.width)+'px';el.style.top=((1-v.y)/2*r.height)+'px';}}}
// stroke dial
function strokeUI(cyc){const names=['Intake','Compression','Power','Exhaust'];const i=Math.floor(cyc/180)%4;$('strokeName').textContent=names[i];$('strokeDeg').textContent=Math.round(cyc)+'° of 720°';
  const a0=i*PI/2-PI/2, a1=a0+(cyc-i*180)/180*PI/2;const R=18,c=23;const p=(a)=>`${c+R*Math.cos(a)} ${c+R*Math.sin(a)}`;
  $('strokeArc').setAttribute('d',`M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1+.0001)}`);
  const ha=cyc/720*TAU-PI/2;const h=$('strokeHand');h.setAttribute('x2',c+15*Math.cos(ha));h.setAttribute('y2',c+15*Math.sin(ha));}

// readouts
let roT=0;
function readouts(){const l=S.lockState;
  $('roRpm').innerHTML=`${Math.round(S.rpmShow).toLocaleString('en-GB')}<small>rpm</small>`;
  $('roGear').textContent=S.shiftAnim?'…':(l?l.n:(Math.abs(S.drum-30)<1?'N':'–'));
  $('roClutch').textContent=S.clutch>.98?'Pulled':S.clutch<.02?'Engaged':'Slipping';
  $('roMain').innerHTML=`${Math.round(Math.abs(S.mainW)).toLocaleString('en-GB')}<small>rpm</small>`;
  $('roCounter').innerHTML=`${Math.round(Math.abs(S.counterW)).toLocaleString('en-GB')}<small>rpm</small>`;
  const kmh=Math.abs(S.counterW)/(43/14)*1.95*60/1000;$('roSpeed').innerHTML=`${kmh.toFixed(1)}<small>km/h</small>`;
  document.querySelectorAll('#gearChips button').forEach(b=>b.classList.toggle('cur',!S.shiftAnim&&b.dataset.g===POS[S.pos].n));
  $('bKick').disabled=S.engine!=='off'||!!S.kick||!!S.estart;$('bElec').disabled=$('bKick').disabled;$('bKill').disabled=S.engine!=='running';
  if(selected&&$('liveRpm')){const v=PARTS[selected].rpm();$('liveRpm').textContent=v==null?'reciprocating or fixed':Math.round(Math.abs(v)).toLocaleString('en-GB')+' rpm';}
}

/* ======================= tables ======================= */
(function tables(){
  const pri=67/18, fin=43/14, circ=1.95;
  const rows=[['1st','M1','13','C1','36','C5 slides right'],['2nd','M2','17','C2','32','C4 slides left'],['3rd','M3','20','C3','29','C4 slides right'],['4th','M4','23','C4','26','M3 slides left'],['5th','M5','25','C5','24','M3 slides right']];
  const sw=r=>`<span class="pill" style="background:var(--c-${r})">${r==='spl'?'splined':r==='free'?'free':r==='fix'?'fixed':''}</span>`;
  const role={M1:'fix',M2:'spl',M3:'spl',M4:'free',M5:'free',C1:'free',C2:'spl',C3:'free',C4:'spl',C5:'spl'};role.C2='free';
  let h='<thead><tr><th>Gear</th><th>Mainshaft</th><th>Countershaft</th><th>Gear ratio</th><th>Overall ratio</th><th>Engine rev per wheel rev</th><th>km/h at 8,000 rpm</th><th>Locked by</th></tr></thead><tbody>';
  for(const [g,m,zm,c,zc,by] of rows){const R=zc/zm;const ov=pri*R*fin;h+=`<tr><td><b>${g}</b></td><td class="num">${m} ${zm} T ${sw(role[m])}</td><td class="num">${c} ${zc} T ${sw(role[c])}</td><td class="num">${R.toFixed(3)}</td><td class="num">${ov.toFixed(2)} : 1</td><td class="num">${ov.toFixed(1)}</td><td class="num">${(8000/ov*circ*60/1000).toFixed(1)}</td><td>${by}</td></tr>`;}
  $('tRatio').innerHTML=h+'</tbody>';
  let s='<thead><tr><th>Position</th><th>Drum</th><th>Fork moved</th><th>Dogs lock</th><th>Power path</th></tr></thead><tbody>';
  const sr=[['1st','0°','C5 fork right','C5 into C1','M1 → C1 → C5 → countershaft'],['Neutral','30°','none','none','Mainshaft turns, countershaft free'],['2nd','60°','C4 fork left','C4 into C2','M2 → C2 → C4 → countershaft'],['3rd','120°','C4 fork right','C4 into C3','M3 → C3 → C4 → countershaft'],['4th','180°','M3 fork left','M3 into M4','M3 → M4 → C4 → countershaft'],['5th','240°','M3 fork right','M3 into M5','M3 → M5 → C5 → countershaft']];
  for(const r of sr)s+=`<tr><td><b>${r[0]}</b></td><td class="num">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`;
  $('tShift').innerHTML=s+'</tbody>';
  let t='<thead><tr><th>Train</th><th>Teeth</th><th>Ratio</th><th>Note</th></tr></thead><tbody>';
  const tr=[['Primary drive','18 T crank : 67 T basket','3.722 : 1','Module 1.75, spur gears'],['Cam drive','16 T : 32 T sprockets','2 : 1','6.35 mm roller chain'],['Balancer','28 T : 28 T','1 : 1, reversed','Weight 180° out of phase'],['Electric start','10 T → 42 T / 14 T → 46 T','13.8 : 1','Roller one-way clutch'],['Kickstart','30 T → 22 T, then primary','5.08 : 1 overall','About 105° of lever, 1.5 crank turns'],['Final drive','14 T : 43 T','3.071 : 1','Chain to rear wheel']];
  for(const r of tr)t+=`<tr><td><b>${r[0]}</b></td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td>${r[3]}</td></tr>`;
  $('tTrains').innerHTML=t+'</tbody>';
})();

/* ======================= loop ======================= */
function resize(){const w=view.clientWidth,h=view.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<1?50:w/h<1.4?40:32;camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe(view);resize();
buildList();applyExplode();goCam('overview');camAnim.t=1;camera.position.copy(camAnim.p1);controls.target.copy(camAnim.t1);camAnim=null;
let last=performance.now();
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function frame(now){if(window.__freeze){last=now;requestAnimationFrame(frame);return;}const dtR=(now-last)/1000;last=now;
  tick(dtR,now);requestAnimationFrame(frame);}
function tick(dtR,now,draw=true){
  if(S.msgT>0)S.msgT-=dtR;if(S.fireT>0)S.fireT-=dtR;
  const st=step(dtR);apply(st);paint(now/1000);
  if(camAnim){camAnim.t=Math.min(1,camAnim.t+dtR/(reduce?.01:.9));const u=ease(camAnim.t);camera.position.lerpVectors(camAnim.p0,camAnim.p1,u);controls.target.lerpVectors(camAnim.t0,camAnim.t1,u);if(camAnim.t>=1)camAnim=null;}
  controls.update();
  applyExplode();
  if(draw){renderer.render(scene,camera);placeTags();}
  if(now-roT>120){roT=now;readouts();updateMsg();strokeUI(st.cyc);}}
window.__tick=(n,dt)=>{let t=performance.now();for(let i=0;i<n;i++){t+=dt*1000;tick(dt,t,i===n-1);}};
requestAnimationFrame(frame);
window.__PARTS=PARTS;
