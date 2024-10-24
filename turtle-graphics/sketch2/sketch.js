let angle = 0;
let a = 100; // Semi-major axis of the ellipse (horizontal radius)
let b = 150; // Semi-minor axis of the ellipse (vertical radius)
let myTurtle;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); // Use degrees for the angle
  myTurtle = new Turtle(a * cos(0), b * sin(0));
}

function draw() {
  // background(220);

  // Move the origin to the center of the canvas
  translate(width / 2, height / 2);

  myTurtle.penDown();
  // myTurtle.show();

  // createEllipse(a, b, angle);

  for (let i = 0; i < 4; i += 1) {
    rotate(45 * i);
    createEllipse(a, b, angle);
  }

  // Increment angle to move turtle
  angle += 1;

  // Reset angle to keep it within the range 0-360
  if (angle > 360) {
    // background(220);
    angle = 0;
    clear();
  }
}

function createEllipse(a, b, angle) {
  // Draw the turtle at the current angle position on the ellipse
  let x = a * cos(angle);
  let y = b * sin(angle);
  // myTurtle.turnTo()
  myTurtle.moveTo(x, y);

  // Draw ellipse outline for reference
  noFill();
  stroke(0);
  let thickness = map(sin(angle), -1, 1, 1, 5); // Adjust the range for thickness
  strokeWeight(thickness);
}
