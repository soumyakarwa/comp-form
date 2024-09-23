let brushOptions;
const squareWidth = 24;
const backgroundColor = "#fffceb";
const lineColor = "#002185";
const colorOptions = [
  "#63875A",
  "#A3913B",
  "#D8C349",
  "#6F4276",
  "#851E46",
  "#3D6376",
  "#404363",
];
const gridSize = 5;
let layer1,
  layer2 = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  brushOptions = ["rotring", "hatch_brush"];
  // noLoop();
  frameRate(1);
  console.log(`${floor(width / squareWidth)} number of columns`);
  console.log(`${floor(height / squareWidth)} number of rows`);
  console.log(Math.floor((width / squareWidth) * (height / squareWidth)));
}

function draw() {
  background("#ffffff");

  for (
    let i = -width / 2 + (gridSize * squareWidth) / 2;
    i < width;
    i += squareWidth * (gridSize + 1)
  ) {
    for (
      let j = -height / 2 + (gridSize * squareWidth) / 2;
      j < height;
      j += squareWidth * (gridSize + 1)
    ) {
      brush.set("cpencil", random(colorOptions), 1);
      brush.circle(i, j, squareWidth / 2 - 10);
      if (layer1) {
        brush.set("cpencil", random(colorOptions), 1);
        colorLayer1(i, j, squareWidth);
      }
      if (layer2) {
        brush.set("cpencil", random(colorOptions), 1);
        colorLayer2(i, j, squareWidth);
      }
    }
  }

  brush.set(brushOptions[0], lineColor, 0.9);
  for (let i = -width / 2; i < width; i += squareWidth) {
    brush.line(i, -height / 2, i, height);
  }

  for (let i = -height / 2; i < height; i += squareWidth) {
    brush.line(-width / 2, i, width, i);
  }
}

function colorLayer1(middleX, middleY, sqW) {
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      // Skip the center point (0, 0)
      if (!(x === 0 && y === 0)) {
        let xLoc = middleX + x * sqW;
        let yLoc = middleY + y * sqW;
        brush.circle(xLoc, yLoc, sqW / 2 - 10);
      }
    }
  }
}

function colorLayer2(middleX, middleY, sqW) {
  for (let x = -2; x <= 2; x++) {
    // Inner loop to iterate over y values from -2 to 2
    for (let y = -2; y <= 2; y++) {
      // Conditions to include specific points based on the pattern
      if (
        y === -2 ||
        y === 2 || // Include entire rows at y = -2 and y = 2
        ((x === -2 || x === 2) && (y === -1 || y === 0 || y === 1))
      ) {
        // Include edges at y = -1, 0, 1 for x = -2 and x = 2
        let xLoc = middleX + x * sqW;
        let yLoc = middleY + y * sqW;
        brush.circle(xLoc, yLoc, sqW / 2 - 10);
      }
    }
  }
}

function getRandomColor() {
  return color(random(0, 255), random(0, 255), random(0, 255));
}

function keyPressed() {
  if (key === "1") {
    layer1 = true;
  }
  if (key === "2") {
    layer2 = true;
  }
}
