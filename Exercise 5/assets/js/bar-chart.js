
// Step 1: Load and clean data (same procedure as Exercise 4.4)
d3.csv("assets/data/data_5_1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech,
    Energy_Consumption: +d.Energy_Consumption // Convert string to number
  };
}).then(data => {
  // Step 2: Verify strings and numbers in console
  console.log(data);

  // Step 3: Sort descending to match the visual order (LED: 369, OLED: 362, LCD: 335)
  data.sort((a, b) => d3.descending(a.Energy_Consumption, b.Energy_Consumption));

  // Step 4: Draw chart
  drawBarChart(data);
}).catch(error => {
  console.error("Error reading CSV file:", error);
});

// Set up function and margins matching Dufour & Meeks (2024) Ch 4
const drawBarChart = data => {
  // Balanced margins to prevent right-edge clipping and give top title space
  const margin = { top: 50, right: 40, bottom: 40, left: 50 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Clear existing chart if re-rendering
  d3.select("#bar-chart").selectAll("*").remove();

  // Add the svg container for our chart
  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  // Create inner chart group and apply margins
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.15);

  // Set the top limit of the Y-axis directly to 400
  const yScale = d3.scaleLinear()
    .domain([0, 400])
    .range([innerHeight, 0]);

  // Calculate the x and y axis
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d => {
      if (d === "lcd led") return "LED";
      return d.toUpperCase();
    });

  const leftAxis = d3.axisLeft(yScale).ticks(8);

  // Add axes to innerChart
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis)
    .selectAll("text")
    .style("font-size", "14px");

  innerChart
    .append("g")
    .call(leftAxis)
    .selectAll("text")
    .style("font-size", "12px");

  // Add axis title positioned safely above the bars
  innerChart
    .append("text")
    .text("Energy Consumption (kWh)")
    .attr("x", -margin.left + 10)
    .attr("y", -20)
    .attr("text-anchor", "start")
    .style("font-size", "15px")
    .style("font-weight", "600")
    .style("font-family", "sans-serif");

  // Draw bars
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("fill", "green");

  // Add value labels on top of bars
  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Energy_Consumption) - 8)
    .attr("text-anchor", "middle")
    .style("font-size", "13px")
    .style("font-family", "sans-serif")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};

//Exercise 5.2: Spot Power Prices Line Chart (1998 - 2024)
// Step 1: Load and parse the CSV data
d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
  // Grab the year value regardless of key capitalization
  const rawYear = d.Year || d.year;

  // Dynamically extract the last column or specific average keys
  const keys = Object.keys(d);
  const lastKey = keys[keys.length - 1];
  const rawPrice = d.averagePrice || d.Average || d["Average Price"] || d[lastKey];

  return {
    year: +rawYear,
    averagePrice: +rawPrice
  };
}).then(data => {
  // Filter out any potential empty/trailing rows
  const cleanData = data.filter(d => !isNaN(d.year) && !isNaN(d.averagePrice));

  // Step 2: Output to console to verify 27 objects with numbers
  console.log("5.2 Spot Prices Clean Data:", cleanData);

  // Step 3: Draw line chart
  drawLineChart(cleanData);
}).catch(error => {
  console.error("Error reading ARE_Spot_Prices.csv:", error);
});

// Set up function and margins matching Exercise 5.1
const drawLineChart = data => {
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Clear existing container before drawing
  d3.select("#line-chart").selectAll("*").remove();

  // Add the svg container for our chart
  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Create inner chart group and apply margins
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0]);

  // Set up axes
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d")); // Format ticks as integers using "d"

  const leftAxis = d3.axisLeft(yScale);

  // Append axes to innerChart
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart
    .append("g")
    .call(leftAxis);

  // Line generator mapping coordinates via scales
  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  // Append path for the line
  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "green");

  // Append scatter plot circles
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 4)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("fill", "green");
};

//Exercise 5.3: Screen Size Share Donut Chart (Polished Edition)

// Step 1: Load and parse the dataset
d3.csv("assets/data/data_5_3.csv", d => {
  return {
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };
}).then(data => {
  console.log("5.3 Donut Chart Clean Data:", data);
  drawDonutChart(data);
}).catch(error => {
  console.error("Error reading data_5_3.csv:", error);
});

