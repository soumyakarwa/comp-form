let squareDim = { width: 0, height: 0 };

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareDim.width = width / 3;
  squareDim.height = height / 3;
  noLoop();
}

function draw() {
  background(255);
  noStroke();

  // 2x3 grid of rects
  for (let i = 0; i < 9; i++) {
    fill(random(100, 255), random(100, 255), random(100, 255));
    rect(
      squareDim.width * (i % 3),
      squareDim.height * Math.floor(i / 3),
      squareDim.width,
      squareDim.height
    );
  }

  // Columns across
  let rectWidth = 10;
  for (let i = 0; i < width; i += rectWidth * 2) {
    fill(255);
    rect(i, 0, rectWidth, height);
    rectWidth = map(noise(rectWidth * 4), 0, 1, 7, 15);
  }

  // Rows across
  let rectHeight = 14;
  for (let i = 0; i < height; i += rectHeight * 2) {
    fill(255);
    rect(0, i, width, rectHeight);
    rectHeight = map(noise(rectHeight * 4), 0, 1, 12, 20);
  }
}
