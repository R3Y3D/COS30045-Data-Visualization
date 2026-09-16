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
 * Appliance Energy Consumption Australia
 * COS30045 - Data Visualisation
 * Exercise 4.3: D3 Data Binding & Visualisation Setup
 */

document.addEventListener("DOMContentLoaded", () => {
  // Step 2: Create responsive SVG container with viewBox & temporary debug border
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

  // Step 3: Append test rectangle with hard-coded attributes
  svg
    .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 414)
      .attr("height", 16)
      .attr("fill", "blue");
});