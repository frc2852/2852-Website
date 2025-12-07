/* ==========================================================================
   Main JavaScript - Team 2852 High Voltage
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavbar();
  initScrollToTop();
  initCounters();
  initAOS();
  initImageLightbox();
});

/* ==========================================================================
   Navbar Scroll Effect
   ========================================================================== */

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  // Throttle scroll events for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  handleScroll();
}

/* ==========================================================================
   Scroll to Top Button
   ========================================================================== */

function initScrollToTop() {
  const scrollBtn = document.querySelector('.scrollup, .scroll-top');
  if (!scrollBtn) return;

  const scrollThreshold = 300;

  function toggleButton() {
    if (window.pageYOffset > scrollThreshold) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        toggleButton();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initial check
  toggleButton();
}

/* ==========================================================================
   Animated Counters
   ========================================================================== */

function initCounters() {
  const counters = document.querySelectorAll('.counter, [data-count]');
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count || counter.dataset.target || counter.textContent);

        if (!isNaN(target)) {
          animateCounter(counter, target);
        }

        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

function animateCounter(element, target, duration) {
  duration = duration || 2000;
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

/* ==========================================================================
   AOS (Animate On Scroll) Initialization
   ========================================================================== */

function initAOS() {
  // Check if AOS is loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      disable: function() {
        // Disable on devices that prefer reduced motion
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }
}

/* ==========================================================================
   Smooth Scroll for Anchor Links
   ========================================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    // Skip if it's just "#" or no target
    if (targetId === '#' || targetId.length <= 1) return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/* ==========================================================================
   Mobile Menu Close on Link Click
   ========================================================================== */

document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
});

/* ==========================================================================
   Parallax Effect (Simple CSS-based fallback)
   ========================================================================== */

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length === 0) return;

  // Skip on mobile or if reduced motion is preferred
  if (window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(function(element) {
          const speed = element.dataset.parallaxSpeed || 0.5;
          const offset = scrolled * speed;
          element.style.transform = 'translateY(' + offset + 'px)';
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

// Initialize parallax if needed
initParallax();

/* ==========================================================================
   Image Lazy Loading Fallback
   ========================================================================== */

// For browsers that don't support native lazy loading
if ('loading' in HTMLImageElement.prototype === false) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}

/* ==========================================================================
   Form Validation Enhancement (if forms exist)
   ========================================================================== */

document.querySelectorAll('form').forEach(function(form) {
  form.addEventListener('submit', function(e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add('was-validated');
  });
});

/* ==========================================================================
   Image Lightbox for History Page
   ========================================================================== */

function initImageLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.image-lightbox-caption');
  const lightboxClose = lightbox.querySelector('.image-lightbox-close');

  // Get all timeline card images
  const timelineImages = document.querySelectorAll('.timeline-card-image');

  timelineImages.forEach(function(imageContainer) {
    imageContainer.addEventListener('click', function(e) {
      e.stopPropagation();
      const img = imageContainer.querySelector('img');
      if (!img) return;

      // Set lightbox image and caption
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt;

      // Show lightbox
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox on close button click
  lightboxClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Close lightbox on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
