const populateFilters = (data) => {
  const updateHistogram = (filterId, rawData) => {
    const updatedData = filterId === "all"
      ? rawData
      : rawData.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
  };

  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (!d.isActive) {
          filters_screen.forEach(f => f.isActive = (f.id === d.id));
          d3.selectAll("#filters_screen .filter")
            .classed("active", f => f.id === d.id);
          updateHistogram(d.id, data);
        }
      });
};

const createTooltip = () => {
  if (!innerChartS) return;

  innerChartS.selectAll(".tooltip").remove();

  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  tooltip.append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
  d3.selectAll("#scatterplot circle")
    .on("mouseenter", (e, d) => {
      d3.select(".tooltip text").text(d.screenSize);

      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");

      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", `translate(0, 500)`);
    });
};