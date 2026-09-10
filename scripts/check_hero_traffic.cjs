// Exercise the actual animation closure with deterministic time, not a parallel model.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/hero-trajectories.js'), 'utf8');
function setup(width, seed, reduced = false) {
  let now = 0, raf = null, nextId = 0;
  const timers = new Map(), events = {}, ids = new WeakMap(), draws = [];
  const classes = new Set();
  const nodes = {};
  for (const name of ['hero-perturb', 'hero-reset', 'hero-feedback']) nodes[name] = {textContent: '',addEventListener:(nameEvent, fn) => {events[name + ':' + nameEvent] = fn;}};
  const ctx = new Proxy({clearRect:()=>draws.push('clear'),arc:()=>draws.push('arc')}, {get:(target,key)=>key in target?target[key]:()=>{}});
  const canvas = {getContext:()=>ctx,getBoundingClientRect:()=>({width,height:108}),parentElement:{style:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)}}};
  const math = Object.create(Math);math.random = () => {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const sandbox = {Math:math,performance:{now:()=>now},document:{querySelector:()=>canvas,getElementById:id=>nodes[id],documentElement:{classList:{contains:()=>false}}},MutationObserver:class{observe(){}},console};
  const windowEvents = {};
  sandbox.window={devicePixelRatio:1,scrollY:0,matchMedia:()=>({matches:reduced}),addEventListener:(name,fn)=>{windowEvents[name]=fn;},requestAnimationFrame:fn=>{raf=fn;return 1;},cancelAnimationFrame:()=>{raf=null;},setTimeout:(fn,delay)=>{timers.set(++nextId,{fn,end:now+delay});return nextId;},clearTimeout:id=>timers.delete(id)};
  const ending = source.lastIndexOf('})();');
  vm.runInNewContext(source.slice(0,ending)+'globalThis.probe={lanes:()=>lanes};\n'+source.slice(ending),sandbox);
  const snapshot=()=>sandbox.probe.lanes().map(lane=>lane.veh.map(car=>{if(!ids.has(car))ids.set(car,++nextId);return{id:ids.get(car),x:car.x,v:car.v,size:car.size,brake:!!car.demoBrake};}));
  return {snapshot,perturb:()=>events['hero-perturb:click'](),reset:()=>events['hero-reset:click'](),scroll:()=>{sandbox.window.scrollY+=500;windowEvents.scroll();},feedback:()=>nodes['hero-feedback'].textContent,draws,
    tick:(ms=1000/60)=>{now+=ms;for(const [id,t] of [...timers])if(t.end<=now){timers.delete(id);t.fn();}const next=raf;raf=null;if(next)next(now);}};
}
let smallestGap = Infinity, slowestReleased = Infinity, recoveryCount = 0;
for(const width of [300,390,768])for(const seed of [1,7,42,991]) {
  const s=setup(width,seed);
  for(let i=0;i<60;i++)s.tick();
  const baseline=s.snapshot(), order=baseline.map(l=>l.map(v=>v.id));
  s.perturb();const braked=s.snapshot().map(l=>l.find(v=>v.brake).id);
  let distance=braked.map(()=>0), previous=s.snapshot();
  for(let frame=0;frame<3600;frame++) {
    if(frame===30||frame===180)s.scroll();
    s.draws.length=0;s.tick(frame%100===0?90:1000/60);
    const lanes=s.snapshot();
    for(let li=0;li<lanes.length;li++) {
      const map=new Map(lanes[li].map(v=>[v.id,v]));
      for(let j=0;j<order[li].length;j++) {
        const a=map.get(order[li][j]),b=map.get(order[li][(j+1)%order[li].length]);
        const separation=(b.x-a.x+width)%width;
        smallestGap=Math.min(smallestGap,separation);
        assert.ok(separation>=a.size+b.size+1.2-.001,`Heads overlap: width=${width}, seed=${seed}, frame=${frame}, separation=${separation}`);
        const before=previous[li].find(v=>v.id===a.id);
        const travel=(a.x-before.x+width)%width;
        const oldLeader=previous[li].find(v=>v.id===b.id);
        assert.ok(travel<=(oldLeader.x-before.x+width)%width+.001,'A follower crossed its leader');
        assert.ok(Number.isFinite(a.v)&&a.v>=0);
      }
      if(frame>360){const car=map.get(braked[li]);const before=previous[li].find(v=>v.id===car.id);distance[li]+=(car.x-before.x+width)%width;}
    }
    assert.equal(s.draws[0],'clear','Every animated frame clears stale pixels before drawing current trails');
    previous=lanes;
  }
  distance.forEach(d=>assert.ok(d>width*2,'The braked vehicle must resume and complete multiple loops'));
  s.snapshot().forEach(lane=>{const car=lane.find(v=>braked.includes(v.id));slowestReleased=Math.min(slowestReleased,car.v);assert.ok(car.v>5,'No permanently held vehicles');recoveryCount++;});
  s.perturb();for(let i=0;i<20;i++)s.tick();s.perturb();for(let i=0;i<500;i++)s.tick();assert.match(s.feedback(),/released|freely/);
  s.perturb();s.reset();assert.equal(s.feedback(),'Animation reset.');assert.ok(s.snapshot().every(l=>l.every(v=>!v.brake)));
}
const reduced=setup(390,1,true);reduced.perturb();const still=JSON.stringify(reduced.snapshot());reduced.tick(10000);assert.equal(JSON.stringify(reduced.snapshot()),still);reduced.reset();
const result={cases:12,simulatedSecondsPerCase:60,minCenterSeparation:smallestGap,minReleasedSpeed:slowestReleased,recoveredVehicles:recoveryCount,noCrossing:true,noStalePixels:true,repeatedClicks:true,resetDuringHold:true,reducedMotion:true};
console.log(JSON.stringify(result,null,2));
