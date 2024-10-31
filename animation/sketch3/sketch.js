let angle = 0;
let amplitude = 12.5; // Amplitude of oscillation
let frequency = 0.25;
let initialRadius = 10;
let increment = 25;

function setup() {
  createCanvas(600, 600);
  // noLoop();
}

function draw() {
  background(0);

  noFill();
  stroke(255);
  for (let i = initialRadius; i < width - initialRadius; i += increment) {
    let phaseOffset = i * 1.5;
    strokeWeight(abs(amplitude * cos(frequency * (angle + phaseOffset))));
    ellipse(width / 2, height / 2, i);
  }

  angle += 0.05;
}
