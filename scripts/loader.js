const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('loader--hidden');
  }, 1800);
});
