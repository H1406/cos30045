(function() {
  const margin = { top: 40, right: 30, bottom: 60, left: 70 };
  const width = 700;
  const height = 450;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = d3.select("#scatter-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("data/Ex5_TV_energy.csv", d => ({
    star: +d.star2,
    energy: +d.energy_consumpt,
    brand: d.brand,
    screensize: +d.screensize
  })).then(data => {
    data = data.filter(d => !isNaN(d.star) && !isNaN(d.energy));

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.star) - 0.5, d3.max(data, d => d.star) + 0.5])
      .range([0, innerW]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energy) * 1.05])
      .range([innerH, 0]);

    // Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(8));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(8));

    // Axis labels
    svg.append("text")
      .attr("x", margin.left + innerW / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#555")
      .text("Star Rating");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerH / 2))
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#555")
      .text("Energy Consumption (kWh/year)");

    // Dots
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.star))
      .attr("cy", d => y(d.energy))
      .attr("r", 4.5)
      .attr("fill", "#4682b4")
      .attr("opacity", 0.55)
      .attr("stroke", "#2c5f8a")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 7).attr("opacity", 1);
        tooltip.transition().duration(150).style("opacity", 1);
        tooltip.html(`<strong>${d.brand}</strong><br>Star: ${d.star}<br>Energy: ${d.energy} kWh<br>Size: ${d.screensize}"`)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 4.5).attr("opacity", 0.55);
        tooltip.transition().duration(200).style("opacity", 0);
      });
  });
})();
