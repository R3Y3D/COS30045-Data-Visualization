/**
 * Appliance Energy Consumption Website
 * Interactive Logic, Animation Handlers, Accordions, and Validation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicYear();
  initMobileNav();
  initScrollAnimations();
  initFaqAccordion();
  initEnergyCalculator();
});

/* ==========================================================================
   1. Dynamic Footer Year
   ========================================================================== */
function initDynamicYear() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   2. Mobile Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
}

/* ==========================================================================
   3. Scroll Reveal Animation Trigger
   ========================================================================== */
function initScrollAnimations() {
  const sections = document.querySelectorAll(".section, .card, .calculator-section");
  
  // Attach reveal class to elements
  sections.forEach((sec) => sec.classList.add("reveal"));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target); // Trigger animation once
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((sec) => observer.observe(sec));
}

/* ==========================================================================
   4. Smooth Accordion Behavior
   ========================================================================== */
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isAlreadyActive = item.classList.contains("active");

      // Close all open items
      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });

      // Toggle clicked item
      if (!isAlreadyActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ==========================================================================
   5. Calculator Logic & Dynamic Form Animation
   ========================================================================== */
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

    const isValid = validateCalculatorForm();
    if (!isValid) {
      resultsPanel.classList.add("hidden");
      return;
    }

    const watts = parseFloat(wattageInput.value);
    const hours = parseFloat(hoursInput.value);
    const centsPerKwh = parseFloat(priceInput.value);

    // Formula computations
    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30.4375;
    const yearlyKwh = dailyKwh * 365;

    const dollarsPerKwh = centsPerKwh / 100;
    const dailyCost = dailyKwh * dollarsPerKwh;
    const monthlyCost = monthlyKwh * dollarsPerKwh;
    const yearlyCost = yearlyKwh * dollarsPerKwh;

    // Update DOM
    document.getElementById("dailyKwh").textContent = `${dailyKwh.toFixed(2)} kWh`;
    document.getElementById("dailyCost").textContent = `$${dailyCost.toFixed(2)} / day`;

    document.getElementById("monthlyKwh").textContent = `${monthlyKwh.toFixed(2)} kWh`;
    document.getElementById("monthlyCost").textContent = `$${monthlyCost.toFixed(2)} / month`;

    document.getElementById("yearlyCost").textContent = `$${yearlyCost.toFixed(2)}`;
    document.getElementById("yearlyKwh").textContent = `${yearlyKwh.toFixed(1)} kWh / year`;

    // Re-trigger popup animation
    resultsPanel.classList.remove("hidden");
    resultsPanel.style.animation = "none";
    void resultsPanel.offsetWidth; // Force CSS reflow
    resultsPanel.style.animation = "popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    applianceSelect.value = "custom";
    clearAllErrors();
    resultsPanel.classList.add("hidden");
  });

  function validateCalculatorForm() {
    let valid = true;
    clearAllErrors();

    const wattsVal = parseFloat(wattageInput.value);
    if (isNaN(wattsVal) || wattsVal <= 0) {
      showError(wattageInput, "wattageError", "Please enter a valid power rating (> 0 Watts).");
      valid = false;
    }

    const hoursVal = parseFloat(hoursInput.value);
    if (isNaN(hoursVal) || hoursVal <= 0 || hoursVal > 24) {
      showError(hoursInput, "hoursError", "Please enter daily usage between 0.1 and 24 hours.");
      valid = false;
    }

    const priceVal = parseFloat(priceInput.value);
    if (isNaN(priceVal) || priceVal <= 0) {
      showError(priceInput, "priceError", "Please enter a valid electricity rate (cents/kWh).");
      valid = false;
    }

    return valid;
  }

  function showError(inputElem, errorSpanId, message) {
    inputElem.classList.remove("invalid-input");
    void inputElem.offsetWidth; // Trigger reflow for shake animation
    inputElem.classList.add("invalid-input");

    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = message;
  }

  function clearError(inputElem, errorSpanId) {
    inputElem.classList.remove("invalid-input");
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = "";
  }

  function clearAllErrors() {
    clearError(wattageInput, "wattageError");
    clearError(hoursInput, "hoursError");
    clearError(priceInput, "priceError");
  }
}