const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// test rectangle to verify canvas scaling and positioning
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
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