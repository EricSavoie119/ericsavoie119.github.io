// Local design study: a monochrome instrument panel for Flip Clock Flow.
(() => {
  const chapter=document.querySelector('.clock-chapter');
  chapter.classList.add('mechanical-clock');chapter.id='clock';
  const css=document.createElement('link');css.rel='stylesheet';css.href='clock-mechanical.css?v=3';document.head.append(css);
  const marks=Array.from({length:60},(_,i)=>`<line x1="200" y1="${i%5?18:9}" x2="200" y2="${i%5?24:29}" transform="rotate(${i*6} 200 200)"/>`).join('');
  chapter.innerHTML=`<div class="scene machine-scene">
    <div class="machine-meta"><span>02 / FLIP CLOCK FLOW</span><span>iPHONE & iPAD</span></div>
    <div class="machine-heading"><h2>Flip Clock<br><span>Flow.</span></h2><div class="machine-intro"><p>A clock. A focus timer.<br>Fewer distractions.</p><a href="https://savoie.app/apps/flip-clock-flow/">Explore the app <span aria-hidden="true">↗</span></a></div></div>
    <div class="machine-stage">
      <svg class="machine-dial" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="190"/><circle cx="200" cy="200" r="164"/>${marks}<path d="M200 200 L105 105 M200 200 L200 62"/><circle cx="200" cy="200" r="8"/></svg>
      <div class="clock-photo-hinge"><div class="clock-instrument"><div class="instrument-top"><span>FLIP CLOCK FLOW</span><span class="instrument-status"><i></i> CLOCK & FOCUS</span></div><img class="app-clock-photo" src="../../public/assets/images/apps/Flip Clock Flow/product/landscape-clock.webp" alt="Flip Clock Flow app in landscape, showing its black and white flip clock"><div class="instrument-bottom"><span>LANDSCAPE CLOCK</span><span>24 HOUR / DIGITAL</span></div><span class="case-screw screw-one" aria-hidden="true"></span><span class="case-screw screw-two" aria-hidden="true"></span></div></div>
      <figure class="machine-phone"><img src="../../public/assets/images/apps/Flip Clock Flow/product/focus.webp" alt="Flip Clock Flow app showing a focus session"><figcaption>FOCUS, IN ONE TAP.</figcaption></figure>
      <div class="machine-scale" aria-hidden="true"><span>00</span><i></i><span>30</span><i></i><span>60</span></div>
    </div>
    <div class="machine-features"><span><b>01</b> FLIP CLOCK</span><span><b>02</b> FOCUS TIMER</span><span><b>03</b> LIVE ACTIVITIES</span></div>
    <details class="machine-reference"><summary>Design references ↗</summary><a href="https://dribbble.com/shots/1527504-Braun-AB1-Alarm-Clock" target="_blank" rel="noopener">Braun AB1 · Thuy Gia Nguyen</a><a href="https://dribbble.com/shots/24616888-Monochromatic-watch-UI" target="_blank" rel="noopener">Monochromatic watch UI · Nicolas Solerieu</a></details>
  </div>`;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const hinge=chapter.querySelector('.clock-photo-hinge');
  const photo=chapter.querySelector('.app-clock-photo');
  const face=document.createElement('div');face.className='app-clock-face';photo.replaceWith(face);face.append(photo);
  // Native screenshot: 1200 × 552. These are the six actual tile bounds.
  // Both moving leaves use the original image pixels, including the digit seam.
  const tiles=[92,255,454,617,815,978].map(x=>{
    const tile=document.createElement('span');tile.className='photo-digit';tile.setAttribute('aria-hidden','true');
    Object.assign(tile.style,{left:`${x/12}%`,top:`${166/552*100}%`,width:`${130/12}%`,height:`${192/552*100}%`});
    for(const half of ['upper','lower']){
      const leaf=document.createElement('span');leaf.className=`photo-leaf photo-${half}`;
      leaf.style.backgroundImage=`url("${photo.getAttribute('src')}")`;
      leaf.style.backgroundPosition=`${x/(1200-130)*100}% ${166/(552-192)*100}%`;
      tile.append(leaf);
    }
    face.append(tile);return {upper:tile.firstElementChild,lower:tile.lastElementChild};
  });
  let faceTop=0;
  const clamp=n=>Math.max(0,Math.min(1,n));
  function paintDigits(position){
    const progress=clamp((innerHeight*.95-(faceTop-position))/(innerHeight*.55));
    tiles.forEach(({upper,lower},i)=>{
      const p=reduced.matches?1:clamp((progress-i*.055)/.725);
      // The upper leaf opens first; the lower leaf catches up, like a flip card.
      const top=clamp(p*1.7),bottom=clamp((p-.28)/.72);
      upper.style.transform=`rotateX(${-90*(1-top)}deg)`;
      lower.style.transform=`rotateX(${90*(1-bottom)}deg)`;
    });
  }
  function measureDigits(){hinge.style.transform='none';faceTop=face.getBoundingClientRect().top+scrollY;paintDigits(window.scrollMotion?.position??scrollY);}
  window.addEventListener('load',()=>{measureDigits();window.scrollMotion?.subscribe(paintDigits);});
  window.addEventListener('resize',measureDigits);reduced.addEventListener('change',measureDigits);
  css.addEventListener('load',measureDigits);photo.addEventListener('load',measureDigits);
  // Give the section room to breathe while keeping the BeLoved comparison nearby.
  function picker(){const r=chapter.getBoundingClientRect();document.body.classList.toggle('viewing-clock',r.top<innerHeight*.6&&r.bottom>100);}
  window.addEventListener('scroll',picker,{passive:true});picker();
  css.addEventListener('load',()=>{if(location.hash==='#clock')chapter.scrollIntoView({behavior:'instant'});});
})();