// Set up drawing function
const drawDonutChart = data => {
  // Sizing & coordinates
  const width = 1000;
  const height = 500;
  
  // Center donut slightly to the left (x: 400) to leave comfortable space for the legend on the right
  const centerX = 420;
  const centerY = height / 2;
  const radius = Math.min(width * 0.7, height) / 2 - 35;

  // Clear existing container before drawing
  d3.select("#donut-chart").selectAll("*").remove();

  // Create SVG
  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("font-family", "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif");

  // Calculate total count for percentages & KPI center
  const totalCount = d3.sum(data, d => d.Count);

  // Modern, high-contrast palette
  const modernPalette = ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"];
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(modernPalette);

  // Pie layout maintaining order
  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null);

  // Arc generator with rounded corners and clean segment separation
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.62)
    .outerRadius(radius)
    .padAngle(0.025)
    .cornerRadius(8);

  // Hover state generator
  const arcHover = d3.arc()
    .innerRadius(radius * 0.60)
    .outerRadius(radius * 1.05)
    .padAngle(0.025)
    .cornerRadius(8);

  // Main donut chart group
  const chartGroup = svg
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);

  // Draw donut slices
  const paths = chartGroup
    .selectAll(".slice")
    .data(pie(data))
    .join("path")
    .attr("class", "slice")
    .attr("d", arcGenerator)
    .attr("fill", d => color(d.data.Screensize_Category))
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2)
    .style("cursor", "pointer")
    .style("transition", "all 0.25s ease");

  // Interactive Hover Effects
  paths
    .on("mouseenter", function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arcHover)
        .style("filter", "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.18))");

      // Update center KPI text dynamically on hover
      centerCount.text(d.data.Count.toLocaleString());
      centerLabel.text(`${d.data.Screensize_Category} TVs`);
    })
    .on("mouseleave", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arcGenerator)
        .style("filter", "none");

      // Reset center KPI text
      centerCount.text(totalCount.toLocaleString());
      centerLabel.text("Total TVs Logged");
    });

  // Centered slice labels (Category + Percentage)
  const labelsGroup = chartGroup
    .selectAll(".slice-label-group")
    .data(pie(data))
    .join("g")
    .attr("class", "slice-label-group")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .style("pointer-events", "none");

  // 1. Category Name
  labelsGroup
    .append("text")
    .text(d => d.data.Screensize_Category.charAt(0).toUpperCase() + d.data.Screensize_Category.slice(1))
    .attr("text-anchor", "middle")
    .attr("dy", "-0.2em")
    .style("fill", "#ffffff")
    .style("font-size", "14px")
    .style("font-weight", "700")
    .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.6))");

  // 2. Percentage Share
  labelsGroup
    .append("text")
    .text(d => `${((d.data.Count / totalCount) * 100).toFixed(1)}%`)
    .attr("text-anchor", "middle")
    .attr("dy", "1.1em")
    .style("fill", "rgba(255, 255, 255, 0.95)")
    .style("font-size", "12px")
    .style("font-weight", "500")
    .style("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.6))");

  // Center KPI Summary Card (Hollow Middle)
  const centerGroup = chartGroup
    .append("g")
    .attr("text-anchor", "middle");

  const centerCount = centerGroup
    .append("text")
    .attr("dy", "0.05em")
    .text(totalCount.toLocaleString())
    .style("font-size", "34px")
    .style("font-weight", "800")
    .style("fill", "#0f172a");

  const centerLabel = centerGroup
    .append("text")
    .attr("dy", "2.1em")
    .text("Total TVs Logged")
    .style("font-size", "12px")
    .style("font-weight", "600")
    .style("letter-spacing", "0.04em")
    .style("fill", "#64748b")
    .style("text-transform", "uppercase");

  // Side Legend Group
  const legendX = 730;
  const legendY = height / 2 - (data.length * 48) / 2;

  const legend = svg
    .append("g")
    .attr("transform", `translate(${legendX}, ${legendY})`);

  // Legend Title
  legend
    .append("text")
    .attr("x", 0)
    .attr("y", -14)
    .text("SCREEN SIZE SEGMENTS")
    .style("font-size", "11px")
    .style("font-weight", "700")
    .style("letter-spacing", "0.06em")
    .style("fill", "#94a3b8");

  // Legend Items
  const legendItems = legend
    .selectAll(".legend-item")
    .data(data)
    .join("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 44})`);

  // Pill Indicator
  legendItems
    .append("rect")
    .attr("width", 16)
    .attr("height", 16)
    .attr("rx", 4)
    .attr("fill", d => color(d.Screensize_Category));

  // Category Title
  legendItems
    .append("text")
    .attr("x", 28)
    .attr("y", 9)
    .text(d => d.Screensize_Category.charAt(0).toUpperCase() + d.Screensize_Category.slice(1))
    .style("font-size", "14px")
    .style("font-weight", "600")
    .style("fill", "#1e293b");

  // Count Subtitle
  legendItems
    .append("text")
    .attr("x", 28)
    .attr("y", 24)
    .text(d => `${d.Count.toLocaleString()} models (${((d.Count / totalCount) * 100).toFixed(1)}%)`)
    .style("font-size", "12px")
    .style("fill", "#64748b");
};