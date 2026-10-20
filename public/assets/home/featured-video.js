(() => {
  const video = document.querySelector('.option-film video');
  if (!video) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let manuallyPaused = false;
  let automaticPause = false;
  function update() {
    if (!visible || document.hidden || reduced.matches || manuallyPaused) {
      if (!video.paused) {
        automaticPause = true;
        video.pause();
      }
      return;
    }
    video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
  }
  video.addEventListener('pause', () => {
    if (!automaticPause && visible && !document.hidden) manuallyPaused = true;
    automaticPause = false;
  });
  video.addEventListener('play', () => { manuallyPaused = false; });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= .45;
    if (entry.isIntersecting && !video.getAttribute('src')) video.src = video.dataset.src;
    update();
  }, {threshold:[0,.45]}).observe(video);
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', update);
})();
