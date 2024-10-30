let numberOfEllipses = 15;
let horizontalGap = 150;
let verticalGap = 30;
let ellipseSize = 20;
let circles = [];
let amplitude = { x: [50, 150], y: [50, 150] };
let period = [180, 360];

const colorOptions = [
  { color: "yellow", rgb: [228, 192, 98] },
  { color: "blue", rgb: [2, 160, 155] },
  { color: "pink", rgb: [226, 126, 162] },
];

function setup() {
  createCanvas(600, 600);
  let topLeft = { x: 0, y: 0 };
  topLeft.x = (width - horizontalGap - ellipseSize) / 2;
  topLeft.y = (height - ellipseSize - (numberOfEllipses - 1) * verticalGap) / 2;

  for (let i = 0; i < numberOfEllipses; i++) {
    // let y = topLeft.y + ellipseSize / 2 + verticalGap * i;
    let x = random(0, width);
    let y = random(0, height);
    let originX = x;
    let originY = y;
    let currColor = random(colorOptions);
    let direction = random([-1, 1]);
    circles.push(
      new myCircle(
        x,
        y,
        originX,
        originY,
        color(currColor.rgb[0], currColor.rgb[1], currColor.rgb[2]),
        ellipseSize,
        int(random(70, 120)),
        random(amplitude.x[0], amplitude.x[1]),
        random(amplitude.y[0], amplitude.y[1]),
        random(period[0], period[1]),
        direction
      )
    );
  }
}

function draw() {
  background(244, 241, 234);
  for (circle of circles) {
    circle.x =
      circle.originX +
      circle.direction *
        sin((TWO_PI * frameCount) / circle.period) *
        circle.amplitudeX;
    circle.y =
      circle.originY +
      circle.direction *
        cos((TWO_PI * frameCount) / circle.period) *
        circle.amplitudeY;

    circle.updateTrail();
    circle.show();
  }
}
