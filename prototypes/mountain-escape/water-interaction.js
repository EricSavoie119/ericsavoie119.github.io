// Decorative water response, isolated from the reversible scroll transforms on each image.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const waters = [...document.querySelectorAll('.screens')].map(surface => {
    const wake = document.createElement('div');
    wake.className = 'water-wake';
    wake.setAttribute('aria-hidden', 'true');
    const rings = Array.from({length:3}, () => {
      const ring = document.createElement('span'); wake.append(ring); return ring;
    });
    surface.prepend(wake);
    if (surface.classList.contains('ruler-screens')) {
      const reflection = surface.querySelector('.prop').cloneNode();
      reflection.removeAttribute('class');
      reflection.removeAttribute('style');
      reflection.className = 'water-reflection';
      reflection.alt = '';
      reflection.setAttribute('aria-hidden', 'true');
      surface.prepend(reflection);
    }
    const state = {surface, x:0, y:0, vx:0, vy:0, tx:0, ty:0, animations:[]};
    function ripple() {
      state.animations.forEach(animation => animation.cancel());
      state.animations = rings.map((ring, index) => ring.animate(
        reduced.matches
          ? [{opacity:0}, {opacity:.12}, {opacity:0}]
          : [{transform:'scale(.9)',opacity:0}, {transform:'scale(1)',opacity:.3,offset:.2}, {transform:'scale(1.45)',opacity:0}],
        {duration:reduced.matches ? 200 : 1400,delay:reduced.matches ? 0 : index * 160,easing:'cubic-bezier(.23,1,.32,1)'}
      ));
    }
    surface.addEventListener('pointerenter', event => {
      if (fine.matches && event.pointerType !== 'touch') ripple();
    });
    surface.addEventListener('pointermove', event => {
      if (!fine.matches || reduced.matches || event.pointerType === 'touch') return;
      const bounds = surface.getBoundingClientRect();
      state.tx = Math.max(-1,Math.min(1,2 * (event.clientX-bounds.left)/bounds.width-1));
      state.ty = Math.max(-1,Math.min(1,2 * (event.clientY-bounds.top)/bounds.height-1));
      start();
    });
    surface.addEventListener('pointerdown', ripple);
    const settle = () => { state.tx = state.ty = 0; start(); };
    surface.addEventListener('pointerleave', settle);
    surface.addEventListener('pointercancel', settle);
    return state;
  });
  let frame = 0, previous = 0;
  function start() {
    if (!frame) { previous = performance.now(); frame = requestAnimationFrame(tick); }
  }
  function tick(time) {
    frame = 0;
    const dt = Math.min(.064,(time-previous)/1000);
    previous = time;
    let moving = false;
    waters.forEach(state => {
      for (const axis of ['x','y']) {
        const v = 'v'+axis, target = 't'+axis;
        const displacement = state[axis]-state[target];
        const momentum = state[v]+10*displacement, decay = Math.exp(-10*dt);
        state[axis] = state[target]+(displacement+momentum*dt)*decay;
        state[v] = (state[v]-10*momentum*dt)*decay;
        if (Math.abs(state[axis]-state[target])<.001 && Math.abs(state[v])<.001) {
          state[axis]=state[target]; state[v]=0;
        } else moving = true;
      }
      state.surface.style.transform = reduced.matches ? 'none' :
        `perspective(1000px) translate(${state.x*5}px,${state.y*4}px) rotateX(${-state.y*3}deg) rotateY(${state.x*4}deg)`;
    });
    if (moving) frame = requestAnimationFrame(tick);
  }
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    waters.forEach(state => {
      state.x=state.y=state.vx=state.vy=state.tx=state.ty=0;
      state.surface.style.transform='none';
      state.animations.forEach(animation=>animation.cancel());
    });
  }
  reduced.addEventListener('change', reset);
  fine.addEventListener('change', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', () => { if(document.hidden) reset(); });
})();
