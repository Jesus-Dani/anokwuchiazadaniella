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
  }

  // ---- hero split interaction ----
  var wrap = document.getElementById('hero');
  if (wrap) {
    var panel = document.getElementById('engineerPanel');
    var orb = document.getElementById('orb');
    var hint = document.getElementById('hint');
    if (!reduceMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      panel.style.transition = 'clip-path .18s ease-out';
      orb.style.transition = 'left .18s ease-out';
      wrap.addEventListener('mousemove', function (e) {
        var rect = wrap.getBoundingClientRect();
        var pct = ((e.clientX - rect.left) / rect.width) * 100;
        pct = Math.max(28, Math.min(72, pct));
        panel.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
        orb.style.left = pct + '%';
        if (hint) hint.style.opacity = '0';
      });
      wrap.addEventListener('mouseleave', function () {
        panel.style.clipPath = 'inset(0 0 0 50%)';
        orb.style.left = '50%';
        if (hint) hint.style.opacity = '1';
      });
    } else if (hint) {
      hint.style.display = 'none';
    }

    // ---- stat counter ----
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

  function encode(data) {
    return Object.keys(data)
      .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]); })
      .join('&');
  }

  document.querySelectorAll('form[data-netlify-ajax]').forEach(function (form) {
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

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      })
        .then(function () {
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
})();
