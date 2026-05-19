const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('loader--hidden');
  }, 1800);

  setTimeout(() => {
    document.querySelectorAll('.header__logo-img').forEach(el => {
      el.classList.add('header__logo-img--settle');
    });
  }, 2500);
});
