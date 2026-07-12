(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- nav active state ----
  var path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav-links a, .footer-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '/' && href === '/')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- mobile nav toggle ----
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      var isOpen = links.classList.contains('open');
      var clickedInsideMenu = links.contains(e.target) || toggle.contains(e.target);
      if (isOpen && !clickedInsideMenu) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- hero stat counter ----
  var wrap = document.getElementById('hero');
  if (wrap) {
    var statEl = document.getElementById('statNum');
    if (statEl) {
      var target = 600;
      if (reduceMotion) {
        statEl.textContent = '₦' + target + 'M';
      } else {
        var start = null;
        var duration = 800;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var val = Math.round(progress * target);
          statEl.textContent = '₦' + val + 'M';
          if (progress < 1) requestAnimationFrame(step);
        }
        var statObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              requestAnimationFrame(step);
              statObserver.disconnect();
            }
          });
        }, { threshold: 0.4 });
        statObserver.observe(wrap);
      }
    }
  }

  // ---- scroll reveals ----
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---- forms: validation, honeypot, AJAX submit, confirmation ----
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(field, message) {
    field.classList.add('invalid');
    var err = field.querySelector('.error');
    if (err) err.textContent = message;
  }
  function clearFieldError(field) {
    field.classList.remove('invalid');
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, textarea');
      if (!input) return;
      clearFieldError(field);
      if (input.hasAttribute('required') && !input.value.trim()) {
        showFieldError(field, 'This field is required.');
        valid = false;
      } else if (input.type === 'email' && input.value.trim() && !EMAIL_RE.test(input.value.trim())) {
        showFieldError(field, 'Enter a valid email address.');
        valid = false;
      }
    });
    return valid;
  }

  document.querySelectorAll('form[data-web3forms]').forEach(function (form) {
    var successEl = document.getElementById(form.dataset.successTarget);
    var submitBtn = form.querySelector('button[type="submit"], button.btn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // honeypot: if filled, silently drop (bot)
      var honeypot = form.querySelector('.hp-field input');
      if (honeypot && honeypot.value) return;

      if (!validateForm(form)) return;

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (!result.success) throw new Error(result.message || 'submission failed');
          if (successEl) successEl.classList.add('show');
          form.reset();
          form.style.display = 'none';
        })
        .catch(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = form.dataset.submitLabel || 'Submit'; }
          alert('Something went wrong sending this — please try again or email anokwudaniella@gmail.com directly.');
        });
    });
  });

  // ---- project popup previews (Built page) ----
  var modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    var modalBox = document.getElementById('modalBox');
    var modalContent = document.getElementById('modalContent');
    var modalClose = document.getElementById('modalClose');
    var lastFocused = null;

    function trapFocus(e) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      var focusable = modalBox.querySelectorAll('a[href], button');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function openModal(key) {
      var tpl = document.getElementById('modal-' + key);
      if (!tpl) return;
      modalContent.innerHTML = '';
      modalContent.appendChild(tpl.content.cloneNode(true));
      lastFocused = document.activeElement;
      modalOverlay.hidden = false;
      modalClose.focus();
      document.addEventListener('keydown', trapFocus);
    }

    function closeModal() {
      modalOverlay.hidden = true;
      document.removeEventListener('keydown', trapFocus);
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-modal]').forEach(function (trigger) {
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', function () { openModal(trigger.dataset.modal); });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(trigger.dataset.modal); }
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) closeModal(); });
  }

  // ---- whole-row external links (Ventures page) ----
  document.querySelectorAll('[data-external-link]').forEach(function (trigger) {
    var url = trigger.dataset.externalLink;
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'link');
    trigger.addEventListener('click', function () { window.open(url, '_blank', 'noopener,noreferrer'); });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer'); }
    });
  });
})();
