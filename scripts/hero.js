/* hero.js — hero slideshow */
(function () {
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  if (slides.length < 2) return;

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('hero__slide--active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('hero__slide--active');
  }, 5000);
})();
