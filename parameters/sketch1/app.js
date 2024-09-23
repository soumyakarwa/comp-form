import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const svgContainer = d3.select("#svgContainer");

const width = svgContainer.node().getBoundingClientRect().width;
const height = svgContainer.node().getBoundingClientRect().height;

const colors = [
  "#63875A",
  "#A3913B",
  "#D8C349",
  "#6F4276",
  "#851E46",
  "#3D6376",
  "#404363",
];
const colorsEndPoints = [
  "#BFD1BA",
  "#E4DCB4",
  "#D8C349",
  "#D5BCD9",
  "#DF709B",
  "#BCD1DC",
  "#B5B7CF",
];

const svg = svgContainer
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`);

const margin = {
  top: height / 15,
  bottom: height / 20,
  left: width / 20,
  right: width / 20,
};

const canvasWidth = width - margin.left - margin.right;
const canvasHeight = height - margin.top - margin.bottom;

const gap = 10;
let numberOfInterpolations = 5;

const canvas = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("width", canvasWidth)
  .attr("height", canvasHeight);

const rectHeight = canvasHeight / colors.length - gap;
const rectWidth = canvasWidth / numberOfInterpolations - gap;

const drawRectangles = (numInterpolations) => {
  // Clear any existing rectangles
  canvas.selectAll("rect").remove();

  const rectWidth = canvasWidth / numInterpolations - gap;

  colors.forEach((color, rowIndex) => {
    const rectsInRow = new Array(numberOfInterpolations).fill(null);

    const colorInterpolator = d3.interpolateRgb(
      color,
      colorsEndPoints[rowIndex]
    );

    // Create a rectangle for each entry in the row
    canvas
      .selectAll(`.rect-row-${rowIndex}`)
      .data(rectsInRow)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (rectWidth + gap))
      .attr("y", rowIndex * (rectHeight + gap))
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", (d, i) => colorInterpolator(i / numberOfInterpolations));
  });
};

drawRectangles(numberOfInterpolations);

// Listen for slider value changes
const slider = d3.select("#interpolationSlider");
const sliderValue = d3.select("#sliderValue");

slider.on("input", function () {
  numberOfInterpolations = +this.value; // Update number of interpolations based on slider
  sliderValue.text(numberOfInterpolations); // Update the text next to slider
  drawRectangles(numberOfInterpolations); // Redraw rectangles
});
