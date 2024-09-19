let ellipseSize = [];
let circles = [];
let xPos;
let yPos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseSize[0] = 20;
  ellipseSize[1] = 30;

  let startingColor = color(random(100, 255), 0, random(100, 255));

  xPos = 0;
  yPos = 0;

  for (let i = ellipseSize[0]; i < width; i += ellipseSize[0]) {
    for (let j = ellipseSize[1]; j < height; j += ellipseSize[1]) {
      circles.push(new myCircle(i, j, startingColor));

      let redNoise = map(noise(i * 0.05, j * 0.05), 0, 1, 100, 255);

      startingColor = color(
        redNoise,
        green(startingColor),
        blue(startingColor)
      );
    }
  }
}

function draw() {
  background(255);

  for (let c of circles) {
    let noiseValue = noise(c.pos[0] * 0.02, c.pos[1] * 0.02, frameCount * 0.02);
    let angle = map(noiseValue, 0, 1, 0, TWO_PI);

    c.show(angle); // Draw ellipse at the origin
  }
}

class myCircle {
  constructor(i, j, c) {
    this.pos = [i, j];
    this.size = [ellipseSize[0], ellipseSize[1]];
    this.rotationAngle = 0;
    this.c = c || color(255, 255, 255);
  }

  show(angle) {
    fill(this.c);
    stroke(255);
    push(); // Save current transformation state
    translate(this.pos[0], this.pos[1]); // Move the origin to the ellipse's position
    rotate(angle); // Rotate by the angle from noise
    ellipse(0, 0, this.size[0], this.size[1]);
    pop();
  }
}
