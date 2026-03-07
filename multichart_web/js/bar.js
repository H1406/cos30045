(function() {
  const margin = { top: 30, right: 40, bottom: 50, left: 80 };
  const width = 600;
  const height = 300;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const colors = ["#4682b4", "#e8833a", "#6bb35a"];

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    data.forEach(d => d.energy = +d.energy);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.energy) * 1.1])
      .range([0, innerW]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.Screen_Tech))
      .range([0, innerH])
      .padding(0.35);

    // Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(6));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // Axis label
    svg.append("text")
      .attr("x", margin.left + innerW / 2)
      .attr("y", height - 8)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#555")
      .text("Avg Energy Consumption (kWh/year)");

    // Bars
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0)
      .attr("y", d => y(d.Screen_Tech))
      .attr("width", d => x(d.energy))
      .attr("height", y.bandwidth())
      .attr("rx", 4)
      .attr("fill", (d, i) => colors[i])
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 0.75);
        tooltip.transition().duration(150).style("opacity", 1);
        tooltip.html(`<strong>${d.Screen_Tech}</strong><br>${d.energy.toFixed(1)} kWh/yr`)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 1);
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Value labels
    g.selectAll(".bar-label")
      .data(data)
      .join("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.energy) + 6)
      .attr("y", d => y(d.Screen_Tech) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("font-size", "12px")
      .attr("fill", "#555")
      .text(d => d.energy.toFixed(1));
  });
})();
