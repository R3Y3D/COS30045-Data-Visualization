const drawHistogram = (data) => {
  d3.select("#histogram").selectAll("*").remove();

  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const bins = binGenerator(data);
  console.log(bins);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;

  const binsMaxLength = d3.max(bins, d => d.length);

  console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2);

  const bottomAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(minEng, maxEng + 1, 200))
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale)
    .ticks(14)
    .tickFormat(d3.format(","));

  innerChart
    .append("g")
    .attr("class", "axis y-axis")
    .call(leftAxis);

  innerChart
    .append("text")
    .attr("class", "axis-label")
    .attr("x", -margin.left + 5)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .text("Frequency");

  innerChart
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");
};