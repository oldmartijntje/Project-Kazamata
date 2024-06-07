var B=Object.defineProperty;var X=(i,t,e)=>t in i?B(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var P=(i,t,e)=>(X(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();class r{constructor(t=0,e=0){this.x=t,this.y=e}duplicate(){return new r(this.x,this.y)}}class G{constructor(t,e){P(this,"mainLoop",t=>{if(!this.isRunning)return;let e=t-this.lastFrameTime;for(this.lastFrameTime=t,this.accumulatedTime+=e;this.accumulatedTime>=this.timeStep;)this.update(this.timeStep),this.accumulatedTime-=this.timeStep;this.render(),this.rafId=requestAnimationFrame(this.mainLoop)});this.lastFrameTime=0,this.accumulatedTime=0,this.timeStep=1e3/60,this.update=t,this.render=e,this.rafId=null,this.isRunning=!1}start(){this.isRunning||(this.isRunning=!0,this.rafId=requestAnimationFrame(this.mainLoop))}stop(){this.rafId||cancelAnimationFrame(this.rafId),this.isRunning=!1}}class j{constructor(){P(this,"callbacks",[]);P(this,"nextId",0)}emit(t,e){this.callbacks.forEach(s=>{s.eventName===t&&s.callback(e)})}on(t,e,s){return this.nextId++,this.callbacks.push({id:this.nextId,eventName:t,caller:e,callback:s}),this.nextId}off(t){this.callbacks=this.callbacks.filter(e=>e.id!==t)}unsubscribe(t){this.callbacks=this.callbacks.filter(e=>e.caller!==t)}}const d=new j;class w{constructor({position:t}){this.position=t??new r(0,0),this.children=[],this.parent=null,this.hasBeenInitiated=!1,this.isSolid=!1,this.drawLayer=null}stepEntry(t,e){this.children.forEach(s=>s.stepEntry(t,e)),this.hasBeenInitiated||(this.hasBeenInitiated=!0,this.onInit()),this.step(t,e)}onInit(){}step(t){}draw(t,e,s){const n=e+this.position.x,o=s+this.position.y;this.drawImage(t,n,o),this.getDrawChildrenOrdered().forEach(a=>a.draw(t,n,o))}getDrawChildrenOrdered(){return[...this.children].sort((t,e)=>e.drawLayer==="FLOOR"||t.position.y>e.position.y?1:-1)}drawImage(t,e,s){}destroy(){this.children.forEach(t=>t.destroy()),this.parent&&this.parent.removeChild(this)}addChild(t){t.parent=this,this.children.push(t)}removeChild(t){d.unsubscribe(t),this.children=this.children.filter(e=>e!==t)}}class Y extends w{constructor(){super({}),this.offset=new r(0,0),this.onInit()}onInit(){d.on("HERO_POSITION",this,t=>{this.centerPositionOnTarget(t.position)}),d.on("CHANGE_LEVEL",this,t=>{this.centerPositionOnTarget(t.heroStartPosition)})}centerPositionOnTarget(t){this.position=new r(-t.x+152,-t.y+82)}}const h={baseUrl:"Project-Kazamata",assetsPath:"assets",keys:{upKeys:["ArrowUp","KeyW"],downKeys:["ArrowDown","KeyS"],leftKeys:["ArrowLeft","KeyA"],rightKeys:["ArrowRight","KeyD"]},sizes:{gridSize:16,canvasWidth:320,canvasHeight:180}},S="LEFT",T="RIGHT",x="UP",I="DOWN";class q{constructor(){this.heldDirections=[],this.keys={},this.lastKeys={},document.addEventListener("keydown",t=>{this.keys[t.code]=!0,h.keys.upKeys.includes(t.code)?this.onKeyPressed(x):h.keys.downKeys.includes(t.code)?this.onKeyPressed(I):h.keys.leftKeys.includes(t.code)?this.onKeyPressed(S):h.keys.rightKeys.includes(t.code)&&this.onKeyPressed(T)}),document.addEventListener("keyup",t=>{this.keys[t.code]=!1,h.keys.upKeys.includes(t.code)?this.onKeyReleased(x):h.keys.downKeys.includes(t.code)?this.onKeyReleased(I):h.keys.leftKeys.includes(t.code)?this.onKeyReleased(S):h.keys.rightKeys.includes(t.code)&&this.onKeyReleased(T)}),document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("leftButton"),e=document.getElementById("rightButton"),s=document.getElementById("upButton"),n=document.getElementById("downButton"),o=(a,u)=>{a.addEventListener("mousedown",()=>this.onKeyPressed(u)),a.addEventListener("mouseup",()=>this.onKeyReleased(u)),a.addEventListener("touchstart",m=>{m.preventDefault(),this.onKeyPressed(u)}),a.addEventListener("touchend",m=>{m.preventDefault(),this.onKeyReleased(u)})};o(t,S),o(e,T),o(s,x),o(n,I)})}get direction(){return this.heldDirections[0]}update(){this.lastKeys={...this.keys}}getActionJustPressed(t){let e=!1;return this.keys[t]&&!this.lastKeys[t]&&(e=!0),e}onKeyPressed(t){this.heldDirections.includes(t)||this.heldDirections.unshift(t)}onKeyReleased(t){const e=this.heldDirections.indexOf(t);e>-1&&this.heldDirections.splice(e,1)}}class V{constructor(){this.toLoad={hero:"sprites/hero-sheet.png",shadow:"sprites/shadow.png",rod:"sprites/rod.png",exit:"sprites/exit.png",sky:"sprites/sky.png",ground:"sprites/ground.png",cave:"sprites/cave.png",caveGround:"sprites/cave-ground.png",knight:"sprites/knight-sheet-1.png",textBox:"sprites/text-box.png",fontWhite:"sprites/sprite-font-white.png"},this.images={};var t="";try{t="/"+h.baseUrl+"/"+h.assetsPath+"/"}catch(e){console.log(e),t="/"+h.baseUrl+"/"+h.assetsPath+"/"}console.log(`"${t}"`),Object.keys(this.toLoad).forEach(e=>{const s=new Image;s.src=t+this.toLoad[e],this.images[e]={image:s,isLoaded:!1},s.onload=()=>{this.images[e].isLoaded=!0}})}}const f=new V;class p extends w{constructor({resource:t,frameSize:e,hFrames:s,vFrames:n,frame:o,scale:a,position:u,animations:m}){super({position:u??new r(0,0)}),this.resource=t,this.frameSize=e??new r(h.sizes.gridSize,h.sizes.gridSize),this.hFrames=s??1,this.vFrames=n??1,this.frame=o??0,this.frameMap=new Map,this.scale=a??1,this.position=u??new r(0,0),this.animations=m??null,this.buildFrameMap()}buildFrameMap(){let t=0;for(let e=0;e<this.vFrames;e++)for(let s=0;s<this.hFrames;s++)this.frameMap.set(t,new r(s*this.frameSize.x,e*this.frameSize.y)),t++}step(t){this.animations&&(this.animations.step(t),this.frame=this.animations.frame)}drawImage(t,e,s){if(!this.resource.isLoaded)return;let n=0,o=0;const a=this.frameMap.get(this.frame);a&&(n=a.x,o=a.y);const u=this.frameSize.x,m=this.frameSize.y;t.drawImage(this.resource.image,n,o,u,m,e,s,u*this.scale,m*this.scale)}}class J extends w{constructor(){super({position:new r(0,1)}),this.items=[],this.drawLayer="HUD",this.nextId=0,this.renderInventory()}renderInventory(){this.children.forEach(t=>t.destroy()),this.items.forEach((t,e)=>{const s=new p({resource:t.image,position:new r(e*12,0)});this.addChild(s)})}removeFromInventory(t){this.items=this.items.filter(e=>e.id!==t),this.renderInventory()}onInit(){d.on("HERO_PICK_UP_ITEM",this,t=>{this.items.push({id:this.nextId++,image:t.image}),console.log(this.items),this.renderInventory()})}}const $=5,l=new Map;l.set("c",4);l.set("f",5);l.set("i",2);l.set("j",4);l.set("l",3);l.set("n",4);l.set("r",4);l.set("t",4);l.set("u",4);l.set("v",4);l.set("x",4);l.set("y",4);l.set("z",4);l.set("E",4);l.set("F",4);l.set("M",7);l.set("W",7);l.set(" ",3);l.set("'",1);l.set("!",1);const Q=i=>l.get(i)??$,N=new Map;["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ","0123456789 __",".!-,?'"].join("").split("").forEach((i,t)=>{N.set(i,t)});const Z=i=>N.get(i)??null,tt=5,et=1,st=3,it=20,nt=1,ot=1;class rt extends w{constructor(t){super({position:new r(32,108)});const e=t??"";this.drawLayer="HUD",this.words=e.split(" ").map(s=>{let n=0;const o=s.split("").map(a=>{const u=Q(a);return n+=u,{width:u,sprite:new p({resource:f.images.fontWhite,hFrames:13,vFrames:6,frame:Z(a)})}});return{wordWidth:n,chars:o}}),this.backdrop=new p({resource:f.images.textBox,frameSize:new r(256,64)}),this.showingIndex=0,this.finalIndex=this.words.reduce((s,n)=>s+n.chars.length,0),this.textSpeed=it,this.timeUntilNextShow=this.textSpeed}step(t,e){const s=e.input;if(s!=null&&s.getActionJustPressed("Space")){if(this.showingIndex<this.finalIndex){this.showingIndex=this.finalIndex;return}d.emit("END_TEXT_BOX")}this.timeUntilNextShow-=t,this.timeUntilNextShow<=0&&(this.showingIndex+=ot,this.timeUntilNextShow+=this.textSpeed)}drawImage(t,e,s){this.backdrop.drawImage(t,e,s);const n=7,o=7,a=240,u=14;let m=e+n,k=s+o,C=0;this.words.forEach(R=>{e+a-m<R.wordWidth&&(m=e+n,k+=u),R.chars.forEach(M=>{if(C>this.showingIndex)return;const{sprite:z,width:W}=M,U=m-tt;z.draw(t,U,k),m+=W+et,C+=nt}),m+=st})}}class at extends w{constructor(){super({}),this.level=null,this.input=new q,this.camera=new Y}onInit(){const t=new J;this.addChild(t),d.on("CHANGE_LEVEL",this,e=>{this.setLevel(e)}),d.on("HERO_REQUESTS_ACTION",this,()=>{let e=null;e=new rt("Hallo mijn naam is Gamemeneer en in Minecraft bouw ik boten."),this.addChild(e),console.log(this.children),d.emit("START_TEXT_BOX");const s=d.on("END_TEXT_BOX",this,()=>{e.destroy(),d.off(s)})})}setLevel(t){this.level&&this.level.destroy(),this.level=t,this.addChild(this.level)}drawBackground(t){var e;(e=this.level)==null||e.background.drawImage(t,0,0)}drawObjects(t){this.children.forEach(e=>{e.drawLayer!=="HUD"&&e.draw(t,0,0)})}drawForeground(t){this.children.forEach(e=>{e.drawLayer==="HUD"&&e.draw(t,0,0)})}}class b extends w{constructor(){super({}),this.background=null,this.walls=new Set}}const c=i=>i*h.sizes.gridSize,ht=(i,t,e)=>{t=Math.round(t),e=Math.round(e);const s=`${t},${e}`;return!i.has(s)},D=(i,t)=>{const e=h.sizes.gridSize,s=Math.round(i/e)*e,n=Math.round(t/e)*e;return new r(s,n)};function dt(i,t,e){let s=t.x-i.position.x,n=t.y-i.position.y,o=Math.sqrt(s**2+n**2);if(o===0)return o;if(o<=e)return i.position.x=t.x,i.position.y=t.y,0;{Math.abs(s)<=e&&(i.position.x=t.x),Math.abs(n)<=e&&(i.position.y=t.y);let a=s/o,u=n/o;i.position.x+=a*e,i.position.y+=u*e,s=t.x-i.position.x,n=t.y-i.position.y,o=Math.sqrt(s**2+n**2)}return o}function H(i,t,e=void 0,s=1){t.x=Math.round(t.x),t.y=Math.round(t.y),e||(e=t);const n=Math.round(t.x),o=Math.round(t.y);return Math.abs(i.x-n)<=s&&Math.abs(i.y-o)<=s&&Math.abs(i.y-o)<=Math.abs(i.y-e.y)&&Math.abs(i.x-n)<=Math.abs(i.x-e.x)}class K extends w{constructor(t,e){super({position:new r(t,e)}),this.drawLayer="FLOOR",this.addChild(new p({resource:f.images.exit})),this.lastPlayerPosition=new r(0,0)}step(t,e){}onInit(){d.on("HERO_POSITION",this,t=>{H(this.position,t.position,this.lastPlayerPosition)&&d.emit("HERO_EXITS"),this.lastPlayerPosition=new r(t.position.x,t.position.y)})}}class ct{constructor(t){this.patterns=t,this.activeKey=Object.keys(t)[0]}get frame(){return this.patterns[this.activeKey].frame}play(t,e=0){this.activeKey!==t&&(this.activeKey=t,this.patterns[this.activeKey].currentTime=e)}step(t){this.patterns[this.activeKey].step(t)}}const L=(i=0)=>({duration:400,frames:[{time:0,frame:i+1}]}),_=(i=0)=>({duration:400,frames:[{time:0,frame:i+1},{time:100,frame:i},{time:200,frame:i+1},{time:300,frame:i+2}]}),lt=L(0),ut=L(3),mt=L(6),pt=L(9),ft=_(0),wt=_(3),gt=_(6),yt=_(9),Et={duration:400,frames:[{time:0,frame:12}]};class y{constructor(t){this.currentTime=0,this.animationConfig=t,this.duration=t.duration}get frame(){const{frames:t}=this.animationConfig;for(let e=t.length-1;e>=0;e--)if(this.currentTime>=t[e].time)return t[e].frame;throw"Time is less than 0 in FrameIndexPattern"}step(t){this.currentTime+=t,this.currentTime=this.currentTime%this.duration}}class A extends w{constructor(t,e){super({position:new r(t,e)});const s=new p({resource:f.images.shadow,position:new r(-8,-19),frameSize:new r(32,32)});this.addChild(s),this.body=new p({resource:f.images.hero,hFrames:3,vFrames:8,frame:1,frameSize:new r(32,32),position:new r(-8,-20),animations:new ct({walkDown:new y(ft),walkUp:new y(gt),walkLeft:new y(yt),walkRight:new y(wt),standDown:new y(lt),standUp:new y(mt),standLeft:new y(pt),standRight:new y(ut),pickupDown:new y(Et)})}),this.addChild(this.body),this.facingDirection=I,this.destinationPosition=this.position.duplicate(),this.itemPickupTime=0,this.itemPickupShell=null,this.isLocked=!1,d.on("HERO_PICK_UP_ITEM",this,n=>{this.onPickUpItem(n)})}onInit(){d.on("START_TEXT_BOX",this,t=>{this.isLocked=!0}),d.on("END_TEXT_BOX",this,t=>{this.isLocked=!1})}step(t,e){if(this.isLocked)return;if(this.itemPickupTime>0){this.workOnItemPickup(t);return}const s=e.input;s!=null&&s.getActionJustPressed("Space")&&d.emit("HERO_REQUESTS_ACTION",{position:this.position,direction:this.facingDirection}),dt(this,this.destinationPosition,1)<=1&&this.tryMove(e),this.tryEmitPosition()}tryEmitPosition(){this.lastPosition&&this.lastPosition.x===this.position.x&&this.lastPosition.y===this.position.y||(d.emit("HERO_POSITION",{position:this.position,initialPosition:!this.lastPosition}),this.lastPosition=this.position.duplicate())}onPickUpItem({image:t,position:e}){const s=this.position.duplicate();this.position=D(s.x,s.y),this.destinationPosition=this.position.duplicate(),this.itemPickupTime=500,this.itemPickupShell=new w({}),this.itemPickupShell.addChild(new p({resource:t,position:new r(0,-18)})),this.addChild(this.itemPickupShell)}tryMove(t){const{input:e}=t;if(!e)return;if(!e.direction){this.facingDirection===S?this.body.animations.play("standLeft"):this.facingDirection===T?this.body.animations.play("standRight"):this.facingDirection===x?this.body.animations.play("standUp"):this.facingDirection===I&&this.body.animations.play("standDown");return}let s=this.destinationPosition.x,n=this.destinationPosition.y;s=Math.round(s),n=Math.round(n);const o=h.sizes.gridSize;e.direction===S?(s-=o,this.body.animations.play("walkLeft")):e.direction===T?(s+=o,this.body.animations.play("walkRight")):e.direction===x?(n-=o,this.body.animations.play("walkUp")):e.direction===I&&(n+=o,this.body.animations.play("walkDown")),this.facingDirection=e.direction??this.facingDirection,ht(t.level.walls,s,n)&&(this.parent.children.find(m=>m.isSolid&&m.position.x===s&&m.position.y===n)||(this.destinationPosition=D(s,n)))}workOnItemPickup(t){this.itemPickupTime-=t,this.body.animations.play("pickupDown"),this.itemPickupTime<=0&&(this.removeChild(this.itemPickupShell),this.itemPickupShell=null)}}class v extends w{constructor(t,e){super({position:new r(t,e)}),this.position=new r(t,e);const s=new p({resource:f.images.rod,position:new r(0,-2)});this.addChild(s)}onInit(){d.on("HERO_POSITION",this,t=>{H(this.position,t.position)&&this.onCollideWithHero()})}onCollideWithHero(){d.emit("HERO_PICK_UP_ITEM",{position:this.position,image:f.images.rod}),this.destroy()}}const It=new r(c(8),c(4));class St extends b{constructor(t={}){super({}),this.background=new p({resource:f.images.cave,frameSize:new r(h.sizes.canvasWidth,h.sizes.canvasHeight)});const e=new p({resource:f.images.caveGround,frameSize:new r(h.sizes.canvasWidth,h.sizes.canvasHeight)});this.addChild(e);const s=new K(c(3),c(5));this.addChild(s);const n=new v(c(7),c(3));this.addChild(n),this.heroStartPosition=t.heroPosition??It;const o=new A(this.heroStartPosition.x,this.heroStartPosition.y);this.addChild(o)}onInit(){d.on("HERO_EXITS",this,()=>{d.emit("CHANGE_LEVEL",new F({heroPosition:new r(c(11),c(6))}))})}}class Tt extends w{constructor(t,e){super({position:new r(t,e)}),this.isSolid=!0;const s=new p({resource:f.images.shadow,frameSize:new r(32,32),position:new r(-8,-19)});this.addChild(s);const n=new p({resource:f.images.knight,frameSize:new r(32,32),hFrames:2,vFrames:1,position:new r(-8,-20)});this.addChild(n)}}const xt=new r(c(10),c(4));class F extends b{constructor(t={}){super({}),this.background=new p({resource:f.images.sky,frameSize:new r(h.sizes.canvasWidth,h.sizes.canvasHeight)});const e=new p({resource:f.images.ground,frameSize:new r(h.sizes.canvasWidth,h.sizes.canvasHeight)});this.addChild(e);const s=new K(c(10),c(6));this.addChild(s);const n=new v(c(11),c(3));this.addChild(n),this.addChild(new v(c(12),c(3))),this.addChild(new v(c(13),c(3)));const o=new Tt(c(6),c(3));this.addChild(o),this.heroStartPosition=t.heroPosition??xt;const a=new A(this.heroStartPosition.x,this.heroStartPosition.y);this.addChild(a),this.walls.add("64,48"),this.walls.add("64,64"),this.walls.add("64,80"),this.walls.add("80,64"),this.walls.add("80,80"),this.walls.add("112,80"),this.walls.add("128,80"),this.walls.add("144,80"),this.walls.add("160,80")}onInit(){d.on("HERO_EXITS",this,()=>{d.emit("CHANGE_LEVEL",new St({heroPosition:new r(c(4),c(5))}))})}}const O=document.querySelector("#game-canvas"),E=O.getContext("2d"),g=new at({position:new r(0,0)});g.setLevel(new F);const Pt=i=>{var t;g.stepEntry(i,g),(t=g.input)==null||t.update()},vt=()=>{E.clearRect(0,0,O.width,O.height),g.drawBackground(E),E.save(),g.camera&&E.translate(g.camera.position.x,g.camera.position.y),g.drawObjects(E,0,0),E.restore(),g.drawForeground(E)},Lt=new G(Pt,vt);Lt.start();
