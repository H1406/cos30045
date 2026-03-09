function populateFilters(data) {

    // ---- Screen Tech Buttons ----
    const screenContainer = d3.select("#filters_screen");

    screenContainer.selectAll("button")
        .data(filters_screen)
        .join("button")
        .attr("id", d => d.id)
        .classed("active", d => d.isActive)
        .text(d => d.label)
        .on("click", function (event, d) {
            filters_screen.forEach(f => f.isActive = false);
            d.isActive = true;
            screenContainer.selectAll("button")
                .classed("active", f => f.isActive);

            activeScreenTech = d.id;
            updateHistogram(data);
        });

    // ---- Screen Size Buttons ----
    const sizeContainer = d3.select("#filters_size");

    sizeContainer.selectAll("button")
        .data(filters_size)
        .join("button")
        .attr("id", d => d.id)
        .classed("active", d => d.isActive)
        .text(d => d.label)
        .on("click", function (event, d) {
            filters_size.forEach(f => f.isActive = false);
            d.isActive = true;
            sizeContainer.selectAll("button")
                .classed("active", f => f.isActive);

            activeScreenSize = d.value;
            updateHistogram(data);
        });

    // ---- Combined Update Function ----
//     function updateHistogram(data) {

//         // Apply both filters
//         let updatedData = data;

//         if (activeScreenTech !== "all") {
//             updatedData = updatedData.filter(d => d.screenTech === activeScreenTech);
//         }
//         if (activeScreenSize !== null) {
//             updatedData = updatedData.filter(d => d.screenSize === activeScreenSize);
//         }

//         // Regenerate bins from filtered data
//         const updatedBins = binGenerator(updatedData);

//         // Update y-scale domain
//         yScale.domain([0, d3.max(updatedBins, d => d.length) || 0]);

//         // Determine bar colour
//         const fillColor = techColors[activeScreenTech] || techColors["all"];

//         // Get reference to the chart group
//         const svg = d3.select("#histogram svg g");

//         // Update bars with transition
//         svg.selectAll(".bar")
//             .data(updatedBins)
//             .join(
//                 enter => enter.append("rect")
//                     .attr("class", "bar")
//                     .attr("x", d => xScale(d.x0))
//                     .attr("y", innerHeight)
//                     .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
//                     .attr("height", 0)
//                     .attr("fill", fillColor)
//                     .attr("stroke", barStrokeColor)
//                     .attr("stroke-width", 1)
//                     .attr("rx", 2)
//                     .call(enter => enter.transition().duration(750)
//                         .ease(d3.easeCubicInOut)
//                         .attr("y", d => yScale(d.length))
//                         .attr("height", d => innerHeight - yScale(d.length))
//                     ),
//                 update => update
//                     .transition().duration(750)
//                     .ease(d3.easeCubicInOut)
//                     .attr("x", d => xScale(d.x0))
//                     .attr("y", d => yScale(d.length))
//                     .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
//                     .attr("height", d => innerHeight - yScale(d.length))
//                     .attr("fill", fillColor),
//                 exit => exit
//                     .transition().duration(300)
//                     .attr("y", innerHeight)
//                     .attr("height", 0)
//                     .remove()
//             );

//         // Update y-axis with transition
//         svg.select(".y-axis")
//             .transition()
//             .duration(750)
//             .call(d3.axisLeft(yScale));
//     }
        function updateHistogram(data) {

    // ---- Apply filters ----
    let updatedData = data;

    if (activeScreenTech !== "all") {
        updatedData = updatedData.filter(d => d.screenTech === activeScreenTech);
    }

    if (activeScreenSize !== null) {
        updatedData = updatedData.filter(d => d.screenSize === activeScreenSize);
    }

    // ---- Recalculate bins ----
    const updatedBins = binGenerator(updatedData);

    // ---- Update scale domains ----
    const minX0 = d3.min(updatedBins, d => d.x0) || 0;
    const maxX1 = d3.max(updatedBins, d => d.x1) || 1;
    const maxLength = d3.max(updatedBins, d => d.length) || 0;

    xScale.domain([minX0, maxX1]);
    yScale.domain([0, maxLength]);

    // ---- Determine bar colour ----
    const fillColor = techColors[activeScreenTech] || techColors["all"];

    // ---- Reference histogram chart group ----
    const svg = d3.select("#histogram svg g");

    // ---- Bind data ----
    const bars = svg.selectAll(".bar")
        .data(updatedBins);

    // ---- Enter + Update ----
    bars.join(
        enter => enter.append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.x0))
            .attr("y", innerHeight)
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
            .attr("height", 0)
            .attr("fill", fillColor)
            .attr("stroke", barStrokeColor)
            .attr("stroke-width", 1)
            .attr("rx", 2)
            .call(enter => enter.transition()
                .duration(750)
                .ease(d3.easeCubicInOut)
                .attr("y", d => yScale(d.length))
                .attr("height", d => innerHeight - yScale(d.length))
            ),

        update => update
            .transition()
            .duration(750)
            .ease(d3.easeCubicInOut)
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", fillColor),

        exit => exit
            .transition()
            .duration(300)
            .attr("y", innerHeight)
            .attr("height", 0)
            .remove()
    );

    // ---- Update Y axis ----
    svg.select(".y-axis")
        .transition()
        .duration(750)
        .call(d3.axisLeft(yScale));

    // ---- Update X axis ----
    svg.select(".x-axis")
        .transition()
        .duration(750)
        .call(d3.axisBottom(xScale).ticks(10));
}
}
