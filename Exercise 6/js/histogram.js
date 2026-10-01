const drawHistogram = (data) => {
  // Clear any existing chart elements before rendering
  d3.select("#histogram").selectAll("*").remove();

  // Set up the svg container
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Set up the inner chart group with margins
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Get the bins for our data set using the bin generator
  const bins = binGenerator(data); // save the bins into an array
  console.log(bins); // Log the bins to the console for debugging

  // calculate the minimum and maximum energy consumption values from the bins to set the xScale domain
  const minEng = bins[0].x0; // lower bound of the first bin
  const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin

  // calculate the maximum length of the bins to set the yScale domain
  const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

  console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

  // Set the domains and ranges for the x and y scales
  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); // Use the nice() method to round the y-axis values to a more human-readable format

  // Draw the bars of the histogram
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor) // Set the stroke color gives appearance of gap between bars
      .attr("stroke-width", 2);

  // --- Add X and Y Axes (as per Exercise 5.1 pattern) ---

  // X Axis (steps of 200 formatted with commas: 0, 200, 400 ... 2,800)
  const bottomAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(minEng, maxEng + 1, 200))
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Y Axis (ticks every 100 up to 1,400 with commas)
  const leftAxis = d3.axisLeft(yScale)
    .ticks(14)
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis y-axis")
    .call(leftAxis);

  // --- Axis Titles & Labels ---

  // Y-axis label ("Frequency")
  innerChart
    .append("text")
    .attr("class", "axis-label")
    .attr("x", -margin.left + 5)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .text("Frequency");

  // X-axis label ("Labeled Energy Consumption (kWh/year)")
  innerChart
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");
};