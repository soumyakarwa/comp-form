let hexagons = []; // Array to store hexagon objects
let maxRadius;
let radiusIncrement;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  maxRadius = min(windowHeight, windowWidth) / 2;
  radiusIncrement = maxRadius / 100;
  let centerX = width / 2;
  let centerY = height / 2;

  // Create hexagons and store them in the array
  for (let j = 10; j < maxRadius; j += 5) {
    let hex = new Hexagon(centerX, centerY, j, (PI / 7) * j);
    hex.strokeColor = color(
      random(150, 255),
      random(150, 255),
      random(150, 225)
    );
    hexagons.push(hex);
  }
}

function draw() {
  background(0);
  // Iterate through the hexagon array and draw each hexagon
  for (let hex of hexagons) {
    hex.rotationAngle += PI / 360;
    hex.display();
  }
}
