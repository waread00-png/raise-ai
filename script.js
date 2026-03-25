// RAISE AI — Landing Page Scripts

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll animations
const animateElements = document.querySelectorAll(
  '.problem__card, .approach__step, .tier, .outcomes__card, ' +
  '.fit__card, .about__quote-card, .problem__callout, .services__bottom-cta'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animateElements.forEach(el => {
  el.classList.add('animate-in');
  observer.observe(el);
});

// Animate hero progress bar on load
window.addEventListener('load', () => {
  const fill = document.querySelector('.hero__card-fill');
  if (fill) {
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = '85%'; }, 300);
  }
});
