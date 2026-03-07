(function() {
  const margin = { top: 30, right: 30, bottom: 60, left: 70 };
  const width = 750;
  const height = 420;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
    year: +d.Year,
    price: +d["Average Price (notTas-Snowy)"]
  })).then(data => {
    data = data.filter(d => !isNaN(d.year) && !isNaN(d.price));

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, innerW]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price) * 1.1])
      .range([innerH, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#e0e0e0");
    g.select(".grid .domain").remove();

    // Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // Axis labels
    svg.append("text")
      .attr("x", margin.left + innerW / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#555")
      .text("Year");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerH / 2))
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#555")
      .text("Avg Price ($ per MWh)");

    // Area fill
    const area = d3.area()
      .x(d => x(d.year))
      .y0(innerH)
      .y1(d => y(d.price))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "rgba(70,130,180,0.15)")
      .attr("d", area);

    // Line
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.price))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4682b4")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Dots + tooltip
    g.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.price))
      .attr("r", 4)
      .attr("fill", "#4682b4")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 6);
        tooltip.transition().duration(150).style("opacity", 1);
        tooltip.html(`<strong>${d.year}</strong><br>$${d.price.toFixed(2)} / MWh`)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 4);
        tooltip.transition().duration(200).style("opacity", 0);
      });
  });
})();
