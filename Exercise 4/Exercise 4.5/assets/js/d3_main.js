/**
 * Appliance Energy Consumption Australia
 * COS30045 - Data Visualisation
 * Exercise 4.5: D3 Binding and Drawing with Data
 */

// Global SVG reference
let svg;

document.addEventListener("DOMContentLoaded", () => {
  // Create responsive SVG container with viewBox & boundary border
  svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

  // Load CSV data and convert count to a numeric type
  d3.csv("data/Exercise 4.3_CSV_Export.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    // Inspect dataset summary metrics
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));

    // Sort descending by count
    data.sort((a, b) => b.count - a.count);

    // Call chart building function
    drawBarChart(data);
  }).catch(error => {
    console.error("Error loading CSV file:", error);
  });
});

// ===================================================================
// Step 2 & 3: Bind data, set dimensions, and space out bars along y-axis
// ===================================================================
const drawBarChart = data => {
  const barHeight = 20;
  const barSpacing = 5; // Lab specification gap

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0)                                      // Keeps the start of the bars at x = 0
    .attr("y", (d, i) => i * (barHeight + barSpacing)); // Spaces bars out along the y-axis
};