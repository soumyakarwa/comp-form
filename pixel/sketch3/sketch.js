let img;
let ellipseSize = 3;
let rows, cols;

function preload() {
  img = loadImage("try2.png");
}

function setup() {
  createCanvas(549, 699);
  cols = width / ellipseSize;
  rows = height / ellipseSize;
  // console.log(cols, rows);
}

function draw() {
  background(220);

  img.loadPixels();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const xpos = x * ellipseSize;
      const ypos = y * ellipseSize;
      const clr = getAverageColor(xpos, ypos, img);
      fill(clr);
      noStroke();
      ellipse(xpos, ypos, ellipseSize);
    }
  }

  img.updatePixels();
  noSmooth();
  noLoop();
}

function getAverageColor(x, y, img) {
  let tr = 0,
    tg = 0,
    tb = 0;
  let count = 0; // Count valid pixels

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Ensure the pixel is within the image boundaries
      if (x + i >= 0 && x + i < img.width && y + j >= 0 && y + j < img.height) {
        const clr = img.get(x + i, y + j);
        tr += red(clr);
        tg += green(clr);
        tb += blue(clr);
        count++;
      }
    }
  }

  // Return the average color
  return color(tr / count, tg / count, tb / count);
}
