/* ============================================================
   ANISH LAMSAL — PORTFOLIO INTERACTIONS
   Typewriter · Theme Toggle · Scroll Effects · Mobile Nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ——————————————————————————————————————————————
  // 1. TYPEWRITER EFFECT
  // ——————————————————————————————————————————————
  const typewriterEl = document.getElementById('typewriter');
  const articleEl = document.getElementById('typewriterArticle');
  const roles = [
    { text: 'Agricultural Engineer', article: 'an' },
    { text: 'Data Analyst', article: 'a' },
    { text: 'GIS Enthusiast', article: 'a' },
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER_WORD = 2000;
  const PAUSE_BEFORE_TYPE = 400;

  function typewrite() {
    const currentRole = roles[roleIndex].text;

    if (!isDeleting) {
      // Typing forward
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        // Finished typing — pause then start deleting
        isDeleting = true;
        setTimeout(typewrite, PAUSE_AFTER_WORD);
        return;
      }
      setTimeout(typewrite, TYPING_SPEED);
    } else {
      // Deleting
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        // Update the article ("an" or "a") for the next role
        if (articleEl) {
          articleEl.textContent = roles[roleIndex].article;
        }
        setTimeout(typewrite, PAUSE_BEFORE_TYPE);
        return;
      }
      setTimeout(typewrite, DELETING_SPEED);
    }
  }

  if (typewriterEl) {
    // Set initial article
    if (articleEl) {
      articleEl.textContent = roles[roleIndex].article;
    }
    setTimeout(typewrite, 600);
  }

  // ——————————————————————————————————————————————
  // 2. THEME TOGGLE (Light / Dark)
  // ——————————————————————————————————————————————
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Restore saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  // ——————————————————————————————————————————————
  // 3. MOBILE NAVIGATION
  // ——————————————————————————————————————————————
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileNav() {
    const isOpen = navLinks.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileNav() {
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMobileNav);
  navOverlay.addEventListener('click', closeMobileNav);

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // ——————————————————————————————————————————————
  // 4. ACTIVE NAV LINK ON SCROLL
  // ——————————————————————————————————————————————
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navAnchors.forEach((a) => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${sectionId}`) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ——————————————————————————————————————————————
  // 5. SCROLL TO TOP BUTTON
  // ——————————————————————————————————————————————
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollTop, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ——————————————————————————————————————————————
  // 6. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  // ——————————————————————————————————————————————
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-children');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => fadeObserver.observe(el));

  // ——————————————————————————————————————————————
  // 7. NAVBAR SHADOW ON SCROLL
  // ——————————————————————————————————————————————
  const navbar = document.getElementById('navbar');

  function navbarShadow() {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', navbarShadow, { passive: true });
});
