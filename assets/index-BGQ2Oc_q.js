var B=Object.defineProperty;var U=(s,e,t)=>e in s?B(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var E=(s,e,t)=>(U(s,typeof e!="symbol"?e+"":e,t),t),G=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var z=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)};var _=(s,e,t)=>(G(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();class r{constructor(e=0,t=0){this.x=e,this.y=t}duplicate(){return new r(this.x,this.y)}}class X{constructor(e,t){E(this,"mainLoop",e=>{if(!this.isRunning)return;let t=e-this.lastFrameTime;for(this.lastFrameTime=e,this.accumulatedTime+=t;this.accumulatedTime>=this.timeStep;)this.update(this.timeStep),this.accumulatedTime-=this.timeStep;this.render(),this.rafId=requestAnimationFrame(this.mainLoop)});this.lastFrameTime=0,this.accumulatedTime=0,this.timeStep=1e3/60,this.update=e,this.render=t,this.rafId=null,this.isRunning=!1}start(){this.isRunning||(this.isRunning=!0,this.rafId=requestAnimationFrame(this.mainLoop))}stop(){this.rafId||cancelAnimationFrame(this.rafId),this.isRunning=!1}}class q{constructor(){E(this,"callbacks",[]);E(this,"nextId",0)}emit(e,t){this.callbacks.forEach(i=>{i.eventName===e&&i.callback(t)})}on(e,t,i){return this.nextId++,this.callbacks.push({id:this.nextId,eventName:e,caller:t,callback:i}),this.nextId}off(e){this.callbacks=this.callbacks.filter(t=>t.id!==e)}unsubscribe(e){this.callbacks=this.callbacks.filter(t=>t.caller!==e)}}const u=new q;class f{constructor({position:e}){this.position=e??new r(0,0),this.children=[],this.parent=null,this.hasBeenInitiated=!1,this.isSolid=!1,this.drawLayer=null}stepEntry(e,t){this.children.forEach(i=>i.stepEntry(e,t)),this.hasBeenInitiated||(this.hasBeenInitiated=!0,this.onInit()),this.step(e,t)}onInit(){}step(e){}draw(e,t,i){const n=t+this.position.x,o=i+this.position.y;this.drawImage(e,n,o),this.getDrawChildrenOrdered().forEach(h=>h.draw(e,n,o))}getDrawChildrenOrdered(){return[...this.children].sort((e,t)=>t.drawLayer==="FLOOR"||e.position.y>t.position.y?1:-1)}drawImage(e,t,i){}destroy(){this.children.forEach(e=>e.destroy()),this.parent&&this.parent.removeChild(this)}addChild(e){e.parent=this,this.children.push(e)}removeChild(e){u.unsubscribe(e),this.children=this.children.filter(t=>t!==e)}}class V extends f{constructor(){super({}),this.offset=new r(0,0),this.onInit()}onInit(){u.on("HERO_POSITION",this,e=>{this.centerPositionOnTarget(e.position)}),u.on("CHANGE_LEVEL",this,e=>{this.centerPositionOnTarget(e.heroStartPosition)})}centerPositionOnTarget(e){this.position=new r(-e.x+152,-e.y+82)}}const a={baseUrl:"Project-Kazamata",assetsPath:"assets",keys:{upKeys:["ArrowUp","KeyW"],downKeys:["ArrowDown","KeyS"],leftKeys:["ArrowLeft","KeyA"],rightKeys:["ArrowRight","KeyD"]},sizes:{gridSize:16,canvasWidth:320,canvasHeight:180}},P="LEFT",S="RIGHT",T="UP",I="DOWN";class Y{constructor(){this.heldDirections=[],document.addEventListener("keydown",e=>{a.keys.upKeys.includes(e.code)?this.onKeyPressed(T):a.keys.downKeys.includes(e.code)?this.onKeyPressed(I):a.keys.leftKeys.includes(e.code)?this.onKeyPressed(P):a.keys.rightKeys.includes(e.code)&&this.onKeyPressed(S)}),document.addEventListener("keyup",e=>{a.keys.upKeys.includes(e.code)?this.onKeyReleased(T):a.keys.downKeys.includes(e.code)?this.onKeyReleased(I):a.keys.leftKeys.includes(e.code)?this.onKeyReleased(P):a.keys.rightKeys.includes(e.code)&&this.onKeyReleased(S)}),document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("leftButton"),t=document.getElementById("rightButton"),i=document.getElementById("upButton"),n=document.getElementById("downButton"),o=(h,c)=>{h.addEventListener("mousedown",()=>this.onKeyPressed(c)),h.addEventListener("mouseup",()=>this.onKeyReleased(c)),h.addEventListener("touchstart",l=>{l.preventDefault(),this.onKeyPressed(c)}),h.addEventListener("touchend",l=>{l.preventDefault(),this.onKeyReleased(c)})};o(e,P),o(t,S),o(i,T),o(n,I)})}get direction(){return this.heldDirections[0]}onKeyPressed(e){this.heldDirections.includes(e)||this.heldDirections.unshift(e)}onKeyReleased(e){const t=this.heldDirections.indexOf(e);t>-1&&this.heldDirections.splice(t,1)}}class ${constructor(){this.toLoad={hero:"sprites/hero-sheet.png",shadow:"sprites/shadow.png",rod:"sprites/rod.png",exit:"sprites/exit.png",sky:"sprites/sky.png",ground:"sprites/ground.png",cave:"sprites/cave.png",caveGround:"sprites/cave-ground.png",knight:"sprites/knight-sheet-1.png",textBox:"sprites/text-box.png"},this.images={};var e="";try{e="/"+a.baseUrl+"/"+a.assetsPath+"/"}catch(t){console.log(t),e="/"+a.baseUrl+"/"+a.assetsPath+"/"}console.log(`"${e}"`),Object.keys(this.toLoad).forEach(t=>{const i=new Image;i.src=e+this.toLoad[t],this.images[t]={image:i,isLoaded:!1},i.onload=()=>{this.images[t].isLoaded=!0}})}}const p=new $;class m extends f{constructor({resource:e,frameSize:t,hFrames:i,vFrames:n,frame:o,scale:h,position:c,animations:l}){super({position:c??new r(0,0)}),this.resource=e,this.frameSize=t??new r(a.sizes.gridSize,a.sizes.gridSize),this.hFrames=i??1,this.vFrames=n??1,this.frame=o??0,this.frameMap=new Map,this.scale=h??1,this.position=c??new r(0,0),this.animations=l??null,this.buildFrameMap()}buildFrameMap(){let e=0;for(let t=0;t<this.vFrames;t++)for(let i=0;i<this.hFrames;i++)this.frameMap.set(e,new r(i*this.frameSize.x,t*this.frameSize.y)),e++}step(e){this.animations&&(this.animations.step(e),this.frame=this.animations.frame)}drawImage(e,t,i){if(!this.resource.isLoaded)return;let n=0,o=0;const h=this.frameMap.get(this.frame);h&&(n=h.x,o=h.y);const c=this.frameSize.x,l=this.frameSize.y;e.drawImage(this.resource.image,n,o,c,l,t,i,c*this.scale,l*this.scale)}}class j extends f{constructor(){super({position:new r(0,1)}),this.items=[],this.nextId=0,this.renderInventory()}renderInventory(){this.children.forEach(e=>e.destroy()),this.items.forEach((e,t)=>{const i=new m({resource:e.image,position:new r(t*12,0)});this.addChild(i)})}removeFromInventory(e){this.items=this.items.filter(t=>t.id!==e),this.renderInventory()}onInit(){u.on("HERO_PICK_UP_ITEM",this,e=>{this.items.push({id:this.nextId++,image:e.image}),console.log(this.items),this.renderInventory()})}}var k,R;class J extends f{constructor(){super({position:new r(32,112)});z(this,k);this.content="Hallo mijn naam is Gamemeneer en in Minecraft bouw ik boten.",this.backdrop=new m({resource:p.images.textBox,frameSize:new r(256,64)})}drawImage(t,i,n){this.backdrop.drawImage(t,i,n),_(this,k,R).call(this,t,i,n)}}k=new WeakSet,R=function(t,i,n){t.font="10px fontRetroGaming",t.textAlign="left",t.textBaseline="top",t.fillStyle="#fff";const o=250,h=20,c=10,l=12;let C=this.content.split(" "),v="";for(let x=0;x<C.length;x++){let D=v+C[x]+" ";t.measureText(D).width>o&&x>0?(t.fillText(v,i+c,n+l),v=C[x]+" ",n+=h):v=D}t.fillText(v,i+c,n+l)};class Q extends f{constructor(){super({}),this.level=null,this.input=new Y,this.camera=new V,this.inventory=new j,this.textBox=new J}onInit(){this.inventory.onInit(),u.on("CHANGE_LEVEL",this,e=>{this.setLevel(e)})}setLevel(e){this.level&&this.level.destroy(),this.level=e,this.addChild(this.level)}drawBackground(e){var t;(t=this.level)==null||t.background.drawImage(e,0,0)}drawForeground(e){this.inventory.draw(e,this.inventory.position.x,this.inventory.position.y),this.textBox.draw(e,0,0)}}class M extends f{constructor(){super({}),this.background=null,this.walls=new Set}}const d=s=>s*a.sizes.gridSize,Z=(s,e,t)=>{e=Math.round(e),t=Math.round(t);const i=`${e},${t}`;return!s.has(i)},H=(s,e)=>{const t=a.sizes.gridSize,i=Math.round(s/t)*t,n=Math.round(e/t)*t;return new r(i,n)};function ee(s,e,t){let i=e.x-s.position.x,n=e.y-s.position.y,o=Math.sqrt(i**2+n**2);if(o===0)return o;if(o<=t)return s.position.x=e.x,s.position.y=e.y,0;{Math.abs(i)<=t&&(s.position.x=e.x),Math.abs(n)<=t&&(s.position.y=e.y);let h=i/o,c=n/o;s.position.x+=h*t,s.position.y+=c*t,i=e.x-s.position.x,n=e.y-s.position.y,o=Math.sqrt(i**2+n**2)}return o}function F(s,e,t=void 0,i=1){e.x=Math.round(e.x),e.y=Math.round(e.y),t||(t=e);const n=Math.round(e.x),o=Math.round(e.y);return Math.abs(s.x-n)<=i&&Math.abs(s.y-o)<=i&&Math.abs(s.y-o)<=Math.abs(s.y-t.y)&&Math.abs(s.x-n)<=Math.abs(s.x-t.x)}class A extends f{constructor(e,t){super({position:new r(e,t)}),this.drawLayer="FLOOR",this.addChild(new m({resource:p.images.exit})),this.lastPlayerPosition=new r(0,0)}step(e,t){}onInit(){u.on("HERO_POSITION",this,e=>{F(this.position,e.position,this.lastPlayerPosition)&&u.emit("HERO_EXITS"),this.lastPlayerPosition=new r(e.position.x,e.position.y)})}}class te{constructor(e){this.patterns=e,this.activeKey=Object.keys(e)[0]}get frame(){return this.patterns[this.activeKey].frame}play(e,t=0){this.activeKey!==e&&(this.activeKey=e,this.patterns[this.activeKey].currentTime=t)}step(e){this.patterns[this.activeKey].step(e)}}const O=(s=0)=>({duration:400,frames:[{time:0,frame:s+1}]}),b=(s=0)=>({duration:400,frames:[{time:0,frame:s+1},{time:100,frame:s},{time:200,frame:s+1},{time:300,frame:s+2}]}),ie=O(0),se=O(3),ne=O(6),oe=O(9),re=b(0),ae=b(3),he=b(6),de=b(9),ce={duration:400,frames:[{time:0,frame:12}]};class w{constructor(e){this.currentTime=0,this.animationConfig=e,this.duration=e.duration}get frame(){const{frames:e}=this.animationConfig;for(let t=e.length-1;t>=0;t--)if(this.currentTime>=e[t].time)return e[t].frame;throw"Time is less than 0 in FrameIndexPattern"}step(e){this.currentTime+=e,this.currentTime=this.currentTime%this.duration}}class N extends f{constructor(e,t){super({position:new r(e,t)});const i=new m({resource:p.images.shadow,position:new r(-8,-19),frameSize:new r(32,32)});this.addChild(i),this.body=new m({resource:p.images.hero,hFrames:3,vFrames:8,frame:1,frameSize:new r(32,32),position:new r(-8,-20),animations:new te({walkDown:new w(re),walkUp:new w(he),walkLeft:new w(de),walkRight:new w(ae),standDown:new w(ie),standUp:new w(ne),standLeft:new w(oe),standRight:new w(se),pickupDown:new w(ce)})}),this.addChild(this.body),this.facingDirection=I,this.destinationPosition=this.position.duplicate(),this.itemPickupTime=0,this.itemPickupShell=null,u.on("HERO_PICK_UP_ITEM",this,n=>{this.onPickUpItem(n)})}step(e,t){if(this.itemPickupTime>0){this.workOnItemPickup(e);return}ee(this,this.destinationPosition,1)<=1&&this.tryMove(t),this.tryEmitPosition()}tryEmitPosition(){this.lastPosition&&this.lastPosition.x===this.position.x&&this.lastPosition.y===this.position.y||(u.emit("HERO_POSITION",{position:this.position,initialPosition:!this.lastPosition}),this.lastPosition=this.position.duplicate())}onPickUpItem({image:e,position:t}){const i=this.position.duplicate();this.position=H(i.x,i.y),this.destinationPosition=this.position.duplicate(),this.itemPickupTime=500,this.itemPickupShell=new f({}),this.itemPickupShell.addChild(new m({resource:e,position:new r(0,-18)})),this.addChild(this.itemPickupShell)}tryMove(e){const{input:t}=e;if(!t)return;if(!t.direction){this.facingDirection===P?this.body.animations.play("standLeft"):this.facingDirection===S?this.body.animations.play("standRight"):this.facingDirection===T?this.body.animations.play("standUp"):this.facingDirection===I&&this.body.animations.play("standDown");return}let i=this.destinationPosition.x,n=this.destinationPosition.y;i=Math.round(i),n=Math.round(n);const o=a.sizes.gridSize;t.direction===P?(i-=o,this.body.animations.play("walkLeft")):t.direction===S?(i+=o,this.body.animations.play("walkRight")):t.direction===T?(n-=o,this.body.animations.play("walkUp")):t.direction===I&&(n+=o,this.body.animations.play("walkDown")),this.facingDirection=t.direction??this.facingDirection,Z(e.level.walls,i,n)&&(this.parent.children.find(l=>l.isSolid&&l.position.x===i&&l.position.y===n)||(this.destinationPosition=H(i,n)))}workOnItemPickup(e){this.itemPickupTime-=e,this.body.animations.play("pickupDown"),this.itemPickupTime<=0&&(this.removeChild(this.itemPickupShell),this.itemPickupShell=null)}}class L extends f{constructor(e,t){super({position:new r(e,t)}),this.position=new r(e,t);const i=new m({resource:p.images.rod,position:new r(0,-2)});this.addChild(i)}onInit(){u.on("HERO_POSITION",this,e=>{F(this.position,e.position)&&this.onCollideWithHero()})}onCollideWithHero(){u.emit("HERO_PICK_UP_ITEM",{position:this.position,image:p.images.rod}),this.destroy()}}const le=new r(d(8),d(4));class ue extends M{constructor(e={}){super({}),this.background=new m({resource:p.images.cave,frameSize:new r(a.sizes.canvasWidth,a.sizes.canvasHeight)});const t=new m({resource:p.images.caveGround,frameSize:new r(a.sizes.canvasWidth,a.sizes.canvasHeight)});this.addChild(t);const i=new A(d(3),d(5));this.addChild(i);const n=new L(d(7),d(3));this.addChild(n),this.heroStartPosition=e.heroPosition??le;const o=new N(this.heroStartPosition.x,this.heroStartPosition.y);this.addChild(o)}onInit(){u.on("HERO_EXITS",this,()=>{u.emit("CHANGE_LEVEL",new W({heroPosition:new r(d(11),d(6))}))})}}class me extends f{constructor(e,t){super({position:new r(e,t)}),this.isSolid=!0;const i=new m({resource:p.images.shadow,frameSize:new r(32,32),position:new r(-8,-19)});this.addChild(i);const n=new m({resource:p.images.knight,frameSize:new r(32,32),hFrames:2,vFrames:1,position:new r(-8,-20)});this.addChild(n)}}const pe=new r(d(10),d(4));class W extends M{constructor(e={}){super({}),this.background=new m({resource:p.images.sky,frameSize:new r(a.sizes.canvasWidth,a.sizes.canvasHeight)});const t=new m({resource:p.images.ground,frameSize:new r(a.sizes.canvasWidth,a.sizes.canvasHeight)});this.addChild(t);const i=new A(d(10),d(6));this.addChild(i);const n=new L(d(11),d(3));this.addChild(n),this.addChild(new L(d(12),d(3))),this.addChild(new L(d(13),d(3)));const o=new me(d(6),d(3));this.addChild(o),this.heroStartPosition=e.heroPosition??pe;const h=new N(this.heroStartPosition.x,this.heroStartPosition.y);this.addChild(h),this.walls.add("64,48"),this.walls.add("64,64"),this.walls.add("64,80"),this.walls.add("80,64"),this.walls.add("80,80"),this.walls.add("112,80"),this.walls.add("128,80"),this.walls.add("144,80"),this.walls.add("160,80")}onInit(){u.on("HERO_EXITS",this,()=>{u.emit("CHANGE_LEVEL",new ue({heroPosition:new r(d(4),d(5))}))})}}const K=document.querySelector("#game-canvas"),g=K.getContext("2d"),y=new Q({position:new r(0,0)});y.setLevel(new W);const fe=s=>{y.stepEntry(s,y)},we=()=>{g.clearRect(0,0,K.width,K.height),y.drawBackground(g),g.save(),y.camera&&g.translate(y.camera.position.x,y.camera.position.y),y.draw(g,0,0),g.restore(),y.drawForeground(g)},ye=new X(fe,we);ye.start();
