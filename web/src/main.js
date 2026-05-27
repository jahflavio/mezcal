import './style.css';
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
  // Hero entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero__tagline', { y: 40, opacity: 0, duration: 1 })
    .from('.hero__title', { y: 60, opacity: 0, duration: 1.2 }, '-=0.6')
    .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero__cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
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

  // Experiencia parallax (matemáticamente perfecto, sin bordes visibles)
  gsap.fromTo('.experiencia__bg', 
    { yPercent: 0 },
    {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.experiencia',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2.2
      }
    }
  );
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

}

/* ========================================
   HERO — SCROLL-DRIVEN VIDEO
   ======================================== */
function initVideoScroll() {
  const video = document.getElementById('hero-video');
  if (!video) return;

  // El video no reproduce solo — lo controla el scroll
  video.pause();
  video.currentTime = 0;

  // CONFIGURACIÓN: Segundos a recortar al final del video para evitar que aparezcan las letras
  const CORTAR_SEGUNDOS_AL_FINAL = 4.5;

  const setup = () => {
    const duration = video.duration;
    if (!duration || isNaN(duration)) return;

    // Duración recortada para que no aparezcan las letras del final
    const effectiveDuration = Math.max(0, duration - CORTAR_SEGUNDOS_AL_FINAL);

    // Objeto proxy para animar con GSAP de forma fluida
    const videoScroller = { currentTime: 0 };

    // Semáforo para controlar si hay un seek en curso en el navegador
    let isSeeking = false;
    let targetTime = 0;

    // Función optimizada para actualizar el currentTime del video
    const seekVideo = () => {
      if (isSeeking) return; // Si ya se está procesando un cambio de frame, esperar

      // Evitar renders redundantes si el cambio es insignificante
      if (Math.abs(video.currentTime - targetTime) < 0.03) return;

      isSeeking = true;
      video.currentTime = targetTime;
    };

    // Escuchar cuando el navegador termine de buscar el frame
    video.addEventListener('seeked', () => {
      isSeeking = false;
      seekVideo(); // Atrapar el último cambio de scroll si ocurrió durante el seeking
    });

    // Tween de GSAP sobre el objeto proxy. Esto sí aprovecha el "scrub" para suavizar los valores
    gsap.to(videoScroller, {
      currentTime: effectiveDuration,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: `+=${Math.round(effectiveDuration * 220)}`, // Aumentado a 220px por segundo de video para mayor suavidad
        pin: true,
        scrub: 2.5, // Aumentado a 2.5 para crear una inercia líquida ultra suave que absorbe micro-tirones
        onUpdate: (self) => {
          // Actualizamos el tiempo objetivo basado en la interpolación de GSAP
          targetTime = videoScroller.currentTime;
          seekVideo();
        }
      }
    });

    // Efecto Premium Extra: Desvanecer el texto y CTA del Hero con el scroll
    gsap.to('.hero__content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=400', // Se desvanece por completo en los primeros 400px de scroll
        scrub: true
      },
      opacity: 0,
      y: -40,
      ease: 'none'
    });

  };

  // Si los metadatos ya cargaron, setup inmediato; si no, esperar el evento
  if (video.readyState >= 1) {
    setup();
  } else {
    video.addEventListener('loadedmetadata', setup, { once: true });
  }
}



/* ========================================
   FORM & URL PARAMS
   ======================================== */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Auto-llenado basado en parámetros de URL (?mezcal=espadin)
  const urlParams = new URLSearchParams(window.location.search);
  const mezcal = urlParams.get('mezcal');
  if (mezcal) {
    const messageField = document.getElementById('contact-message');
    const subjectField = document.getElementById('contact-subject');
    if (messageField) {
      const capitalizedMezcal = mezcal.charAt(0).toUpperCase() + mezcal.slice(1);
      messageField.value = `Hola, estoy interesado en adquirir una botella de Mezcal ${capitalizedMezcal}. Por favor, compártanme la información de compra y disponibilidad.`;
    }
    if (subjectField) {
      subjectField.value = 'pedido';
    }
  }

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
   LANDING PAGES ANIMATIONS (GSAP)
   ======================================== */
function initLandingAnimations() {
  const isLanding = document.querySelector('.landing-hero');
  if (!isLanding) return;

  // Hero Animations
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('[data-animate="hero-bottle"]', {
    x: -150,
    opacity: 0,
    rotate: -15,
    duration: 1.5
  })
  .from('[data-animate="hero-label"]', {
    x: 150,
    opacity: 0,
    scale: 0.8,
    duration: 1.5
  }, '-=1.2')
  .from('.landing-hero__text > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2
  }, '-=1.2');

  // Premium Floating / Breathing effect for Bottle
  gsap.to('[data-animate="hero-bottle"] img', {
    y: -15,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Sensory wheel animations on scroll
  const wheelBars = document.querySelectorAll('.wheel-bar-inner .fill');
  wheelBars.forEach(bar => {
    // Apagamos la animación por defecto de CSS para controlarla por GSAP
    bar.style.animation = 'none';
    bar.style.transform = 'scaleX(0)';
    
    gsap.to(bar, {
      scrollTrigger: {
        trigger: '.sensory',
        start: 'top 75%'
      },
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.out'
    });
  });

  // Section animations in landing
  gsap.from('.sensory__notes .note-card', {
    scrollTrigger: { trigger: '.sensory__notes', start: 'top 80%' },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.artwork-detail__content > *', {
    scrollTrigger: { trigger: '.artwork-detail', start: 'top 80%' },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  });

  gsap.from('.artwork-detail__img', {
    scrollTrigger: { trigger: '.artwork-detail', start: 'top 80%' },
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.5)'
  });
}

