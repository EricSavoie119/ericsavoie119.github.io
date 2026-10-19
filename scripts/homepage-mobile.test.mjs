import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

test('mobile circle clears the fixed name and returns when scrolling up', () => {
  const style = {};
  const events = {};
  const path = { getTotalLength: () => 240, getPointAtLength: x => ({ x, y: 0 }), setAttribute() {} };
  const svg = { querySelectorAll: () => [path], getBoundingClientRect: () => ({ left: 27, top: 150, width: 195 }), dispatchEvent() {} };
  const label = { parentElement: { style, getBoundingClientRect: () => ({left: 20, top:150}) }, getBoundingClientRect: () => ({ left: 50, right:230, top:170, bottom:200 }) };
  const context = {
    scrollY: 0, innerWidth:320, Event, Math,
    matchMedia: query => ({ matches: query.includes('max-width'), addEventListener() {} }),
    document: {
      querySelector: query => query.includes('svg') ? svg : query.includes('span') ? label : { firstChild: {} },
      createRange: () => ({ selectNodeContents() {}, getBoundingClientRect: () => ({ right: 110, top: 20, bottom: 60 }) }),
      fonts: { ready: { then() {} } },
    },
    window: { addEventListener: (name, handler) => { events[name] = handler; } },
  };
  vm.runInNewContext(readFileSync('public/assets/home/cta-swerve.js', 'utf8'), context);
  const initial=style.transform;
  context.scrollY = 100; events.scroll();
  const [,x,size]=style.transform.match(/translateX\(([^p]+)px\) scale\(([^)]+)\)/).map(Number);
  assert.ok(20+(23-20)*size+x >= 126, 'stroke stays beyond name plus 16px');
  assert.ok(20+(234.47826086956522-20)*size+x <= 304, 'fits narrow viewport');
  assert.equal(style.opacity, undefined);
  assert.equal(style.visibility, undefined);
  context.scrollY = 0; events.scroll();
  assert.equal(style.transform, initial);
});

test('touch reveals first, navigates second; keyboard navigates immediately',()=>{
  const handlers={}, docHandlers={},windowHandlers={};
  const win={scrollY:0,addEventListener:(n,f)=>windowHandlers[n]=f};
  const path=()=>({style:{},setAttribute(){},getTotalLength:()=>240,getPointAtLength:x=>({x,y:x}),after(){}});
  const line=path(),tip=path(),svg={addEventListener(){}};
  const link={getBoundingClientRect:()=>({top:150,bottom:250}),querySelector:s=>s==='svg'?svg:s==='.unwind-line'?line:tip,matches:()=>false,addEventListener:(n,f)=>handlers[n]=f,contains:()=>false};
  vm.runInNewContext(readFileSync('public/assets/home/unwind-link.js','utf8'),{
    document:{querySelector:()=>link,createElementNS:path,addEventListener:(n,f)=>docHandlers[n]=f},
    matchMedia:query=>({matches:query.includes('prefers-reduced-motion'),addEventListener(){}}),
    performance:{now:()=>0},requestAnimationFrame:()=>1,cancelAnimationFrame(){},Math,
    window:win,innerHeight:800,
  });
  let blocked=0;
  const touch={pointerType:'touch',detail:1,preventDefault(){blocked++;}};
  handlers.click(touch);assert.equal(blocked,1);
  assert.equal(line.style.strokeDashoffset,'240');
  handlers.click(touch);assert.equal(blocked,1);
  assert.equal(line.style.strokeDashoffset,'240','second tap keeps arrow revealed');
  handlers.click({detail:0,preventDefault(){blocked++;}});assert.equal(blocked,1);
  win.scrollY=200;windowHandlers.scroll();
  assert.equal(line.style.strokeDashoffset,'240','downward scrolling keeps arrow');
  win.scrollY=170;windowHandlers.scroll();
  assert.equal(line.style.strokeDashoffset,'0','upward return restores circle');
  handlers.click(touch);assert.equal(blocked,2,'return resets first tap');
  docHandlers.click({target:{}});
  handlers.click(touch);assert.equal(blocked,3,'outside tap disarms');
});
