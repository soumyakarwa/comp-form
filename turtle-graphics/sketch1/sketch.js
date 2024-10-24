let myTurtle;
let dotWidth = 5;
let spacing = 40;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  myTurtle = new Turtle(spacing / 2 + 10 * spacing, spacing / 2 + 10 * spacing);
  noLoop();
}

function draw() {
  background(0);

  for (let i = spacing / 2; i < height; i += spacing) {
    for (let j = spacing / 2; j < width; j += spacing) {
      noStroke();
      fill(255);
      ellipse(j, i, dotWidth);
    }
  }

  myTurtle.penDown();
  myTurtle.show();
  // myTurtle.moveForward(spacing);
}

function keyPressed() {
  let move = false;
  stroke(random(100, 255), 0, random(150, 255));
  strokeWeight(5);
  if (keyCode === UP_ARROW) {
    myTurtle.turnTo(270);
    move = myTurtle.y - spacing > 0 ? true : false;
  } else if (keyCode === DOWN_ARROW) {
    myTurtle.turnTo(90);
    move = myTurtle.y + spacing < height ? true : false;
  } else if (keyCode === LEFT_ARROW) {
    myTurtle.turnTo(180);
    move = myTurtle.x - spacing > 0 ? true : false;
  } else if (keyCode === RIGHT_ARROW) {
    myTurtle.turnTo(0);
    move = myTurtle.x + spacing < width ? true : false;
  }
  if (move) {
    myTurtle.moveForward(spacing);
  }
}
