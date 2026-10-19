const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function simulation(hz) {
  let now = 0, id = 0;
  const frames = new Map(), events = {};
  const reduced = {matches:false, addEventListener:(name, fn) => events.reduce = fn};
  const window = {scrollY:0, addEventListener:(name, fn) => events[name] = fn};
  const context = {
    window, document:{hidden:false,addEventListener(){}}, matchMedia:() => reduced,
    performance:{now:() => now},
    requestAnimationFrame:fn => { frames.set(++id, fn); return id; },
    cancelAnimationFrame:key => frames.delete(key)
  };
  vm.runInNewContext(readFileSync(__dirname + '/scroll-motion.js','utf8'), context);
  const step = () => {
    now += 1000 / hz;
    const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(now));
  };
  window.scrollY = 120; events.scroll();
  step(); const first = window.scrollMotion.position;
  step(); assert(window.scrollMotion.position > first, 'Must continue between wheel ticks');
  for (let i=2;i<hz/10;i++) step();
  const before = window.scrollMotion.position;
  window.scrollY = 240; events.scroll();
  assert.equal(window.scrollMotion.position,before,'New input must not jump position');
  step(); assert(window.scrollMotion.position > before,'Retarget must keep moving');
  for (let i=0;i<hz*3;i++) step();
  assert.equal(window.scrollMotion.position,240);
  assert.equal(frames.size,0,'Idle loop must stop');
  window.scrollY = 20; events.scroll();
  for (let i=0;i<hz*3;i++) step();
  assert.equal(window.scrollMotion.position,20,'Reverse must settle correctly');
  reduced.matches = true; window.scrollY = 500; events.reduce();
  assert.equal(window.scrollMotion.position,500,'Reduced motion follows directly');
  return first;
}
for (const hz of [60,120]) simulation(hz);
console.log('PASS: continuous motion, retargeting, reversal, settling and reduced motion at 60/120Hz');
