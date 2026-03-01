# Exercise 4: SVG House and Garden

## Project Overview

This project demonstrates the creation of an SVG illustration of a house and garden using various SVG shapes and elements.

## Features

- House with walls, roof, door, and chimney
- Windows and decorative elements
- Garden with trees, flowers, and garden path
- Fence and landscape elements
- Blue sky with sun and clouds
- Text labels

## SVG Shapes Used

1. **Rectangle (`<rect>`)**: House walls, door, windows, chimney
2. **Circle (`<circle>`)**: Sun, flowers, smoke
3. **Polygon (`<polygon>`)**: Roof (triangle), tree foliage
4. **Line (`<line>`)**: Window panes, fence
5. **Path (`<path>`)**: Cloud shapes, garden path
6. **Text (`<text>`)**: Labels and descriptive text

## Progress

### Step 1: Created SVG Picture ✓

- Created HTML structure with embedded SVG
- Added various shapes for house and garden
- Used multiple SVG elements to demonstrate different shape types

### Step 2: Annotated Screenshots (In Progress)

- To document coordinate systems and shape mappings
- Screenshots will be added to webpage

### Step 3: Customization (Completed)

- Shapes, fills, and strokes have been adjusted
- Added chimney smoke and enhanced flower colors

### Step 4: Group Elements (Completed)

- Both windows are now wrapped in a `<g id="windows">` group
- Styling for fill and stroke applied once at group level
- Used nested `<g transform="translate(...)">` elements to position each window; the right window is translated 190px along x

### Step 5: DOM Viewing (Completed)

- Opened the page and inspected the SVG structure in developer tools
- Noted the `windows` group containing two subgroups
- Added placeholder screenshot file path `assets/dom_screenshot.png` to `index.html`; replace it with your actual capture

## AI Usage Notes

- Used GitHub Copilot to generate the initial SVG structure
- Copilot assisted with coordination of shapes and their placement
- Used Copilot for CSS styling recommendations

## How to View

1. Open `index.html` in a web browser
2. To view the DOM:
   - Press Cmd + Option + I (Mac) or F12 (Windows/Linux)
   - Navigate to the Elements/Inspector tab
   - Inspect the SVG element to see its structure

## Files

- `index.html` - Main HTML file with embedded SVG
- `styles.css` - Styling for the page
- `script.js` - JavaScript functionality
- `README.md` - This file

## Next Steps

1. Refactor windows into a group element
2. Apply styling to grouped windows
3. Take screenshots and annotate coordinate systems
4. Capture DOM structure in browser
