const stage = document.getElementById('stage');
stage.innerHTML = `<div class="figure-anchor"><div class="annotation"><p>That’s me.</p><svg viewBox="0 0 110 88" aria-hidden="true"><path d="M82 4 C92 46 23 20 0 85 M0 85 L1 68 M0 85 L17 79" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`;
let arrowProgress = 0;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Match object-fit: cover and object-position so the annotation follows the actual person.
const photo = document.querySelector('.landscape');
function positionFigure() {
  const anchor = stage.querySelector('.figure-anchor');
  if (!anchor || !photo.naturalWidth) return;
  const w = photo.clientWidth, h = photo.clientHeight;
  const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight);
  const [px, py] = getComputedStyle(photo).objectPosition.split(' ').map(parseFloat);
  const x = (w - photo.naturalWidth * scale) * px / 100 + photo.naturalWidth * scale * .416;
  const y = (h - photo.naturalHeight * scale) * py / 100 + photo.naturalHeight * scale * .757;
  anchor.style.left = `${x}px`;
  anchor.style.top = `${y}px`;
  // The person's head is the shared origin: photo and annotation cannot drift apart.
  photo.style.transformOrigin = `${x}px ${y}px`;
  anchor.style.transformOrigin = '0 0';
  reveal();
}
function updateZoom() {
  const progress = Math.min(1, Math.max(0, window.scrollMotion.position / Math.min(320, window.innerHeight * .4)));
  const zoom = !reducedMotion.matches ? 1 + .6 * progress : 1;
  photo.style.transform = `scale(${zoom})`;
  const anchor = stage.querySelector('.figure-anchor');
  if (anchor) anchor.style.transform = `scale(${zoom})`;
}
function reveal() {
  updateZoom();
  const annotation = stage.querySelector('.annotation');
  if (annotation) {
    // A first-visit introduction: scroll distance is the timeline, not a timer.
    // Retrace the introduction on the way back to the summit.
    const distance = Math.min(200, window.innerHeight * .24);
    arrowProgress = Math.min(1, Math.max(0, (window.scrollMotion.position - 12) / distance));
    const textProgress = Math.min(1, arrowProgress / .45);
    const lineProgress = Math.min(1, Math.max(0, (arrowProgress - .25) / .75));
    const text = annotation.querySelector('p');
    const arrow = annotation.querySelector('svg');
    text.style.clipPath = `inset(0 ${(1-textProgress)*100}% 0 0)`;
    arrow.style.clipPath = `inset(-4px -4px ${lineProgress === 1 ? '-4px' : (1-lineProgress)*100+'%'} -4px)`;
    text.style.opacity = reducedMotion.matches ? (arrowProgress > 0 ? '1' : '0') : String(Math.min(1,textProgress * 3));
    arrow.style.opacity = reducedMotion.matches ? (arrowProgress > 0 ? '1' : '0') : String(Math.min(1,lineProgress * 3));
  }
}
photo.addEventListener('load', positionFigure);
window.addEventListener('resize', positionFigure);
window.scrollMotion.subscribe(reveal);
reducedMotion.addEventListener('change', reveal);
positionFigure();
reveal();
