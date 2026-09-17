/**
 * Appliance Energy Consumption Australia
 * COS30045 - Data Visualisation
 * Exercise 4.6: Scaling Charts (scaleLinear & scaleBand)
 */

// Global SVG reference
let svg;

document.addEventListener("DOMContentLoaded", () => {
  // Preparation: Updated viewBox width to 500
  svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 1600")
      .style("border", "1px solid black");

  // Load CSV data and convert count to a numeric type
  d3.csv("data/Exercise 4.3_CSV_Export.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    // Sort descending by count
    data.sort((a, b) => b.count - a.count);

    // Call chart building function
    drawBarChart(data);
  }).catch(error => {
    console.error("Error loading CSV file:", error);
  });
});

// ===================================================================
// Exercise 4.6: Scaling chart bars with xScale and yScale
// ===================================================================
const drawBarChart = data => {
  // Step 1: Linear scale for continuous count data (x-axis)
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  // Step 2 (Band Scale): Band scale for discrete brand categories (y-axis)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 1600])
    .paddingInner(0.2); // Adds relative gap spacing between bars

  // Bind data and apply scales
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))        // Dynamic y-position based on band scale
    .attr("width", d => xScale(d.count))    // Dynamic bar width based on linear scale
    .attr("height", yScale.bandwidth())     // Dynamic bar thickness based on bandwidth
    .attr("fill", "blue");
};