let numberOfPoints = 20;
let increments = { width: 0, height: 0 };
let numberOfLines = 40;
let baseImg;

function preload() {
  baseImg = loadImage("./compiledImg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  noFill();
  noLoop();

  increments.width = width / numberOfPoints;
  increments.height = height / numberOfPoints;
}

function draw() {
  background(0);

  image(baseImg, 0, 0);
  for (let l = 0; l < numberOfLines; l++) {
    let noiseOffset = { x: 0.01 * l, y: 0.02 * l };
    stroke(
      random(100, 255),
      random(100, 255),
      random(100, 255),
      random(50, 100)
    );
    strokeWeight(random(0, 2));
    drawLine(noiseOffset);
  }
}

function drawLine(noiseOffset) {
  beginShape();
  vertex(noise(noiseOffset.x), map(noise(noiseOffset.y), 0, 1, 0, height));
  noiseOffset = incrementNoise(noiseOffset);

  for (let n = 0; n < numberOfPoints; n++) {
    let xVal = map(
      noise(noiseOffset.x),
      0,
      1,
      n * increments.width,
      (n + 1) * increments.width
    );
    let yVal = map(noise(noiseOffset.y), 0, 1, 0, height);

    vertex(xVal, yVal);
    noiseOffset = incrementNoise(noiseOffset);
  }

  vertex(
    width - noise(noiseOffset.x),
    map(noise(noiseOffset.y), 0, 1, 0, height)
  );
  endShape();
}

function incrementNoise(n) {
  n.x += 0.1;
  n.y += 0.1;

  return n;
}

function changeIncrement(i, xVal, yVal) {
  let newWIncr = map(
    noise(xVal * random(0.1, 0.5)),
    0,
    1,
    i.width - 40,
    i.width + 40
  );
  let newHIncr = map(
    noise(yVal * random(0.1, 0.5)),
    0,
    1,
    i.height - 40,
    i.height + 40
  );

  i.width = newWIncr;
  i.height = newHIncr;

  return i;
}
