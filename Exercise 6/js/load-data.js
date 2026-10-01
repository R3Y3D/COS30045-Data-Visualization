d3.csv("data/W6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  console.log("Loaded rows:", data.length);

  // 1. Histogram & Filters
  drawHistogram(data);
  populateFilters(data);

  // 2. Scatterplot
  drawScatterplot(data);

  // 3. Tooltips & Listeners
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading data:", error);
});