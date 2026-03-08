d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {

    // Filter out any rows with invalid data
    data = data.filter(d =>
        !isNaN(d.energyConsumption) &&
        ["LCD", "LED", "OLED"].includes(d.screenTech)
    );

    console.log("Data loaded:", data.length, "records");

    // Draw the histogram
    drawHistogram(data);

    //Draw the scatter plot
    drawScatterPlot(data);

    // Set up the filter buttons
    populateFilters(data);
});