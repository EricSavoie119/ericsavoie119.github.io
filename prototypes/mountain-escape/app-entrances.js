// First-visit delight: each app assembles while its chapter is on screen.
// Native scroll remains untouched. No timer can finish before the reader arrives.
const chapters = [...document.querySelectorAll('.chapter')].map(element => {
  const light = document.createElement('div');
  light.className = 'vista-light';
  light.setAttribute('aria-hidden', 'true');
  element.querySelector('.scene').prepend(light);
  return {element, progress:0, props:[...element.querySelectorAll('.prop')], light};
});
const gentleApps = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = value => Math.min(1, Math.max(0, value));
let chapterTops = [];
let chapterHeights = [];
function measureApps() {
  chapterTops = chapters.map(chapter => chapter.element.getBoundingClientRect().top + window.scrollY);
  chapterHeights = chapters.map(chapter => chapter.element.offsetHeight);
  paintApps(window.scrollMotion.position);
}
function paintApps(scrollPosition) {
  const height = window.innerHeight;
  // Read all positions before writing styles.
  const tops = chapterTops.map(top => top - scrollPosition);
  chapters.forEach((chapter, i) => {
    chapter.progress = clamp((height * .65 - tops[i]) / (height * .85));
    const vista = clamp((height - tops[i]) / (height + chapterHeights[i]));
    chapter.props.forEach((prop, index) => {
      const progress = gentleApps.matches ? 1 : clamp((chapter.progress - index * .1) / (1 - index * .1));
      const remaining = 1 - progress;
      const shift = Number(prop.dataset.shift) * Math.min(1, window.innerWidth / 900);
      // Position alone defines the pose: scrolling up retraces the exact same path.
      const rotation = Number(prop.dataset.finalTurn) + remaining * Number(prop.dataset.turn);
      const x = remaining * shift;
      const y = remaining * 110;
      prop.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });
    chapter.light.style.transform = gentleApps.matches ? 'none' :
      `translate(${(vista - .5) * 24}%, ${(vista - .5) * -12}%)`;
  });
}
window.addEventListener('resize', measureApps);
window.addEventListener('load', measureApps);
gentleApps.addEventListener('change', measureApps);
measureApps();
window.scrollMotion.subscribe(paintApps);
