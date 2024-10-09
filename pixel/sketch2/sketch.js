let lightPos = {
  topLeft: [50, 0],
  topRight: [80, 0],
  bottomLeft: [0, 300],
  bottomRight: [140, 300],
};
let canvasDimensions = { width: 700, height: 300 };
let lightWidth = { min: 20, max: 80 };

function setup() {
  createCanvas(canvasDimensions.width, canvasDimensions.height);
}

function draw() {
  background(0);
  noStroke();
  fill(244, 240, 134);
  quad(
    lightPos.topLeft[0],
    lightPos.topLeft[1],
    lightPos.topRight[0],
    lightPos.topRight[1],
    lightPos.bottomRight[0],
    lightPos.bottomRight[1],
    lightPos.bottomLeft[0],
    lightPos.bottomLeft[1]
  );

  setQuadCoordinates();
}

function setQuadCoordinates() {
  if (mouseX > lightWidth.max && mouseX < width - lightWidth.max) {
    lightPos.topLeft[0] = mouseX - lightWidth.min;
    lightPos.topRight[0] = mouseX + lightWidth.min;
    lightPos.bottomLeft[0] = mouseX - lightWidth.max;
    lightPos.bottomRight[0] = mouseX + lightWidth.max;
  }
}
