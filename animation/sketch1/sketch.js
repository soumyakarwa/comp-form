let barlow;
let points;
let pointToRotation = [];
let totalFrames = 150; // Total number of frames for a full rotation
let animationProgress = 0;

function preload() {
  barlow = loadFont("./Barlow/Barlow-Regular.ttf");
}

function setup() {
  createCanvas(1000, 500);
  angleMode(DEGREES);
  frameRate(30);
  textFont(barlow);

  points = barlow.textToPoints("comp form", width / 4, height / 2 + 25, 100, {
    sampleFactor: 0.5,
  });

  // Initialize center of rotation, radius, and angular offset for each point
  for (let p of points) {
    let centerX = random(width * 0.25, width * 0.75); // Random rotation center x-position
    let centerY = random(height * 0.25, height * 0.75); // Random rotation center y-position
    let currRadius = dist(centerX, centerY, p.x, p.y);
    let originalAngle = atan2(p.y - centerY, p.x - centerX);
    let initialOffset = 355; // Start with a large initial offset

    pointToRotation.push({
      centerX: centerX,
      centerY: centerY,
      radius: currRadius,
      originalAngle: originalAngle,
      currentAngle: originalAngle + initialOffset,
    });
  }
}

function draw() {
  background("#F7ECE1");

  let allPointsAligned = true;

  // Update and draw the rotated points
  push();
  noStroke();
  fill("#CAC4CE");
  for (let i = 0; i < points.length; i++) {
    let rotationData = pointToRotation[i];
    let centerX = rotationData.centerX;
    let centerY = rotationData.centerY;
    let radius = rotationData.radius;

    // Calculate the difference to the original angle
    let angleDifference =
      rotationData.currentAngle - rotationData.originalAngle;

    // Apply easing based on the angle difference to reduce the speed of the ellipse as it comes back to the original position
    let angularStep = angleDifference * 0.05;

    // Decrease the current angle towards the original angle
    if (abs(angleDifference) > 0.01) {
      rotationData.currentAngle -= angularStep;
      allPointsAligned = false;
    } else {
      rotationData.currentAngle = rotationData.originalAngle; // Snap to original if close enough
    }

    // Calculate the new x and y positions based on the current angle
    let newX = centerX + radius * cos(rotationData.currentAngle);
    let newY = centerY + radius * sin(rotationData.currentAngle);

    ellipse(newX, newY, 3);
  }
  pop();

  // Stop the animation if all points are aligned
  if (allPointsAligned) {
    noFill();
    stroke("#CAC4CE");
    strokeWeight(2);

    textSize(100);
    let txtwidth = textWidth("comp form");
    drawSierpinski(width / 4 + txtwidth + 15, height / 2 - 25, 50);

    noLoop();
  }

  animationProgress++;
}

function drawSierpinski(x, y, size) {
  let h = (size * sqrt(3)) / 2;

  let x1 = x;
  let y1 = y;
  let x2 = x + size;
  let y2 = y1;
  let x3 = x + size / 2;
  let y3 = y - size;

  triangle(x1, y1, x2, y2, x3, y3);

  // Calculate midpoints of each edge
  let mid1x = (x1 + x2) / 2;
  let mid1y = (y1 + y2) / 2;
  let mid2x = (x2 + x3) / 2;
  let mid2y = (y2 + y3) / 2;
  let mid3x = (x3 + x1) / 2;
  let mid3y = (y3 + y1) / 2;

  // Draw lines connecting the midpoints
  line(mid1x, mid1y, mid2x, mid2y);
  line(mid2x, mid2y, mid3x, mid3y);
  line(mid3x, mid3y, mid1x, mid1y);
}
