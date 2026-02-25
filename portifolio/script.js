// script.js
// Interactive enhancements for navigation and layout

// mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav");
if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
}

// theme toggle button
const themeToggle = document.querySelector(".theme-toggle");
function applyTheme(theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  if (themeToggle) {
    // show moon when light theme, sun when dark
    themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
  }
}

// background particle canvas
const bgCanvas = document.createElement("canvas");
bgCanvas.id = "bgCanvas";
bgCanvas.style.position = "fixed";
bgCanvas.style.top = "0";
bgCanvas.style.left = "0";
bgCanvas.style.width = "100%";
bgCanvas.style.height = "100%";
bgCanvas.style.pointerEvents = "none";
bgCanvas.style.zIndex = "0";
document.body.appendChild(bgCanvas);
const bctx = bgCanvas.getContext("2d");
let bgParticles = [];
function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
  resizeBg();
  initBgParticles();
});
resizeBg();

function initBgParticles() {
  bgParticles = [];
  const count = Math.floor((bgCanvas.width * bgCanvas.height) / 20000);
  for (let i = 0; i < count; i++) {
    bgParticles.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: 20 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: 0.05 + Math.random() * 0.1,
    });
  }
}

function drawBg() {
  bctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgParticles.forEach((p) => {
    bctx.beginPath();
    bctx.fillStyle = `rgba(77,208,225,${p.alpha})`; /* light blue-ish particles */
    bctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    bctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -p.size) p.x = bgCanvas.width + p.size;
    if (p.x > bgCanvas.width + p.size) p.x = -p.size;
    if (p.y < -p.size) p.y = bgCanvas.height + p.size;
    if (p.y > bgCanvas.height + p.size) p.y = -p.size;
  });
  requestAnimationFrame(drawBg);
}

initBgParticles();
drawBg();

// mouse trail canvas
const trailCanvas = document.createElement("canvas");
trailCanvas.id = "trailCanvas";
trailCanvas.style.position = "fixed";
trailCanvas.style.top = "0";
trailCanvas.style.left = "0";
trailCanvas.style.width = "100%";
trailCanvas.style.height = "100%";
trailCanvas.style.pointerEvents = "none";
trailCanvas.style.zIndex = "999";
document.body.appendChild(trailCanvas);
const tctx = trailCanvas.getContext("2d");
let particles = [];
function resizeTrail() {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeTrail);
resizeTrail();

window.addEventListener("mousemove", (e) => {
  particles.push({
    x: e.clientX,
    y: e.clientY,
    alpha: 1,
    size: 8 + Math.random() * 4,
  });
});

function drawTrail() {
  tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    tctx.beginPath();
    tctx.fillStyle = `rgba(255,107,53,${p.alpha})`; /* orange trail */
    tctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    tctx.fill();
    p.alpha -= 0.02;
    p.size *= 0.96;
    if (p.alpha <= 0.02) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(drawTrail);
}
drawTrail();
function loadTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) {
    applyTheme(stored);
  } else {
    const sys = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    applyTheme(sys);
  }
}

// update theme if system preference changes
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => {
    const stored = localStorage.getItem("theme");
    if (!stored) {
      applyTheme(e.matches ? "light" : "dark");
    }
  });
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.contains("light");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}
loadTheme();

// section visibility management for single-page navigation
const sections = document.querySelectorAll(".page");
function showSection(id) {
  sections.forEach((sec) => {
    if (sec.id === id) {
      sec.classList.remove("hidden");
    } else {
      sec.classList.add("hidden");
    }
  });
}

// background effect cycling
const effectButton = document.querySelector(".effect-toggle");
const effects = ["sine", "effect2"]; // 'sine' handled in JS
let currentEffect = 0;
let sinAnimId = null;
function startSinGradient() {
  if (sinAnimId) return;
  function step() {
    const t = Date.now() * 0.0003;
    // compute three dark colors oscillating
    const r1 = Math.floor(0 + 20 * (Math.sin(t) * 0.5 + 0.5));
    const g1 = Math.floor(0 + 20 * (Math.sin(t + 2) * 0.5 + 0.5));
    const b1 = Math.floor(63 + 40 * (Math.sin(t + 4) * 0.5 + 0.5));
    const r2 = Math.floor(0 + 30 * (Math.sin(t + 1) * 0.5 + 0.5));
    const g2 = Math.floor(0 + 30 * (Math.sin(t + 3) * 0.5 + 0.5));
    const b2 = Math.floor(20 + 50 * (Math.sin(t + 5) * 0.5 + 0.5));
    const r3 = Math.floor(50 + 30 * (Math.sin(t + 6) * 0.5 + 0.5));
    const g3 = Math.floor(50 + 30 * (Math.sin(t + 8) * 0.5 + 0.5));
    const b3 = Math.floor(50 + 30 * (Math.sin(t + 10) * 0.5 + 0.5));
    document.body.style.background = `linear-gradient(45deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}), rgb(${r3},${g3},${b3}))`;
    sinAnimId = requestAnimationFrame(step);
  }
  sinAnimId = requestAnimationFrame(step);
}
function stopSinGradient() {
  if (sinAnimId) cancelAnimationFrame(sinAnimId);
  sinAnimId = null;
}
function applyEffect(index) {
  // remove all effect classes
  document.body.classList.remove("effect1", "effect2");
  if (effects[index] === "sine") {
    startSinGradient();
  } else {
    stopSinGradient();
    document.body.classList.add(effects[index]);
  }
}
if (effectButton) {
  effectButton.addEventListener("click", () => {
    currentEffect = (currentEffect + 1) % effects.length;
    applyEffect(currentEffect);
  });
}
// start with first effect
applyEffect(currentEffect);

// scroll-triggered animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

function initScrollAnimations() {
  document
    .querySelectorAll("[data-scroll]")
    .forEach((el) => observer.observe(el));
}

// parallax effect for hero
function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  window.addEventListener("scroll", () => {
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
  });
}

// handle nav links and project cards
function setupNavHandlers() {
  document.querySelectorAll("nav a[data-target]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      if (target) {
        showSection(target);
        navigation.classList.remove("open");
      }
    });
  });

  document.querySelectorAll(".card[data-target]").forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      if (target) showSection(target);
    });
  });
}

setupNavHandlers();

// click logo to go home (after showSection is defined)
const logo = document.querySelector("header h1");
if (logo) {
  logo.addEventListener("click", () => {
    showSection("home");
    navigation.classList.remove("open");
  });
}

// initialize extras
initScrollAnimations();
initParallax();

// default view
showSection("home");
