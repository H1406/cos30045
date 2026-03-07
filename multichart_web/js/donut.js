(function() {
  const width = 500;
  const height = 400;
  const radius = Math.min(width, height) / 2 - 20;
  const colors = ["#4682b4", "#e8833a", "#6bb35a"];

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width + 180} ${height}`);

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    const parsed = data.map(d => ({
      tech: d.Screen_Tech,
      energy: +d["Mean(Labelled energy consumption (kWh/year))"]
    }));

    const pie = d3.pie().value(d => d.energy).sort(null);
    const total = d3.sum(parsed, d => d.energy);

    const arc = d3.arc()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);

    const arcHover = d3.arc()
      .innerRadius(radius * 0.55)
      .outerRadius(radius + 10);

    // Slices
    g.selectAll("path")
      .data(pie(parsed))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors[i])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(150).attr("d", arcHover);
        tooltip.transition().duration(150).style("opacity", 1);
        tooltip.html(`<strong>${d.data.tech}</strong><br>${d.data.energy.toFixed(1)} kWh/yr<br>${(d.data.energy / total * 100).toFixed(1)}%`)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).transition().duration(150).attr("d", arc);
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // Center label
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("font-size", "14px")
      .attr("fill", "#555")
      .text("Avg Energy");
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("font-size", "13px")
      .attr("fill", "#888")
      .text("by Screen Type");

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 20}, ${height / 2 - parsed.length * 15})`);

    parsed.forEach((d, i) => {
      const row = legend.append("g")
        .attr("transform", `translate(0, ${i * 30})`);
      row.append("rect")
        .attr("width", 16).attr("height", 16)
        .attr("rx", 3)
        .attr("fill", colors[i]);
      row.append("text")
        .attr("x", 22).attr("y", 13)
        .attr("font-size", "13px")
        .attr("fill", "#444")
        .text(`${d.tech} (${d.energy.toFixed(0)})`);
    });
  });
})();
