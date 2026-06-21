/* Beach Borders Curbing & Landscape — interactions */
(function () {
  'use strict';

  /* --- Sticky header background on scroll --- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile nav toggle --- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Animated stat counters --- */
  var stats = document.querySelectorAll('.stat');
  function animateStat(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && stats.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(function (s) { io.observe(s); });
  } else {
    stats.forEach(function (s) { s.textContent = parseInt(s.getAttribute('data-count'), 10).toLocaleString(); });
  }

  /* --- Current year in footer --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Friendly form submit (works once Formspree ID is added) --- */
  var form = document.getElementById('estimateForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.getAttribute('action').indexOf('YOUR_FORM_ID') !== -1) {
        // Form not wired yet — fall back to a phone nudge instead of erroring.
        e.preventDefault();
        alert('Thanks! The contact form isn’t connected yet.\nFor now, please call or text (843) 283-4770 and we’ll get right back to you.');
      }
      // Once a real Formspree ID is in place, this lets the POST go through normally.
    });
  }
})();
