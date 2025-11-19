/* Constructo — script.js
   - fade-in animations
   - mobile nav toggle
   - lightbox for gallery
   - form -> WhatsApp / mailto
*/

(() => {
  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  faders.forEach(f => obs.observe(f));

  // Mobile nav toggle (simple)
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open'); // show/hide via CSS if you want
      navToggle.classList.toggle('open');
    });
  }

  // Lightbox for project images
  const lb = document.getElementById('lb');
  const lbImg = lb ? lb.querySelector('.lb-img') : null;
  const lbCaption = lb ? lb.querySelector('.lb-caption') : null;
  const lbClose = lb ? lb.querySelector('.lb-close') : null;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('figcaption').innerText || '';
      if (lb && lbImg) {
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        if (lbCaption) lbCaption.textContent = caption;
        lb.setAttribute('aria-hidden', 'false');
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') card.click();
    });
  });

  if (lbClose) lbClose.addEventListener('click', () => lb.setAttribute('aria-hidden', 'true'));
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) lb.setAttribute('aria-hidden', 'true');
    });
  }

  // Form handlers (WhatsApp and mailto)
  const form = document.getElementById('estimateForm');
  const btnWA = document.getElementById('sendWA');
  const btnMail = document.getElementById('sendMail');

  function getFormValues() {
    return {
      name: document.getElementById('c_name').value.trim(),
      phone: document.getElementById('c_phone').value.trim(),
      email: document.getElementById('c_email').value.trim(),
      service: document.getElementById('c_service').value,
      budget: document.getElementById('c_budget').value.trim(),
      message: document.getElementById('c_message').value.trim()
    };
  }

  function validate(data) {
    return data.name !== '' && data.phone !== '';
  }

  function openWhatsApp(data) {
    // replace PHONE with your number (no +, no spaces) if needed
    const PHONE = '22879963708';
    const text = `Bonjour Constructo,%0AJe suis ${encodeURIComponent(data.name)} (${encodeURIComponent(data.phone)}).%0AService: ${encodeURIComponent(data.service)}.%0ABudget estimé: ${encodeURIComponent(data.budget)} FCFA.%0A%0ADétails: ${encodeURIComponent(data.message)}`;
    const url = `https://wa.me/${PHONE}?text=${text}`;
    window.open(url, '_blank', 'noopener');
  }

  function openEmail(data) {
    const EMAIL = 'djaglijosephbenoit@gmail.com';
    const subject = encodeURIComponent('Demande de devis - Constructo');
    const body = `Nom: ${data.name}\nTéléphone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nBudget estimé: ${data.budget} FCFA\n\nDétails:\n${data.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  if (btnWA) {
    btnWA.addEventListener('click', () => {
      const data = getFormValues();
      if (!validate(data)) { alert('Merci de renseigner votre nom et téléphone.'); return; }
      openWhatsApp(data);
      form.reset();
    });
  }

  if (btnMail) {
    btnMail.addEventListener('click', () => {
      const data = getFormValues();
      if (!validate(data)) { alert('Merci de renseigner votre nom et téléphone.'); return; }
      openEmail(data);
      form.reset();
    });
  }

  // Accessibility: close lightbox with Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb && lb.getAttribute('aria-hidden') === 'false') {
      lb.setAttribute('aria-hidden', 'true');
    }
  });

})();
