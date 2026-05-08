document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (navToggle && mobileNavOverlay) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mobileNavOverlay.classList.toggle('open');
      document.body.style.overflow = mobileNavOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNavOverlay.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Scroll Animations using Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // ── Auto-cycling Reel ──────────────────────────────────────
  const scenes    = document.querySelectorAll('.reel-scene');
  const dots      = document.querySelectorAll('.reel-dot');
  const reelLabel = document.getElementById('reelLabel');
  let   current   = 0;
  let   reelTimer = null;

  function goToScene(idx) {
    scenes[current].classList.remove('reel-scene--active');
    dots[current].classList.remove('reel-dot--active');
    current = (idx + scenes.length) % scenes.length;
    scenes[current].classList.add('reel-scene--active');
    dots[current].classList.add('reel-dot--active');
    if (reelLabel) reelLabel.textContent = scenes[current].dataset.label || '';
  }

  function startReel() {
    reelTimer = setInterval(() => goToScene(current + 1), 3000);
  }

  if (scenes.length) {
    startReel();
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(reelTimer);
        goToScene(parseInt(dot.dataset.idx));
        startReel();
      });
    });
  }

  // ── Back to Top Button ─────────────────────────────────────
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
        // Wait a tick to apply transition
        setTimeout(() => {
          backToTopBtn.style.opacity = '1';
          backToTopBtn.style.transform = 'translateY(0)';
        }, 10);
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
        // Wait for transition before hiding
        setTimeout(() => {
          if (window.scrollY <= 500) backToTopBtn.style.display = 'none';
        }, 300);
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Footer Image Pan Effect ────────────────────────────────
  const footerMeImg = document.querySelector('.footer-me-img');
  if (footerMeImg) {
    window.addEventListener('scroll', () => {
      const rect = footerMeImg.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate scroll percentage through viewport
        let percent = 1 - (rect.top / window.innerHeight);
        // Map to scale (zooms out from 1.5 to 1.0 as you scroll down)
        // Zooming in on scroll up (pan inward), zooming out on scroll down (pan outward)
        let scale = 1.0 + ((1 - percent) * 0.8);
        scale = Math.max(1, Math.min(scale, 1.8));
        footerMeImg.style.transform = `scale(${scale})`;
      }
    });
  }
});

// Portfolio Modal Logic
function openModal(title, category, description) {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;
  
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalCategory').textContent = category;
  document.getElementById('modalDesc').textContent = description;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});

// Video Modal Logic
function openVideoModal(url) {
  const modal = document.getElementById('heroVideoModal');
  const iframe = document.getElementById('heroVideoIframe');
  if (!modal || !iframe) return;
  iframe.src = url;
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('heroVideoModal');
  const iframe = document.getElementById('heroVideoIframe');
  if (!modal || !iframe) return;
  modal.classList.remove('active');
  setTimeout(() => { iframe.src = ''; }, 300);
}
