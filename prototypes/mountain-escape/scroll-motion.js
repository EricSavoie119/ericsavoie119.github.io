// A single velocity-preserving spring for decorative scroll motion.
// This follows scroll; it never intercepts wheel, touch, keyboard or anchor navigation.
window.scrollMotion = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new Set();
  let position = window.scrollY, target = position, velocity = 0;
  let frame = 0, previous = 0;
  function publish() { listeners.forEach(render => render(position)); }
  function tick(time) {
    frame = 0;
    const dt = Math.min((time - previous) / 1000, .064);
    previous = time;
    // Exact critically damped spring: mass 1, stiffness 100, damping 20.
    // Unlike a restarted easing curve, velocity survives each target change.
    const displacement = position - target;
    const momentum = velocity + 10 * displacement;
    const decay = Math.exp(-10 * dt);
    position = target + (displacement + momentum * dt) * decay;
    velocity = (velocity - 10 * momentum * dt) * decay;
    const settled = Math.abs(position - target) < .05 && Math.abs(velocity) < .05;
    if (settled) { position = target; velocity = 0; }
    publish();
    if (!settled) frame = requestAnimationFrame(tick);
  }
  function follow() {
    target = window.scrollY;
    if (reduced.matches || document.hidden) {
      cancelAnimationFrame(frame); frame = 0;
      position = target; velocity = 0; publish();
    } else if (!frame) {
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  window.addEventListener('scroll', follow, {passive:true});
  document.addEventListener('visibilitychange', follow);
  reduced.addEventListener('change', follow);
  return {
    subscribe(render) { listeners.add(render); render(position); },
    get position() { return position; }
  };
})();
