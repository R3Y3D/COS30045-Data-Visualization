/**
 * Appliance Energy Consumption Australia
 * COS30045 - Data Visualisation
 * Exercise 4.7: Adding Labels to Bar Chart
 */

// Global SVG reference
let svg;

document.addEventListener("DOMContentLoaded", () => {
  // SVG container with viewBox & boundary border
  svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 600 1600")
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
// Exercise 4.7: Group elements, shifted bars, and text labels
// ===================================================================
const drawBarChart = data => {
  // Step 1: Linear scale for continuous count data (x-axis)
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);

  // Step 2: Band scale for discrete brand categories (y-axis)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 1600])
    .paddingInner(0.2);

  // Step 2: Create a <g> group for each data entry translated on the y-axis
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Step 1 & 3: Append <rect> bars shifted 100px to the right with y set to 0
  barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 100)                      // Leaves 100px room on the left for brand labels
    .attr("y", 0)                        // y is handled by the parent group translate
    .attr("width", d => xScale(d.count)) // Scaled width
    .attr("height", yScale.bandwidth())  // Scaled height
    .attr("fill", "blue");

  // Step 4: Add right-aligned brand category text
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 90)                       // Sits just inside the 100px left margin
    .attr("y", yScale.bandwidth() / 2 + 4) // Centered vertically relative to the bar
    .attr("text-anchor", "end")          // Right-aligns text against the margin
    .style("font-size", "13px")
    .style("fill", "#333333");

  // Step 5: Add numeric count label at the end of each bar
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 8) // Offset 100px start + bar width + 8px gap
    .attr("y", yScale.bandwidth() / 2 + 4)     // Centered vertically relative to the bar
    .attr("text-anchor", "start")
    .style("font-size", "13px")
    .style("fill", "#333333");
};