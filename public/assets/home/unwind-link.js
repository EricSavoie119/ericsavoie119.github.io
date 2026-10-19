// Unspool along fixed paths. Never interpolate a contour through the label.
(() => {
  const link = document.querySelector('.trail-link');
  const line = link.querySelector('.unwind-line'), tip = link.querySelector('.unwind-tip');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const trail = document.createElementNS('http://www.w3.org/2000/svg','path');
  trail.setAttribute('class','unwind-trail');
  // Continue the circle's tangent through the seam: its first handle is (-55,28),
  // so the outgoing handle is on the opposite ray from (8,97). No angular join.
  trail.setAttribute('d','M8 97 C39.5 131.5 128 91 137 116 C148 146 70 141 89 173 C103 196 183 177 192 228');
  line.after(trail);
  let loopLength = line.getTotalLength(), trailLength = trail.getTotalLength();
  line.style.strokeDasharray = `${loopLength} ${loopLength}`;
  trail.style.strokeDasharray = `${trailLength} ${trailLength}`;
  tip.setAttribute('d','M-12 -10 Q-2 -3 0 0 Q5 -11 12 -16');
  let position=0, velocity=0, target=0, frame=0, previous=0, hovering=false;
  function paint() {
    const progress = Math.max(0, Math.min(1,position));
    line.style.strokeDashoffset = String(loopLength * progress);
    line.style.opacity = progress === 1 ? '0' : '1';
    trail.style.strokeDashoffset = String(trailLength * (1-progress));
    trail.style.opacity = progress === 0 ? '0' : '1';
    const distance = trailLength * progress;
    const point = trail.getPointAtLength(distance);
    const before = trail.getPointAtLength(Math.max(0,distance-1));
    const angle = Math.atan2(point.y-before.y,point.x-before.x)*180/Math.PI-80;
    tip.setAttribute('transform',`translate(${point.x} ${point.y}) rotate(${angle})`);
    tip.setAttribute('opacity',String(Math.max(0,Math.min(1,(progress-.15)/.25))));
  }
  function tick(time) {
    frame=0;
    const dt=Math.min(.064,(time-previous)/1000); previous=time;
    const displacement=position-target, momentum=velocity+10*displacement, decay=Math.exp(-10*dt);
    position=target+(displacement+momentum*dt)*decay;
    velocity=(velocity-10*momentum*dt)*decay;
    const settled=Math.abs(position-target)<.001 && Math.abs(velocity)<.001;
    if(settled){position=target;velocity=0;}
    paint();
    if(!settled) frame=requestAnimationFrame(tick);
  }
  function update() {
    target=hovering || link.matches(':focus-visible') ? 1 : 0;
    if(reduced.matches || link.matches(':focus-visible')) {
      cancelAnimationFrame(frame);frame=0;position=target;velocity=0;paint();
    } else if(!frame){previous=performance.now();frame=requestAnimationFrame(tick);}
  }
  link.addEventListener('pointerenter',e=>{if(fine.matches && e.pointerType!=='touch'){hovering=true;update();}});
  link.addEventListener('pointerleave',()=>{hovering=false;update();});
  link.addEventListener('pointercancel',()=>{hovering=false;update();});
  link.addEventListener('focus',update);
  link.addEventListener('blur',update);
  reduced.addEventListener('change',update);
  fine.addEventListener('change',()=>{hovering=false;update();});
  link.querySelector('svg').addEventListener('contourchange',()=>{
    loopLength=line.getTotalLength();trailLength=trail.getTotalLength();
    line.style.strokeDasharray=`${loopLength} ${loopLength}`;
    trail.style.strokeDasharray=`${trailLength} ${trailLength}`;paint();
  });
  paint();
})();
