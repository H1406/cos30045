function drawHistogram(data) {

    // ---- Step 6.1: Set up chart area ----
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // ---- Step 6.2: Generate bins ----
    const bins = binGenerator(data);
    console.log("Bins:", bins);

    // ---- Step 6.3: Define scales ----
    const minX0 = d3.min(bins, d => d.x0);
    const maxX1 = d3.max(bins, d => d.x1);
    const maxLength = d3.max(bins, d => d.length);

    xScale.domain([minX0, maxX1]);
    yScale.domain([0, maxLength]);

    // ---- Step 6.4: Draw bars ----
    svg.selectAll(".bar")
        .data(bins)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", techColors["all"])
        .attr("stroke", barStrokeColor)
        .attr("stroke-width", 1)
        .attr("rx", 2);

    // ---- Step 6.5: Bottom axis ----
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(10));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // ---- Step 6.6: Left axis ----
    svg.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Frequency");
}