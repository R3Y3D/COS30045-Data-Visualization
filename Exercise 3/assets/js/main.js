/**
 * Appliance Energy Consumption Website
 * Main UI Logic, Scroll Triggers, Accordion, and Energy Calculator.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mark body as JS-ready so animations only hide elements when JS is active
  document.body.classList.add("js-loaded");

  initDynamicYear();
  initMobileNav();
  initScrollAnimations();
  initFaqAccordion();
  initEnergyCalculator();
});

/* Dynamically update copyright year */
function initDynamicYear() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* Mobile Hamburger Menu */
function initMobileNav() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
}

/* Scroll Triggered Element Reveal */
function initScrollAnimations() {
  const targets = document.querySelectorAll(".section, .card, .calculator-section, .story-chapter");
  targets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    targets.forEach((el) => el.classList.add("active"));
  }
}

/* Accordion Component */
function initFaqAccordion() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isAlreadyActive = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        const btn = i.querySelector(".accordion-header");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!isAlreadyActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* Energy Calculator with Validation */
function initEnergyCalculator() {
  const form = document.getElementById("energyCalcForm");
  const applianceSelect = document.getElementById("applianceSelect");
  const wattageInput = document.getElementById("wattageInput");
  const hoursInput = document.getElementById("hoursInput");
  const priceInput = document.getElementById("priceInput");
  const resultsPanel = document.getElementById("calcResultsPanel");
  const resetBtn = document.getElementById("resetCalcBtn");

  if (!form) return;

  applianceSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val !== "custom") {
      wattageInput.value = val;
      clearError(wattageInput, "wattageError");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      resultsPanel.classList.add("hidden");
      return;
    }

    const watts = parseFloat(wattageInput.value);
    const hours = parseFloat(hoursInput.value);
    const cents = parseFloat(priceInput.value);

    // kWh Calculations
    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30.4375;
    const yearlyKwh = dailyKwh * 365;

    const rate = cents / 100;
    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const yearlyCost = yearlyKwh * rate;

    document.getElementById("dailyKwh").textContent = `${dailyKwh.toFixed(2)} kWh`;
    document.getElementById("dailyCost").textContent = `$${dailyCost.toFixed(2)} / day`;

    document.getElementById("monthlyKwh").textContent = `${monthlyKwh.toFixed(2)} kWh`;
    document.getElementById("monthlyCost").textContent = `$${monthlyCost.toFixed(2)} / month`;

    document.getElementById("yearlyCost").textContent = `$${yearlyCost.toFixed(2)}`;
    document.getElementById("yearlyKwh").textContent = `${yearlyKwh.toFixed(1)} kWh / year`;

    resultsPanel.classList.remove("hidden");
    resultsPanel.style.animation = "none";
    void resultsPanel.offsetWidth;
    resultsPanel.style.animation = "popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    applianceSelect.value = "custom";
    clearAllErrors();
    resultsPanel.classList.add("hidden");
  });

  function validateForm() {
    let valid = true;
    clearAllErrors();

    const w = parseFloat(wattageInput.value);
    if (isNaN(w) || w <= 0) {
      showError(wattageInput, "wattageError", "Please enter a positive wattage.");
      valid = false;
    }

    const h = parseFloat(hoursInput.value);
    if (isNaN(h) || h <= 0 || h > 24) {
      showError(hoursInput, "hoursError", "Hours must be between 0.1 and 24.");
      valid = false;
    }

    const p = parseFloat(priceInput.value);
    if (isNaN(p) || p <= 0) {
      showError(priceInput, "priceError", "Please enter a valid rate (cents/kWh).");
      valid = false;
    }

    return valid;
  }

  function showError(input, errorSpanId, msg) {
    input.classList.remove("invalid-input");
    void input.offsetWidth;
    input.classList.add("invalid-input");
    const span = document.getElementById(errorSpanId);
    if (span) span.textContent = msg;
  }

  function clearError(input, errorSpanId) {
    input.classList.remove("invalid-input");
    const span = document.getElementById(errorSpanId);
    if (span) span.textContent = "";
  }

  function clearAllErrors() {
    clearError(wattageInput, "wattageError");
    clearError(hoursInput, "hoursError");
    clearError(priceInput, "priceError");
  }
}