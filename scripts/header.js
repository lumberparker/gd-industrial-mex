const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.header__nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }

  // Active nav highlight on scroll
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const item = link.parentElement;
    item.classList.remove('header__nav-item--active');
    if (link.getAttribute('href') === `#${current}`) {
      item.classList.add('header__nav-item--active');
    }
  });
}, { passive: true });
