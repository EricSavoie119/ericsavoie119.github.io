// Local design study: a red drafting sheet with an extending measuring strip.
(() => {
  const chapter=document.querySelector('.ruler-chapter');chapter.classList.add('survey-ruler');chapter.id='ruler';
  const css=document.createElement('link');css.rel='stylesheet';css.href='ruler-survey.css?v=1';document.head.append(css);
  const units=Array.from({length:100},(_,i)=>`<span class="survey-unit"><b>${String(i).padStart(2,'0')}</b><i></i></span>`).join('');
  chapter.innerHTML=`<div class="scene survey-scene">
    <div class="survey-meta"><span>03 / INFINITE RULER</span><span>MEASUREMENT / iPHONE</span></div>
    <div class="survey-layout">
      <div class="survey-copy"><p class="survey-kicker">BEYOND THE EDGE</p><h2>Infinite<br><em>Ruler.</em></h2><p class="survey-description">A ruler that keeps going<br>beyond your screen.</p><a class="survey-cta" href="https://savoie.app/apps/infinite-ruler/">Explore the app <svg viewBox="0 0 70 40" aria-hidden="true"><path d="M3 31 C35 37 32 8 64 9 M52 4 Q60 7 64 9 Q64 16 59 23"/></svg></a></div>
      <figure class="survey-product"><div class="survey-image"><img src="../../public/assets/images/apps/infiniteruler/product/infinite.webp" alt="Infinite Ruler app showing its continuous ruler, A and B measurement markers, and calibration controls"></div><figcaption>CM / FRACTIONAL INCHES</figcaption></figure>
      <div class="survey-tape-angle" aria-hidden="true"><div class="survey-tape">${units}</div></div>
    </div>
    <div class="survey-footer"><div class="survey-capabilities"><span>Calibrated for your screen</span><span>A–B markers</span><span>Movable zero</span></div></div>
    <details class="survey-reference"><summary>Design reference ↗</summary><a href="https://dribbble.com/shots/27765486-Architecture-Website-Design" target="_blank" rel="noopener">Architecture Website Design · Hatypo Studio</a><p>Scale markings are decorative; measurements are made in the app.</p></details>
  </div>`;
  const tape=chapter.querySelector('.survey-tape');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let top=0,height=1,travel=0;
  function paint(position){
    const progress=Math.max(0,Math.min(1,(position+innerHeight-top)/(height+innerHeight)));
    tape.style.transform=reduced.matches?'none':`translateX(${-progress*travel}px)`;
  }
  function measure(){
    top=chapter.getBoundingClientRect().top+scrollY;height=chapter.offsetHeight;
    // Three screen widths of travel, with enough tape remaining beyond both edges.
    travel=Math.max(0,Math.min(innerWidth*3,tape.scrollWidth-innerWidth*1.6-200));
    paint(window.scrollMotion?.position??scrollY);
  }
  window.addEventListener('load',()=>{measure();window.scrollMotion?.subscribe(paint);});window.addEventListener('resize',measure);reduced.addEventListener('change',measure);
  css.addEventListener('load',()=>{measure();if(location.hash==='#ruler')chapter.scrollIntoView({behavior:'instant'});});
  function picker(){const r=chapter.getBoundingClientRect();document.body.classList.toggle('viewing-ruler',r.top<innerHeight*.65&&r.bottom>100);}
  window.addEventListener('scroll',picker,{passive:true});picker();
})();
