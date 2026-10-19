// Bend only the decorative stroke; leave the label in place.
(() => {
  const svg=document.querySelector('.trail-link svg');
  const brand=document.querySelector('.portrait-brand');
  const label=document.querySelector('.trail-link > span');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const paths=[...svg.querySelectorAll('.unwind-line, .unwind-trail')].map(path=>{
    const length=path.getTotalLength();
    return {path,points:Array.from({length:241},(_,i)=>{
      const p=path.getPointAtLength(length*i/240);return {x:p.x,y:p.y};
    })};
  });
  let geometry;
  const smooth=n=>{const p=Math.min(1,Math.max(0,n));return p*p*(3-2*p);};
  function render(){
    if(!geometry)return;
    const {left,top,scale,edge,above,below,gap}=geometry;
    paths.forEach(({path,points})=>{
      path.setAttribute('d',points.map(({x,y},i)=>{
        const sy=top+y*scale-scrollY;
        const near=reduced.matches ? 1 : smooth((sy-above+65)/55)*smooth((below+65-sy)/55);
        // A gentle S through the narrow gap, widening into the shoulders above
        // and below it. Softplus replaces the hard clamp that made a flat wall.
        const phase=(sy-(above+below)/2)/38;
        const sway=Math.min(4,Math.max(0,gap*.22))*Math.sin(phase);
        const boundary=(edge+sway-left)/scale;
        const softness=9;
        const distance=(boundary-x)/softness;
        const push=softness*(Math.max(0,distance)+Math.log1p(Math.exp(-Math.abs(distance))));
        const dx=x+push*near;
        return `${i?'L':'M'}${dx.toFixed(2)} ${y.toFixed(2)}`;
      }).join(' '));
    });
    svg.dispatchEvent(new Event('contourchange'));
  }
  function measure(){
    const r=svg.getBoundingClientRect(),l=label.getBoundingClientRect();
    // Measure only the word, excluding the empty portrait docking slot.
    const word=document.createRange();word.selectNodeContents(brand.firstChild);
    const b=word.getBoundingClientRect();
    geometry={left:r.left,top:r.top+scrollY,scale:r.width/230,
      edge:(b.right+l.left)/2,gap:l.left-b.right,above:b.top,below:b.bottom};render();
  }
  window.addEventListener('scroll',render,{passive:true});
  window.addEventListener('resize',measure);
  reduced.addEventListener('change',measure);
  document.fonts.ready.then(measure);measure();
})();
