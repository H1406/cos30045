const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 1600")
      .style("border", "1px solid black");

// test rectangle to verify canvas scaling and positioning
// svg
//   .append("rect")
//     .attr("x", 10)
//     .attr("y", 10)
//     .attr("width", 414)
//     .attr("height", 16)
//     .attr("fill", "blue");

d3.csv('data/data.csv', d => {
    return {
        brand: d.Brand_Reg,
        count: +d.count
    };
}).then(data => {
    data.sort((a, b) => b.count - a.count);
    console.log(data);
    createBarChart(data);
});

const createBarChart = data => {

    const svgWidth = 500;
    const svgHeight = 1600;
    const labelOffset = data.reduce((max, d) => Math.max(max, d.brand.length), 0) * 6.5; 
    const rightMargin = 35;

    // X scale (numerical)
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, svgWidth - labelOffset - rightMargin ]);

    // Y scale (categorical)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, svgHeight])
        .padding(0.1);

    // Create group container for each bar + label
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // --- Bars ---
    barAndLabel
        .append("rect")
        .attr("x", labelOffset)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "green");

    // --- Brand labels ---
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelOffset - 5)
        .attr("y", yScale.bandwidth() / 2 + 5)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "12px");

    // --- Count labels ---
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelOffset + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2 + 5)
        .style("font-family", "sans-serif")
        .style("font-size", "12px");
};


// Function to show the selected page and hide others
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageName + '-page');
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure home page is shown by default
    showPage('home');
});