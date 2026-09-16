/**
 * COS30045 - Data Visualisation
 * Exercise 4.2: D3 Implementation
 */

// Ensure D3 library loaded properly
console.log("D3 library version:", d3.version);

// Document ready wrapper for D3 logic
document.addEventListener("DOMContentLoaded", () => {
  console.log("D3 script initialized and ready.");
  
  // Your Step 2+ D3 selections and SVG manipulations will go here
});

/**
 * COS30045 - Data Visualisation
 * Exercise 4.2 - Step 2: Selecting and Styling HTML elements with D3
 */

// 1. Required core task: select the main <h1> and change its color to green
d3.select("h1")
  .style("color", "green");

// -------------------------------------------------------------------
// Experiments selecting other HTML elements & altering appearance
// -------------------------------------------------------------------

// 2. Select the hero paragraph and change its font weight & style
d3.select(".hero p")
  .style("font-style", "italic")
  .style("font-size", "1.25rem");

// 3. Select all section headings (<h2>) and change their color with multi-chaining
d3.selectAll(".section h2")
  .style("color", "#0077b6")
  .style("letter-spacing", "0.5px");

// 4. Select the primary CTA button and alter its styling dynamically
d3.select(".hero .btn-primary")
  .style("background-color", "#2a9d8f")
  .style("border", "2px solid #ffffff")
  .style("box-shadow", "0 6px 16px rgba(42, 157, 143, 0.4)");

// 5. Select the tariff card and add a distinct highlight border & background tint
d3.select(".card-grid .card:first-child")
  .style("border-left", "6px solid #ff9f1c")
  .style("background-color", "#fffbf5");

  // ===================================================================
// Step 3: Append elements using D3
// ===================================================================

// 1. Basic append: Selects the FIRST matching <div> on the page 
// and appends a <p> tag with text to the end of that div
d3.select("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!")
  .style("color", "#0077b6")
  .style("font-weight", "600");

// -------------------------------------------------------------------
// Experimenting with d3.selectAll("div") vs d3.select("div")
// -------------------------------------------------------------------

// If you run d3.selectAll("div").append("p"), D3 will append this paragraph 
// to EVERY SINGLE <div> present on the entire webpage:
/*
d3.selectAll("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!")
  .style("color", "#e76f51");
*/

// Targeted append: Usually in D3 projects, you target a specific container 
// (like a dedicated chart div or card) using its class or ID:
d3.select(".hero-content")
  .append("p")
  .text("💡 Pro-Tip: Energy-efficient appliances can save up to $300 a year.")
  .style("background", "rgba(255, 255, 255, 0.15)")
  .style("padding", "8px 16px")
  .style("border-radius", "6px")
  .style("margin-top", "12px");