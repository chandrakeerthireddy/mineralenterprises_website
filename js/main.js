document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".nav-mobile");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll progress bar */
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");
  document.body.prepend(progressBar);

  const heroBg = document.querySelector(".hero-bg");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 20);
    }

    if (heroBg && !prefersReducedMotion) {
      heroBg.style.transform = `translateY(${scrollTop * 0.35}px)`;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      toggle.classList.toggle("active");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  /* Scroll reveal */
  const revealSelectors = [
    "section .section-header",
    "section .about-grid",
    "section .about-content",
    "section .about-image",
    ".stats-bar",
    ".chain-track",
    ".advantages-grid",
    ".products-grid",
    ".app-scroll-track",
    ".content-grid",
    ".service-card",
    ".cert-grid",
    ".process-steps",
    ".contact-grid",
    ".product-card",
    ".advantage-card",
    ".value-card",
    ".cta-banner",
    ".markets-strip",
    ".section-cta",
    ".packaging-grid",
  ];

  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      if (el.classList.contains("about-image")) el.classList.add("reveal-left");
      if (el.classList.contains("about-content")) el.classList.add("reveal-right");
      if (el.classList.contains("products-grid") ||
          el.classList.contains("advantages-grid") ||
          el.classList.contains("app-scroll-track") ||
          el.classList.contains("packaging-grid") ||
          el.classList.contains("chain-track")) {
        el.classList.add("reveal-stagger");
        el.classList.remove("reveal");
      }
    });
  });

  /* Lazy image load fade-in */
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
      img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });
    }
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  /* Stat counters */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          const duration = 1800;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  }

  /* Smooth anchor scroll offset for fixed header */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header ? header.offsetHeight : 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });

  /* Applications horizontal scroll controls */
  const appTrack = document.getElementById("app-scroll-track");
  const appPrev = document.querySelector(".app-scroll-btn--prev");
  const appNext = document.querySelector(".app-scroll-btn--next");

  if (appTrack && appPrev && appNext) {
    const scrollStep = () => {
      const card = appTrack.querySelector(".app-card");
      return card ? card.offsetWidth + 20 : 360;
    };

    appPrev.addEventListener("click", () => {
      appTrack.scrollBy({ left: -scrollStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    appNext.addEventListener("click", () => {
      appTrack.scrollBy({ left: scrollStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    /* Subtle auto-nudge on first view */
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const nudgeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                appTrack.scrollBy({ left: 48, behavior: "smooth" });
                setTimeout(() => appTrack.scrollBy({ left: -48, behavior: "smooth" }), 600);
              }, 400);
              nudgeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      nudgeObserver.observe(appTrack);
    }
  }

  /* Contact form */
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        form.reset();
        setTimeout(() => success.classList.remove("show"), 5000);
      }
    });
  }
});
