// Reversible scroll details for the app screenshots and measuring strip.
(() => {
  const clock=document.querySelector('.app-clock-face');
  const ruler=document.querySelector('.survey-ruler');
  const tape=ruler?.querySelector('.survey-tape');
  if(!clock || !ruler || !tape)return;
  const photo=clock.querySelector('img');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=n=>Math.max(0,Math.min(1,n));
  // Source image is 1200 × 552. Animate its actual digit pixels in two leaves.
  const tiles=[92,255,454,617,815,978].map(x=>{
    const tile=document.createElement('span');
    tile.className='photo-digit';tile.setAttribute('aria-hidden','true');
    Object.assign(tile.style,{left:`${x/12}%`,top:`${166/552*100}%`,width:`${130/12}%`,height:`${192/552*100}%`});
    const leaves=['upper','lower'].map(half=>{
      const leaf=document.createElement('span');leaf.className=`photo-leaf photo-${half}`;
      leaf.style.backgroundImage=`url("${photo.getAttribute('src')}")`;
      leaf.style.backgroundPosition=`${x/1070*100}% ${166/360*100}%`;
      tile.append(leaf);return leaf;
    });
    clock.append(tile);return leaves;
  });
  let clockTop=0,rulerTop=0,rulerHeight=1,travel=0,viewportHeight=innerHeight;
  function paint(position){
    const progress=clamp((viewportHeight*.95-(clockTop-position))/(viewportHeight*.55));
    tiles.forEach(([upper,lower],i)=>{
      const p=reduced.matches?1:clamp((progress-i*.055)/.725);
      upper.style.transform=`rotateX(${-90*(1-clamp(p*1.7))}deg)`;
      lower.style.transform=`rotateX(${90*(1-clamp((p-.28)/.72))}deg)`;
    });
    const rulerProgress=clamp((position+viewportHeight-rulerTop)/(rulerHeight+viewportHeight));
    tape.style.transform=reduced.matches?'none':`translateX(${-rulerProgress*travel}px)`;
  }
  function measure(){
    viewportHeight=innerHeight;
    clockTop=clock.getBoundingClientRect().top+scrollY;
    rulerTop=ruler.getBoundingClientRect().top+scrollY;
    rulerHeight=ruler.offsetHeight;
    travel=Math.max(0,Math.min(innerWidth*3,tape.scrollWidth-innerWidth*1.6-200));
    paint(window.scrollMotion?.position??scrollY);
  }
  measure();
  window.scrollMotion?.subscribe(paint);
  window.addEventListener('load',measure,{once:true});
  window.addEventListener('resize',measure);
  photo.addEventListener('load',measure);
  document.fonts.ready.then(measure);
  reduced.addEventListener('change',measure);
})();
