const canvasDimensions = { width: 500, height: 500 };
const center = { x: 300, y: 100 };
const radius = 5;
let blues, whiteColor;

function setup() {
  createCanvas(canvasDimensions.width, canvasDimensions.height);
  blues = {
    sky: color(202, 240, 248),
    light: color(63, 183, 217),
    navy: color(17, 69, 129),
  };
  whiteColor = color(255, 255, 255);
}

function draw() {
  background(0);
  img = createImage(canvasDimensions.width, canvasDimensions.height);
  img.loadPixels();

  for (let r = radius; r < 500; r += 3) {
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 720) {
      const x = center.x + r * Math.cos(i);
      const y = center.y + r * Math.sin(i);
      const rando = noise(r, i);
      if (x > 0 && x < width && y > 0 && y < height) {
        if (rando > 0.5) {
          let c;
          let colorNoise = noise(r);
          if (colorNoise < 0.25) {
            c = blues.light;
          } else if (colorNoise < 0.5) {
            c = blues.navy;
          } else if (colorNoise < 0.7) {
            c = blues.sky;
          } else {
            c = whiteColor;
          }

          img.set(x, y, c);
        }
      }
    }
  }

  img.updatePixels();
  noSmooth();
  image(img, 0, 0, width, height);
  noLoop();
}
