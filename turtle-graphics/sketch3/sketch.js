var myTurtle;
var startingPoint = [];
var sideLength = 100;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  myTurtle = new Turtle();
  noLoop();
  myTurtle.penUp();
}

function draw() {
  background("#CBC5EA");
  stroke(0);
  strokeWeight(1);

  for (let y = 30; y < height; y += 160) {
    for (let x = 30; x < width; x += 160) {
      startingPoint[0] = x;
      startingPoint[1] = y;
      myTurtle.moveTo(startingPoint[0], startingPoint[1]);
      sw = map(noise(startingPoint[0], startingPoint[1]), 0, 1, 1, 2);
      for (let i = 0; i < 6; i++) {
        strokeWeight(sw);
        for (let n = 0; n < 4; n++) {
          myTurtle.penDown();
          let angle = (360 / 4) * n;
          myTurtle.turnTo(angle);
          myTurtle.moveForward(sideLength - i * 15);
        }
        sw -= noise(startingPoint[0], startingPoint[1]);
        myTurtle.penUp();
        let vspacing = random(3, 16);
        let hspacing = random(3, 5);
        startingPoint[0] += vspacing;
        startingPoint[1] += hspacing;
        myTurtle.moveTo(startingPoint[0], startingPoint[1]);
      }
    }
  }
}
