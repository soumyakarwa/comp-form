let img;
let originalPixelArray = [];
let currentColorArray = [];
let pixRange = 10;

function preload() {
  img = loadImage("retro.jpeg");
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    originalPixelArray[y] = [];
    currentColorArray[y] = [];
    for (let x = 0; x < img.width; x++) {
      originalPixelArray[y][x] = img.get(x, y);
      currentColorArray[y][x] = color(251, 121, 63);
    }
  }
  img.updatePixels();
}

function draw() {
  background(220);
  let mx = floor(mouseX);
  let my = floor(mouseY);
  console.log(mx, my);
  newImg = createImage(width, height);
  newImg.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      newImg.set(x, y, currentColorArray[y][x]);
    }
  }
  // / Update a 5x5 grid around the mouse position
  for (let y = my - pixRange; y <= my + pixRange; y++) {
    for (let x = mx - pixRange; x <= mx + pixRange; x++) {
      // Make sure we're within the bounds of the image
      if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
        currentColorArray[y][x] = originalPixelArray[y][x];
      }
    }
  }

  // newImg.set(x, y, currentColorArray[y][x]);
  newImg.updatePixels();
  noSmooth();
  image(newImg, 0, 0, width, height);
  // noLoop();
}
