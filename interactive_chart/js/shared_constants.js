// =============================================
// Chart Dimensions (Inner Chart Strategy)
// =============================================
const margin = { top: 40, right: 30, bottom: 60, left: 60 };
const width = 900;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let innerChartS;
const tooltipWidth = 65;
const tooltipHeight = 32;

// =============================================
// Colours
// =============================================
const techColors = {
    "all": "#4682b4",
    "LCD": "#e8833a",
    "LED": "#4682b4",
    "OLED": "#6bb35a"
};
const bodyBackgroundColor = "#f4f6f8";
const barStrokeColor = bodyBackgroundColor;

// =============================================
// Scales
// =============================================
const xScale = d3.scaleLinear().range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);

// =============================================
// Bin Generator
// =============================================
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(40);

// =============================================
// Filter Definitions
// =============================================
const filters_screen = [
    { id: "all",  label: "All",  isActive: true },
    { id: "LCD",  label: "LCD",  isActive: false },
    { id: "LED",  label: "LED",  isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

const filters_size = [
    { id: "all_sizes", label: "All Sizes", value: null, isActive: true },
    { id: "size_24",   label: '24"',       value: 24,   isActive: false },
    { id: "size_32",   label: '32"',       value: 32,   isActive: false },
    { id: "size_55",   label: '55"',       value: 55,   isActive: false },
    { id: "size_65",   label: '65"',       value: 65,   isActive: false },
    { id: "size_98",   label: '98"',       value: 98,   isActive: false }
];

// =============================================
// Active Filter State
// =============================================
let activeScreenTech = "all";
let activeScreenSize = null;
