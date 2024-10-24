var myTurtle;
var randomPoints = [];

function setup() {
  createCanvas(800, 600);
  noLoop();
  // myTurtle = new TurnSlightLeftTwoTone()
  myTurtle = new Turtle(0, 0);
  myTurtle.penUp();

  for (let i = 0; i < 40; i++) {
    randomPoints.push([random(0, width), random(0, height)]);
  }
}

function draw() {
  background(0);

  stroke(255);

  myTurtle.penDown();
  for (let i = 0; i < randomPoints.length; i++) {
    // ellipse(randomPoints[i][0], randomPoints[i][1], 5);
    // strokeWeight(0.25);
    let currPoint = randomPoints[i];
    myTurtle.penUp();
    for (let e of randomPoints.slice(i)) {
      strokeWeight(random(0.25, 0.5));
      myTurtle.moveTo(currPoint[0], currPoint[1]);
      myTurtle.penDown();
      myTurtle.moveTo(e[0], e[1]);
      // line(randomPoints[i][0], randomPoints[i][1], e[0], e[1]);
    }
  }
  // myTurtle.show();
}
