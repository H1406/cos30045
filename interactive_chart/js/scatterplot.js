function drawScatterPlot(data) {

    // ---- Step 2.1: Set up chart area ----
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // IMPORTANT: use global innerChartS
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // ---- Step 2.3: Define scales ----
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => +d.energyConsumption);

    xScale.domain([0, maxStar]);
    yScale.domain([0, maxEnergy]);


    // ---- Step 2.4: Colour scale ----
    const colorScale = d3.scaleOrdinal()
        .domain(["LCD", "LED", "OLED"])
        .range([
            techColors["LCD"],
            techColors["LED"],
            techColors["OLED"]
        ]);


    // ---- Step 2.5: Draw circles ----
    innerChartS.selectAll(".point")
        .data(data)
        .join("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.star))
        .attr("cy", d => yScale(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);


    // ---- Step 2.6: Bottom axis ----
    innerChartS.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .text("Star Rating");


    // ---- Step 2.6: Left axis ----
    innerChartS.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale));

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");


    // ---- Create tooltip and mouse interaction ----
    createTooltip();
    handleMouseEvents();
    drawLegend();
}

function createTooltip() {

    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", "#333")
        .attr("opacity", 0.85);

    tooltip.append("text")
        .attr("class", "tooltip-text")
        .attr("x", 8)
        .attr("y", 18)
        .attr("fill", "white")
        .style("font-size", "12px");
}
function handleMouseEvents() {

    const tooltip = innerChartS.select(".tooltip");
    const tooltipText = innerChartS.select(".tooltip-text");

    innerChartS.selectAll(".point")

        .on("mouseenter", function(e, d) {

            const circle = d3.select(this);

            const cx = +circle.attr("cx");
            const cy = +circle.attr("cy");

            tooltipText.text(`${d.screenSize}"`);

            tooltip
                .attr("transform", `translate(${cx + 10}, ${cy - 30})`)
                .transition()
                .duration(150)
                .style("opacity", 1);
        })

        .on("mouseleave", function() {

            tooltip
                .transition()
                .duration(150)
                .style("opacity", 0)
                .attr("transform", "translate(-100,-100)");
        });
}

function drawLegend() {

    const legendData = ["LED", "LCD", "OLED"];

    const legend = innerChartS.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${innerWidth - 90}, 10)`);

    const legendItem = legend.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItem.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => techColors[d]);

    legendItem.append("text")
        .attr("x", 16)
        .attr("y", 9)
        .style("font-size", "12px")
        .text(d => d);
}