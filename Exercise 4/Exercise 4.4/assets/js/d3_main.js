/**
 * Appliance Energy Consumption Australia
 * COS30045 - Data Visualisation
 * Exercise 4.3: D3 Data Binding & Visualisation Setup
 */

document.addEventListener("DOMContentLoaded", () => {
  // Step 2: Create responsive SVG container with viewBox & debug border
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

  // ===================================================================
  // Step 1 & 2: Load CSV and cast count attribute to number
  // ===================================================================
  d3.csv("data/Exercise 4.3_CSV_Export.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    // ===================================================================
    // Step 3: Dataset inspection & summary metrics
    // ===================================================================
    console.log("Raw dataset:", data);
    console.log("Record count (length):", data.length);
    console.log("Maximum count:", d3.max(data, d => d.count));
    console.log("Minimum count:", d3.min(data, d => d.count));
    console.log("Extent [min, max]:", d3.extent(data, d => d.count));

    // Sort data descending (highest count first)
    data.sort((a, b) => b.count - a.count);
    console.log("Sorted dataset (descending):", data);

    // Call chart rendering function inside the .then promise
    drawBarChart(data);
  }).catch(error => {
    console.error("Error loading CSV file:", error);
  });
});

// ===================================================================
// Placeholder function for Exercise 4.4 / upcoming chart generation
// ===================================================================
function drawBarChart(data) {
  console.log("drawBarChart called with data:", data);
  // Bar chart D3 data binding code will go here
}