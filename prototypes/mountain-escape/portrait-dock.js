// A crop of the original photo, not a cutout or a replacement face.
(() => {
  const original = document.querySelector('.brand');
  const dock = original.cloneNode(true);
  dock.classList.add('portrait-brand');
  dock.querySelector('span').remove();
  const slot = document.createElement('span');
  slot.className = 'portrait-slot';
  slot.setAttribute('aria-hidden','true');
  dock.append(slot);
  original.style.visibility='hidden';
  original.setAttribute('aria-hidden','true');
  original.tabIndex=-1;
  document.body.append(dock);
  const portrait = document.createElement('div');
  portrait.className='travelling-portrait';
  portrait.setAttribute('aria-hidden','true');
  const image=document.createElement('img');
  image.src='portrait-cutout.png'; image.alt='';
  portrait.append(image); document.body.append(portrait);
  const sourceAnnotation=document.querySelector('#stage .annotation');
  const follower=document.createElement('div');
  follower.className='portrait-pointer';
  follower.setAttribute('aria-hidden','true');
  follower.append(sourceAnnotation.cloneNode(true));
  document.body.append(follower);
  const landscape=document.querySelector('.landscape');
  const hero=document.querySelector('.hero');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let geometry;
  const clamp=value=>Math.min(1,Math.max(0,value));
  function measure() {
    if(!landscape.naturalWidth) return;
    const w=landscape.clientWidth,h=landscape.clientHeight;
    const scale=Math.max(w/landscape.naturalWidth,h/landscape.naturalHeight);
    const [px,py]=getComputedStyle(landscape).objectPosition.split(' ').map(parseFloat);
    const x=(w-landscape.naturalWidth*scale)*px/100+landscape.naturalWidth*scale*.416;
    const y=(h-landscape.naturalHeight*scale)*py/100+landscape.naturalHeight*scale*.757;
    const target=slot.getBoundingClientRect();
    geometry={x,y,top:hero.getBoundingClientRect().top+window.scrollY,
      targetX:target.left,targetY:target.top};
    // Tight face/shoulder crop. Keep the source pixels visible on enlargement.
    image.style.width='78px';
    image.style.height='90px';
    image.style.left='-13px';
    image.style.top='-15px';
    render(window.scrollMotion.position);
  }
  function render(scroll) {
    if(!geometry) return;
    // The introduction finishes at revealEnd. Leave 48px of reading room before departure.
    const revealEnd=12+Math.min(200,window.innerHeight*.24);
    const p=clamp((scroll-revealEnd-48)/Math.min(420,window.innerHeight*.53));
    const travel=p*p*(3-2*p);
    const fromX=geometry.x-26,fromY=geometry.top+geometry.y-window.scrollY-22;
    const x=fromX+(geometry.targetX-fromX)*travel;
    const y=fromY+(geometry.targetY-fromY)*travel;
    const size=.5+.5*travel;
    portrait.style.opacity=String(clamp(p*5));
    portrait.style.transform=reduce.matches
      ? `translate(${geometry.targetX}px,${geometry.targetY}px)`
      : `translate(${x}px,${y}px) scale(${size})`;
    // Hand off the completed annotation to a viewport overlay so the hero cannot clip it.
    const zoom=1+.6*clamp(scroll/Math.min(320,window.innerHeight*.4));
    const annotationScale=zoom+(1-zoom)*travel;
    follower.style.transform=`translate(${x+26}px,${y+22}px) scale(${annotationScale})`;
    follower.style.opacity=p>0 && !reduce.matches ? String(1-clamp((p-.65)/.3)) : '0';
    sourceAnnotation.style.opacity=p>0 && !reduce.matches ? '0' : String(1-clamp(p*3));
    dock.classList.toggle('is-docked',p>=1);
  }
  landscape.addEventListener('load',measure);
  window.addEventListener('resize',measure);
  reduce.addEventListener('change',measure);
  window.scrollMotion.subscribe(render);
  measure();
})();
