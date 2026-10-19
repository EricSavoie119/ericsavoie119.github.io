// Bend only the decorative stroke; leave the label in place.
(() => {
  const svg=document.querySelector('.trail-link svg');
  const brand=document.querySelector('.portrait-brand');
  const label=document.querySelector('.trail-link > span');
  const link=label.parentElement;
  const compact=matchMedia('(max-width: 700px)');
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
    // Reserve the entire word plus breathing room. Move the lettering and
    // contour together, easing in before contact and out only after passing.
    const {minX,maxX,minY,maxY,linkLeft,linkTop,wordRight,viewport}=geometry;
    const enter=1-smooth((minY-scrollY-below-24)/180);
    const leave=smooth((maxY-scrollY-above+24)/180);
    const proximity=compact.matches ? enter*leave : 0;
    // A broad bowed path keeps moving sideways through the passing phase,
    // rather than finishing a sidestep and then travelling in a straight lane.
    const passage=Math.min(1,Math.max(0,(scrollY-(minY-below-24))/(maxY-minY+below-above+48)));
    const bow=reduced.matches ? 0 : 12*Math.sin(Math.PI*passage)**2;
    const available=viewport-wordRight-44;
    const fit=Math.min(1,available/(maxX-minX));
    const size=1-(1-fit)*proximity;
    const shift=(Math.max(0,wordRight+16-(linkLeft+(minX-linkLeft)*size))+bow)*proximity;
    link.style.transformOrigin='0 0';
    link.style.transform=compact.matches ? `translateX(${shift}px) scale(${size})` : '';
    paths.forEach(({path,points})=>{
      path.setAttribute('d',points.map(({x,y},i)=>{
        const sy=top+y*scale-scrollY;
        const near=compact.matches ? 0 : reduced.matches ? 1 : smooth((sy-above+65)/55)*smooth((below+65-sy)/55);
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
    link.style.transform='';
    const r=svg.getBoundingClientRect(),l=label.getBoundingClientRect();
    const box=link.getBoundingClientRect();
    // Measure only the word, excluding the empty portrait docking slot.
    const word=document.createRange();word.selectNodeContents(brand.firstChild);
    const b=word.getBoundingClientRect();
    const points=paths.flatMap(p=>p.points);
    const scale=r.width/230;
    geometry={left:r.left,top:r.top+scrollY,scale,
      minX:Math.min(l.left,r.left+Math.min(...points.map(p=>p.x))*scale)-4,
      maxX:Math.max(l.right,r.left+Math.max(...points.map(p=>p.x))*scale)+4,
      minY:Math.min(l.top,r.top+Math.min(...points.map(p=>p.y))*scale)+scrollY,
      maxY:Math.max(l.bottom,r.top+250*scale)+scrollY,
      linkLeft:box.left,linkTop:box.top+scrollY,wordRight:b.right,viewport:innerWidth,
      edge:(b.right+l.left)/2,gap:l.left-b.right,above:b.top,below:b.bottom};render();
  }
  window.addEventListener('scroll',render,{passive:true});
  window.addEventListener('resize',measure);
  reduced.addEventListener('change',measure);
  document.fonts.ready.then(measure);measure();
})();
