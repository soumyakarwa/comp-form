let myImg;
let originalPixelArray = [];
let currentColorArray = [];
let originalButtonPos = { x: 300, y: 10 };
let margin = 40;
let barlow;
let filterSelect;

function preload() {
  myImg = loadImage("tennis.jpeg");
  barlow = loadFont("Barlow/Barlow-Regular.ttf");
}

function setup() {
  createCanvas(400, 600);
  textFont(barlow);
  filterSelect = createSelect();
  filterSelect.position(originalButtonPos.x, originalButtonPos.y);

  // Add options to the dropdown
  filterSelect.option("Original");
  filterSelect.option("Grayscale");
  filterSelect.option("Invert");
  filterSelect.option("Blues");
  filterSelect.option("Neon");
  filterSelect.option("Neutrals");

  // When an option is selected, call the appropriate function
  filterSelect.changed(applyFilter);

  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    originalPixelArray[y] = [];
    currentColorArray[y] = [];
    for (let x = 0; x < myImg.width; x++) {
      originalPixelArray[y][x] = myImg.get(x, y);
      currentColorArray[y][x] = originalPixelArray[y][x];
    }
  }
  myImg.updatePixels();
}

function draw() {
  background(220);

  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      myImg.set(x, y, currentColorArray[y][x]);
    }
  }
  myImg.updatePixels();

  noSmooth();
  image(myImg, 0, 0, width, height);

  noLoop();
}

function applyFilter() {
  let selected = filterSelect.value();

  switch (selected) {
    case "Original":
      revert();
      break;
    case "Grayscale":
      grayScaleFilter();
      break;
    case "Invert":
      invert();
      break;
    case "Blues":
      blueScale();
      break;
    case "Neon":
      neon();
      break;
    case "Neutrals":
      neutrals();
      break;
    default:
      "Original";
      revert();
      break;
  }
}

function grayScaleFilter() {
  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      const pixelColor = originalPixelArray[y][x];
      const grayScaleColor =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 3;
      currentColorArray[y][x] = grayScaleColor;
    }
  }
  myImg.updatePixels();
  redraw();
}

function revert() {
  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      currentColorArray[y][x] = originalPixelArray[y][x];
    }
  }
  myImg.updatePixels();
  redraw();
}

function invert() {
  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      const pixelColor = originalPixelArray[y][x];
      const newRed = 255 - pixelColor[0]; // Red
      const newGreen = 255 - pixelColor[1]; // Green
      const newBlue = 255 - pixelColor[2];
      currentColorArray[y][x] = color(newRed, newGreen, newBlue);
    }
  }
  myImg.updatePixels();
  redraw();
}

function blueScale() {
  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      const pixelColor = originalPixelArray[y][x];
      const grayScaleColor =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 3;
      const newRed = 0; // Red
      const newGreen = grayScaleColor; // Green
      const newBlue = grayScaleColor * 2;
      currentColorArray[y][x] = color(newRed, newGreen, newBlue);
    }
  }
  myImg.updatePixels();
  redraw();
}

function neon() {
  myImg.loadPixels();
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      const pixelColor = originalPixelArray[y][x];
      const grayScaleColor =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 3;
      const newRed = grayScaleColor; // Red
      const newGreen = grayScaleColor * 2; // Green
      const newBlue = 0;
      currentColorArray[y][x] = color(newRed, newGreen, newBlue);
    }
  }
  myImg.updatePixels();
  redraw();
}

function neutrals() {
  myImg.loadPixels();
  let threshold = 128;
  for (let y = 0; y < myImg.height; y++) {
    for (let x = 0; x < myImg.width; x++) {
      const pixelColor = originalPixelArray[y][x];
      const brightness =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 3;
      if (brightness < threshold) {
        // Darker side of the neutral palette (beiges/browns)
        let darkBeige = map(brightness, 0, threshold, 80, 180); // Darker beige tones
        beige = color(darkBeige, darkBeige * 0.85, darkBeige * 0.75); // Create a brownish beige
      } else {
        // Lighter side of the neutral palette (creams/beiges)
        let lightBeige = map(brightness, threshold, 255, 180, 255); // Lighter beige tones
        beige = color(lightBeige, lightBeige * 0.9, lightBeige * 0.8); // Create a creamier beige
      }
      currentColorArray[y][x] = beige;
    }
  }
  myImg.updatePixels();
  redraw();
}

function isSameColor(color1, color2) {
  return (
    red(color1) == red(color2) &&
    blue(color1) == blue(color2) &&
    green(color1) == green(color2)
  );
}
