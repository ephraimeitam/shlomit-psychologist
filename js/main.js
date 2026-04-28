/* jshint esversion: 6 */

// =============================================
// LANGUAGE TOGGLE
// =============================================

let currentLang = 'he';

function setLanguage(lang) {
  currentLang = lang;
  const html = document.documentElement;

  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');

  document.title = translations[lang].page_title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', translations[lang].meta_desc);
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (translations[lang][key] !== undefined) {
      el.setAttribute('alt', translations[lang][key]);
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

// =============================================
// NAVIGATION — scroll effect
// =============================================

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// MOBILE MENU
// =============================================

const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// =============================================
// ACTIVE NAV LINK — highlight on scroll
// =============================================

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active-link',
      link.getAttribute('href') === `#${current}`
    );
  });
}, { passive: true });

// =============================================
// SCROLL-REVEAL ANIMATION
// =============================================

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

const revealSelectors = [
  '.service-card',
  '.credential-card',
  '.timeline-content',
  '.edu-card',
  '.contact-card',
  '.about__text',
  '.about__credentials',
  '.section-header',
];

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
    revealObserver.observe(el);
  });
});