/* ========================================
   MEZCAL SHOWCASE INTERACTIVE LOGIC
   ======================================== */
function initMezcalShowcase() {
  const showcase = document.querySelector('.mezcal-showcase');
  if (!showcase) return;

  const menuItems = showcase.querySelectorAll('.mezcal-showcase__menu-item');
  const visualPanels = showcase.querySelectorAll('.visual-panel');
  const detailsPanels = showcase.querySelectorAll('.details-panel');
  const glow = document.getElementById('showcase-glow');

  // Mapeo de colores para el halo luminoso de fondo
  const glowColors = {
    espadin: 'radial-gradient(circle, rgba(45, 107, 90, 0.15) 0%, transparent 70%)',
    mexicanito: 'radial-gradient(circle, rgba(201, 168, 76, 0.12) 0%, transparent 70%)',
    tobala: 'radial-gradient(circle, rgba(243, 229, 171, 0.15) 0%, transparent 70%)',
    tepeztate: 'radial-gradient(circle, rgba(45, 107, 90, 0.2) 0%, transparent 70%)',
    jabali: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%)'
  };

  let activeBreathingAnimation = null;

  // Función para iniciar la levitación en la botella y etiqueta activas
  const startBreathingEffect = (targetAgave, panel) => {
    if (activeBreathingAnimation) {
      activeBreathingAnimation.kill();
    }

    const bottle = panel.querySelector('.visual-panel__bottle-wrapper img');
    const label = panel.querySelector('.visual-panel__label-wrapper img');
    
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    if (bottle) {
      tl.to(bottle, { y: -12, duration: 3, ease: 'sine.inOut' }, 0);
    }
    if (label) {
      tl.to(label, { y: -8, duration: 3, ease: 'sine.inOut' }, 0.2);
    }
    activeBreathingAnimation = tl;
  };

  // Inicializar efecto de respiración en el panel activo por defecto (espadín)
  const defaultPanel = showcase.querySelector('.visual-panel.active');
  if (defaultPanel) {
    startBreathingEffect('espadin', defaultPanel);
  }

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) return;

      const targetMezcal = item.getAttribute('data-target');
      
      // 1. Obtener paneles activos actuales
      const currentActiveItem = showcase.querySelector('.mezcal-showcase__menu-item.active');
      const currentActiveVisual = showcase.querySelector('.visual-panel.active');
      const currentActiveDetails = showcase.querySelector('.details-panel.active');

      const nextVisual = showcase.querySelector(`.visual-panel[data-panel="${targetMezcal}"]`);
      const nextDetails = showcase.querySelector(`.details-panel[data-panel="${targetMezcal}"]`);

      // Desactivar menú item
      currentActiveItem.classList.remove('active');
      item.classList.add('active');

      // Parar animaciones actuales
      if (activeBreathingAnimation) {
        activeBreathingAnimation.kill();
        activeBreathingAnimation = null;
      }

      // Resetear posiciones de elementos anteriores para evitar desfases
      const activeBottleImg = currentActiveVisual.querySelector('.visual-panel__bottle-wrapper img');
      const activeLabelImg = currentActiveVisual.querySelector('.visual-panel__label-wrapper img');
      if (activeBottleImg) gsap.set(activeBottleImg, { y: 0 });
      if (activeLabelImg) gsap.set(activeLabelImg, { y: 0 });

      // 2. Animación de salida de elementos activos
      const exitTl = gsap.timeline({
        onComplete: () => {
          // Remover clases active anteriores
          currentActiveVisual.classList.remove('active');
          currentActiveDetails.classList.remove('active');

          // Activar nuevos paneles en el DOM
          nextVisual.classList.add('active');
          nextDetails.classList.add('active');

          // Cambiar color del halo con transición sutil
          if (glow) {
            glow.style.background = glowColors[targetMezcal];
          }

          // 3. Animación de entrada de nuevos elementos
          const enterTl = gsap.timeline({
            onComplete: () => {
              // Iniciar efecto de levitación una vez que entren los elementos
              startBreathingEffect(targetMezcal, nextVisual);
            }
          });

          const bottleWrapper = nextVisual.querySelector('.visual-panel__bottle-wrapper');
          const labelWrapper = nextVisual.querySelector('.visual-panel__label-wrapper');

          enterTl.fromTo(bottleWrapper,
            { opacity: 0, x: -40, rotate: -6 },
            { opacity: 1, x: 0, rotate: -2, duration: 0.6, ease: 'power3.out' }
          )
          .fromTo(labelWrapper,
            { opacity: 0, x: 40, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.45'
          );

          // Animación de entrada de la ficha técnica
          enterTl.fromTo(nextDetails.children,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
            '-=0.5'
          );
        }
      });

      // Animaciones de salida coordinadas
      const bottleWrapper = currentActiveVisual.querySelector('.visual-panel__bottle-wrapper');
      const labelWrapper = currentActiveVisual.querySelector('.visual-panel__label-wrapper');

      if (bottleWrapper) {
        exitTl.to(bottleWrapper, { opacity: 0, x: -30, rotate: -4, duration: 0.35, ease: 'power3.in' }, 0);
      }
      if (labelWrapper) {
        exitTl.to(labelWrapper, { opacity: 0, x: 30, scale: 0.95, duration: 0.35, ease: 'power3.in' }, 0);
      }

      exitTl.to(currentActiveDetails.children, { opacity: 0, y: -10, stagger: 0.04, duration: 0.3, ease: 'power3.in' }, 0);
    });
  });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initNav();
  initForm();
  initVideoScroll();  // scroll-driven video, siempre activo
  initMezcalShowcase(); // Selector de mezcales premium
  initLandingAnimations(); // Inicializa landing pages si existen
  if (sessionStorage.getItem('ageVerified')) {
    initAnimations();
  }
});

