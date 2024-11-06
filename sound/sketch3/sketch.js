let audio;
let blobs = [];
let ripples = [];
const threshold = 0.02;
let size = 5;
let warmColorOptions, coolColorOptions;

function preload() {
  audio = loadSound("./keinemusik-move.mp3", () => {
    amplitude = new p5.Amplitude();
  });
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  warmColorOptions = [
    color(255, 203, 223, 200),
    color(255, 252, 200, 150),
    color(227, 201, 230, 200),
  ];
  coolColorOptions = [
    color(139, 76, 227, 200),
    color(234, 70, 128, 150),
    color(39, 77, 205, 200),
  ];
  frameRate(20);
  blendMode(LIGHTEST);
}

function draw() {
  background(0);
  for (let blob of blobs) {
    blob.move();
    blob.display();
  }

  // Get the current amplitude level
  if (audio.isPlaying()) {
    let level = amplitude.getLevel();
    if (level > threshold) {
      blobs.push(
        new myBlob(
          random(0, width),
          random(0, height),
          random(coolColorOptions),
          random(200, 400)
        )
      );
    }
  }
}

function mousePressed() {
  if (audio.isPlaying()) {
    audio.stop();
  } else {
    audio.play();
  }
}

// Function to create a blob gradient
function drawBlobGradient(x, y, radius, innerColor, outerColor) {
  for (let r = radius; r > 0; r -= 2) {
    let interColor = lerpColor(innerColor, outerColor, r / radius);
    fill(interColor);
    noStroke();
    ellipse(x, y, r * 2, r * 2);
  }
}
