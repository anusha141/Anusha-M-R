/**
 * Portfolio Interactivity & Ethereal Golden Sparks
 * Inspired by the sacred lotus painting (anu2.jpeg)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Active State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // 2. Header Backdrop Blur Elevation on Scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(244, 194, 91, 0.12)';
      header.style.background = 'rgba(5, 13, 21, 0.94)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(6, 15, 24, 0.82)';
    }
  }, { passive: true });

  // 3. Contact Form Submission Feedback (Demo Handler)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatus.textContent = '✨ Thank you! Your message has been sent successfully.';
        formStatus.style.color = 'var(--gold-400)';
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;

        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 1000);
    });
  }

  // 4. Subtle Floating Lotus Sparks in Hero Section
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    createAmbientLotusSparks(heroSection);
  }
});

function createAmbientLotusSparks(container) {
  const sparkCount = 18;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'lotus-spark';
    
    const size = Math.random() * 3.5 + 2; // 2px to 5.5px
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 6 + 5; // 5s to 11s
    const delay = Math.random() * 6; // 0s to 6s
    const opacity = Math.random() * 0.6 + 0.3; // 0.3 to 0.9

    spark.style.cssText = `
      position: absolute;
      top: -20px;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, #fff0c2 20%, #f4c25b 80%);
      border-radius: 50%;
      pointer-events: none;
      opacity: ${opacity};
      filter: drop-shadow(0 0 6px rgba(244, 194, 91, 0.8));
      animation: fallSpark ${duration}s linear ${delay}s infinite;
      z-index: 1;
    `;

    fragment.appendChild(spark);
  }

  // Add keyframe stylesheet rule dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallSpark {
      0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      20% {
        opacity: 0.85;
      }
      80% {
        opacity: 0.65;
      }
      100% {
        transform: translateY(105vh) translateX(${(Math.random() - 0.5) * 60}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  container.appendChild(fragment);
}
