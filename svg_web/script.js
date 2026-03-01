// Script for Exercise 4: SVG House and Garden
// This file will be used for any interactive functionality

console.log('SVG exercise loaded!');

// Function to open developer tools and view the DOM
function viewDOMInBrowser() {
    console.log('To view the DOM:');
    console.log('1. Open Developer Tools (Cmd + Option + I on Mac)');
    console.log('2. Go to the Elements tab');
    console.log('3. Inspect the SVG element to see its structure');
}

// Make the SVG interactive
const svg = document.querySelector('svg');
if (svg) {
    svg.addEventListener('click', function(e) {
        if (e.target !== svg) {
            console.log('Clicked element:', e.target.tagName);
            console.log('Element attributes:', e.target.attributes);
        }
    });
}
