const drawScatterplot = (data) => {
  d3.select("#scatterplot").selectAll("*").remove();

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const validData = data.filter(d => !isNaN(d.star) && !isNaN(d.energyConsumption) && d.star > 0);

  const maxStar = d3.max(validData, d => d.star) || 8;
  const maxEnergy = d3.max(validData, d => d.energyConsumption) || 2700;

  xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth])
    .nice();

  yScaleS
    .domain([0, maxEnergy])
    .range([innerHeight, 0])
    .nice();

  colorScale
    .domain(Array.from(new Set(validData.map(d => d.screenTech))))
    .range(d3.schemeCategory10);

  innerChartS.selectAll("circle")
    .data(validData)
    .join("circle")
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("fill", d => colorScale(d.screenTech))
      .attr("r", 0)
      .attr("opacity", 0)
      .transition()
        .duration(600)
        .ease(d3.easeCubicInOut)
        .attr("r", 4)
        .attr("opacity", 0.5);

  const bottomAxis = d3.axisBottom(xScaleS).ticks(8);
  innerChartS.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScaleS).tickFormat(d3.format(","));
  innerChartS.append("g")
    .attr("class", "axis y-axis")
    .call(leftAxis);

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", -margin.left + 5)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .text("Labeled Energy Consumption (kWh/year)");

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Star Rating");

  const legend = svg.append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

  colorScale.domain().forEach((screenTech, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(screenTech));

    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .style("font-size", "12px")
      .text(screenTech);
  });
};