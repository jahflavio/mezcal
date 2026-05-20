import './style-light.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ========================================
   AGE GATE
   ======================================== */
function initAgeGate() {
  const gate = document.getElementById('age-gate');
  const yesBtn = document.getElementById('age-yes');
  const noBtn = document.getElementById('age-no');

  if (sessionStorage.getItem('ageVerified')) {
    gate.classList.add('hidden');
    document.body.style.overflow = '';
    return;
  }

  document.body.style.overflow = 'hidden';

  yesBtn.addEventListener('click', () => {
    sessionStorage.setItem('ageVerified', 'true');
    gate.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
  });

  noBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('active'));
  });
}

/* ========================================
   GSAP ANIMATIONS
   ======================================== */
function initAnimations() {
  // Hero
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero__tagline', { y: 40, opacity: 0, duration: 1 })
    .from('.hero__title', { y: 60, opacity: 0, duration: 1.2 }, '-=0.6')
    .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero__bottle-img', { y: 80, opacity: 0, scale: 0.9, duration: 1.2 }, '-=0.8')
    .from('.hero__cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__scroll-indicator', { opacity: 0, duration: 1 }, '-=0.3');

  // Intro text reveal
  gsap.from('.intro__text', {
    scrollTrigger: { trigger: '.intro', start: 'top 80%' },
    y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
  });

  // Section headers
  document.querySelectorAll('.section__header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
    });
  });

  // Historia
  gsap.from('.historia__text', {
    scrollTrigger: { trigger: '.historia__content', start: 'top 75%' },
    x: -60, opacity: 0, duration: 1, ease: 'power3.out'
  });
  gsap.from('.historia__badge', {
    scrollTrigger: { trigger: '.historia__badge', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
  });

  // Timeline items
  document.querySelectorAll('.timeline__item').forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      opacity: 1, duration: 0.8, delay: i * 0.2, ease: 'power3.out'
    });
  });

  // Filosofía
  gsap.from('.filosofia__quote blockquote', {
    scrollTrigger: { trigger: '.filosofia__quote', start: 'top 80%' },
    scale: 0.85, opacity: 0, duration: 1.2, ease: 'back.out(1.5)'
  });
  gsap.from('.filosofia__text p', {
    scrollTrigger: { trigger: '.filosofia__text', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.2
  });
  gsap.from('.badge', {
    scrollTrigger: { trigger: '.filosofia__badges', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
  });

  // Proceso steps
  document.querySelectorAll('.proceso__step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: { trigger: step, start: 'top 85%' },
      y: 50, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out'
    });
  });
  gsap.from('.proceso__seal', {
    scrollTrigger: { trigger: '.proceso__seal', start: 'top 90%' },
    y: 20, opacity: 0, duration: 0.8
  });

  // Mezcal cards
  document.querySelectorAll('.mezcal-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 60, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
    });
  });

  // Experiencia parallax
  gsap.to('.experiencia__bg', {
    scrollTrigger: {
      trigger: '.experiencia', start: 'top bottom', end: 'bottom top', scrub: 1
    },
    y: '20%', ease: 'none'
  });
  gsap.from('.experiencia__title', {
    scrollTrigger: { trigger: '.experiencia__content', start: 'top 80%' },
    y: 50, opacity: 0, duration: 1
  });
  gsap.from('.experiencia__text', {
    scrollTrigger: { trigger: '.experiencia__content', start: 'top 75%' },
    y: 40, opacity: 0, duration: 1, delay: 0.3
  });

  // Contacto
  gsap.from('.contacto__form', {
    scrollTrigger: { trigger: '.contacto__grid', start: 'top 80%' },
    x: -50, opacity: 0, duration: 1
  });
  gsap.from('.contacto__info', {
    scrollTrigger: { trigger: '.contacto__grid', start: 'top 80%' },
    x: 50, opacity: 0, duration: 1, delay: 0.2
  });

  // Hero parallax on scroll
  gsap.to('.hero__bg-img', {
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1
    },
    y: '30%', scale: 1.2, ease: 'none'
  });
}



/* ========================================
   FORM
   ======================================== */
function initForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '¡Mensaje Enviado!';
    btn.style.background = 'var(--green)';
    btn.style.borderColor = 'var(--green)';
    setTimeout(() => {
      btn.textContent = 'Enviar Mensaje';
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initNav();
  initForm();
  if (sessionStorage.getItem('ageVerified')) {
    initAnimations();
  }
});
