/* hero.js — hero slideshow with progressive image loading */
(function () {
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  if (slides.length < 2) return;

  let current = 0;
  const preloaded = new Set();

  function slideUrl(slide) {
    return slide.style.backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
  }

  function preload(index) {
    const slide = slides[index];
    if (!slide || preloaded.has(index)) return;
    const url = slideUrl(slide);
    if (!url) return;
    preloaded.add(index);
    const img = new Image();
    img.src = url;
  }

  // First slide is already in CSS; warm the next one only
  preloaded.add(0);
  preload(1);

  // Load the rest after the page is interactive (does not block first paint)
  const loadRest = () => {
    for (let i = 2; i < slides.length; i++) preload(i);
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadRest, { timeout: 2500 });
  } else {
    window.addEventListener('load', () => setTimeout(loadRest, 400));
  }

  setInterval(() => {
    slides[current].classList.remove('hero__slide--active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('hero__slide--active');
    // Keep one step ahead warm
    preload((current + 1) % slides.length);
  }, 5000);
})();
