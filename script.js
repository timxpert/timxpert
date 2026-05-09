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
    const mobileLinks = mobileNavOverlay.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');
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

  // Process Steps — only one active at a time on scroll
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length > 0) {
    // Use rootMargin to shrink the "trigger zone" to the centre of the viewport.
    // A step becomes active when it enters this zone, and inactive when it leaves.
    const processObserver = new IntersectionObserver((entries) => {
      // Find all currently intersecting entries from this batch
      let isAnyIntersecting = false;
      let targetToActivate = null;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isAnyIntersecting = true;
          targetToActivate = entry.target;
        } else {
          entry.target.classList.remove('active');
        }
      });

      if (isAnyIntersecting && targetToActivate) {
        processSteps.forEach(s => s.classList.remove('active'));
        targetToActivate.classList.add('active');
      }
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    });

    processSteps.forEach(step => processObserver.observe(step));
  }

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
      let isNearFooter = false;
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          isNearFooter = true;
        }
      }

      if (window.scrollY > 500 && !isNearFooter) {
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
          if (window.scrollY <= 500 || isNearFooter) backToTopBtn.style.display = 'none';
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

  // ── Video Preview Autoplay (Intersection Observer) ────────────────────────
  const videoIframes = document.querySelectorAll('.marquee-item iframe');
  
  if (videoIframes.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const iframe = entry.target;
        if (entry.isIntersecting) {
          // Send play command to YouTube iframe
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
        } else {
          // Send pause command to YouTube iframe
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% visible
    
    videoIframes.forEach(iframe => {
      videoObserver.observe(iframe);
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
const videoData = {
  'zuNIolgecvU': { title: 'Agency Showreel', summary: 'A compilation of our best motion design and SaaS product videos, demonstrating our ability to craft engaging, high-converting visual stories.' },
  '5RyJR8RDLyc': { title: 'Attrove', summary: 'A comprehensive demonstration of the Attrove SaaS platform, highlighting its intuitive interface and core capabilities designed to streamline user workflows.' },
  'LdMB7TeUuRM': { title: 'Fintech Platform Demo', summary: 'A dynamic showcase of modern financial software, featuring high-energy animations and engaging visual metaphors to capture audience attention.' },
  '5fUlfj5h9xg': { title: 'Analytics Dashboard Overview', summary: 'An in-depth look at a powerful analytics dashboard, emphasizing clear data visualization and actionable insights for enterprise users.' },
  '3hHTUZKAaBQ': { title: 'Workflow Automation App', summary: 'A fast-paced explainer showing how to automate daily tasks and improve team productivity using a sleek new software tool.' },
  'ECNs0W3-Y98': { title: 'Cybersecurity Solution', summary: 'A dramatic, tech-focused video highlighting advanced security features and threat prevention mechanisms of a modern cybersecurity platform.' },
  '7Dn-H_wr0uY': { title: 'Mobile App Prototype', summary: 'A sleek, engaging walk-through of a new mobile application prototype, focusing on seamless user experience and modern design patterns.' },
  'vllk5LCC1f8': { title: 'Cloud Infrastructure Service', summary: 'A technical yet accessible explainer video for a cloud infrastructure service, simplifying complex concepts through dynamic motion graphics.' },
  'Oy3SMR7UZsg': { title: 'AI Assistant Walkthrough', summary: 'An immersive demonstration of an AI-powered assistant, showcasing its natural language processing and task automation capabilities.' },
  'Syaardtlfww': { title: 'E-commerce Platform', summary: 'A visually rich product video demonstrating the ease of setting up and managing an online storefront with next-generation e-commerce tools.' },
  'XOJM3nkkHaM': { title: 'Data Management System', summary: 'A professional breakdown of a complex data management system, using crisp animations to illustrate data flow and structural organization.' }
};

function openVideoModal(url) {
  const modal = document.getElementById('heroVideoModal');
  const iframe = document.getElementById('heroVideoIframe');
  const titleEl = document.getElementById('videoModalTitle');
  const summaryEl = document.getElementById('videoModalSummary');
  
  if (!modal || !iframe) return;
  
  const match = url.match(/embed\/([^?]+)/);
  const videoId = match ? match[1] : null;
  
  const data = (videoId && videoData[videoId]) ? videoData[videoId] : {
    title: 'Product Video Showcase',
    summary: 'We produced high-quality product videos showcasing versatile uses of our software. Upbeat and current, all done in-studio to highlight premium features and drive conversions.'
  };
  
  if (titleEl) titleEl.textContent = data.title;
  if (summaryEl) summaryEl.textContent = data.summary;
  
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
