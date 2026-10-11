const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!mediaQuery.matches) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.from('.reveal-up', {
    opacity: 0,
    y: 36,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.15,
  });

  gsap.from('.hero-meta > div', {
    opacity: 0,
    y: 12,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.35,
  });

  gsap.to('.visual-orb', {
    scale: 1.1,
    y: -26,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.portrait-frame', {
    y: -25,
    scale: 1.04,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  document.querySelectorAll('.story-panel').forEach((panel) => {
    const media = panel.querySelector('.story-media');
    const copy = panel.querySelector('.panel-copy');

    gsap.from(copy, {
      opacity: 0,
      x: -40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: panel,
        start: 'top 72%',
      },
    });

    gsap.to(media, {
      y: -42,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  gsap.from('.product-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.14,
    scrollTrigger: {
      trigger: '.lookbook',
      start: 'top 78%',
    },
  });

  gsap.from('.journal-grid article', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.journal',
      start: 'top 80%',
    },
  });
}

const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;
    event.preventDefault();

    if (typeof lenis !== 'undefined') {
      lenis.scrollTo(target, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
