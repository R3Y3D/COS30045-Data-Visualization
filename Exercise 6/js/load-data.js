d3.csv("data/W6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  console.log("Loaded rows:", data.length);

  drawHistogram(data);
  populateFilters(data);

  drawScatterplot(data);

  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading data:", error);
});