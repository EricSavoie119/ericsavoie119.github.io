// Throwaway: three BeLoved layouts in the existing mountain homepage.
// Open index.html?variant=A#apps; no query means the original design.
(() => {
  const url=new URL(location.href);
  if(!url.searchParams.has('variant'))return;
  const variants=['A','B','C'];
  const key=variants.includes(url.searchParams.get('variant'))?url.searchParams.get('variant'):'A';
  const css=document.createElement('link');css.rel='stylesheet';css.href='beloved-options.css';document.head.append(css);
  const chapter=document.querySelector('.beloved-chapter');
  chapter.classList.add('beloved-options');chapter.dataset.variant=key;
  const video=`<div class="option-film"><video muted playsinline loop controls preload="metadata" poster="beloved-poster.jpg" aria-label="BeLoved app video" data-src="beloved-demo.mp4"></video></div>`;
  const photo=`<img class="option-photo" src="../../public/assets/images/apps/BeLoved/product/couple-photo.webp" alt="A couple sharing a moment together">`;
  const title=`<h2>Be<em>Loved.</em></h2>`;
  const cta=`<a class="option-cta" href="https://savoie.app/apps/beloved/">Explore BeLoved <svg viewBox="0 0 70 40" aria-hidden="true"><path d="M3 31 C35 37 32 8 64 9 M52 4 Q60 7 64 9 Q64 16 59 23"/></svg></a>`;
  const label=`<div class="option-label"><span>01 / BELOVED</span><span>iPHONE & iPAD</span></div>`;
  const scenes={
    A:`${label}<div class="river-layout"><div class="option-copy"><p class="option-kicker">THE DAYS THAT MATTER</p>${title}<p class="option-description">Keep your shared<br>milestones close.</p>${cta}</div><div class="river-media">${video}</div></div><span class="option-footnote">Made for the two of you.</span>`,
    B:`${label}<div class="spread-heading">${title}<p>Keep your shared<br>milestones close.</p></div><div class="spread-layout"><figure class="spread-photo">${photo}<figcaption>A little space for your shared story.</figcaption></figure>${video}<div class="spread-side"><span class="small-star" aria-hidden="true">✳</span><p>Anniversaries.<br>Special dates.<br>All your days together.</p>${cta}</div></div>`,
    C:`${label}<div class="contour-layout"><div class="contour-wash" aria-hidden="true"></div><div class="contour-heading"><p class="option-kicker">A LITTLE CLOSER, EVERY DAY</p>${title}</div>${video}<div class="contour-copy"><p class="option-description">Keep your shared<br>milestones close.</p>${cta}<span class="hand-note">The big days.<br>And the in-between.</span></div><svg class="contour-lines" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true"><path d="M-90 740 C80 380 300 720 470 390 S830 10 1240 240"/><path d="M-90 765 C110 420 310 760 500 420 S870 40 1240 270"/><path d="M-90 790 C140 460 330 800 530 450 S910 70 1240 300"/></svg></div>`
  };
  chapter.innerHTML=`<div class="scene options-scene">${scenes[key]}</div>`;
  css.addEventListener('load',()=>{
    if(location.hash==='#apps')chapter.scrollIntoView({behavior:'instant',block:'start'});
  });
  const names={A:'Riverbank',B:'Open spread',C:'Contour'};
  const descriptions={A:'An asymmetric video and a soft rose riverbank.',B:'A spacious editorial spread: a photograph, the film and a small personal note.',C:'Oversized type, a central film and fine contour lines through a warm landscape.'};
  const sources={A:['Flora · MAGIKA','https://dribbble.com/shots/26981743-Flora-Botanical-Website-Design-Case-Study'],B:['Anémona · Kate Zest','https://dribbble.com/shots/25649740-Minimal-Luxury-Website-Design'],C:['Inner Rhythm · Ana Alein','https://dribbble.com/shots/26816017-Find-Your-Inner-Rhythm-Yoga-Wellness-Website-Concept']};
  const picker=document.createElement('aside');picker.className='option-picker';picker.setAttribute('aria-label','BeLoved design options');
  picker.innerHTML=`<div class="picker-summary"><small>BELOVED / DESIGN STUDY</small><strong>${key} — ${names[key]}</strong><span>${descriptions[key]}</span></div><nav aria-label="Choose a design"><button data-step="-1" aria-label="Previous design">←</button>${variants.map(v=>`<button data-key="${v}" aria-pressed="${v===key}">${v}<span> ${names[v]}</span></button>`).join('')}<button data-step="1" aria-label="Next design">→</button></nav><a class="source-link" href="${sources[key][1]}" target="_blank" rel="noopener">Dribbble reference: ${sources[key][0]} ↗</a>`;
  document.body.append(picker);
  function choose(next){url.searchParams.set('variant',next);url.hash='apps';location.href=url.href;}
  picker.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;choose(button.dataset.key||variants[(variants.indexOf(key)+Number(button.dataset.step)+3)%3]);});
  document.addEventListener('keydown',event=>{if(event.target.closest('input,textarea,select,[contenteditable]'))return;if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();choose(variants[(variants.indexOf(key)+(event.key==='ArrowLeft'?2:1))%3]);}});
})();
