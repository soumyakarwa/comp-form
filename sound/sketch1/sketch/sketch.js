let audio;
let lyricsData;
let currentLyricIndex = 0;
let isAudioPlaying = false;
let ellipseCenter = { x: 0, y: 0 };
let radius;
let barlow;
let startAngleText1;
let startAngleText2;
let arcs = [];
let angle;
let cdRadius;
let lyricsIndexTracker;
let blueColor = "#6CB4EE";

function preload() {
  audio = loadSound("be-more-stephen-sanchez.mp3");
  lyricsData = loadJSON("./timestamps.json");
  barlow = loadFont("./Barlow/Barlow-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
  ellipseCenter.x = width / 2;
  ellipseCenter.y = height / 2;
  radius = min(width, height) - 10;
  textFont(barlow);
  textSize(16);
  textAlign(CENTER, TOP);
  lyricsData = Object.values(lyricsData);
  generateVinylArcs(radius, 40);

  startAngleText1 = -HALF_PI;
  startAngleText2 = HALF_PI;
  angle = -HALF_PI;
  cdRadius = radius / 3 - 45;

  let playButton = createButton("Start!");
  playButton.position(10, 10);
  playButton.mousePressed(startAudio);
  // noLoop();
}

function draw() {
  background("#E9DECF");

  drawCircles();
  drawTextAlongEllipse(
    "Be More ---------",
    startAngleText1,
    6.5,
    cdRadius,
    ellipseCenter
  );
  drawTextAlongEllipse(
    "Stephen Sanchez ---------",
    startAngleText2,
    6.5,
    cdRadius,
    ellipseCenter
  );
  trackLyricIndex();

  let angle = -HALF_PI;
  let newRadius = radius;
  let letterSpacing = 2;

  for (let i = 0; i < lyricsData.length; i++) {
    let currText = lyricsData[i].text;
    if (i == currentLyricIndex) {
      fill(255, 255, 255, 255);
    } else {
      fill(255, 255, 255, 100);
    }
    drawTextAlongEllipse(
      currText,
      angle,
      letterSpacing,
      newRadius,
      ellipseCenter
    );
    angle += radians(5) + radians(letterSpacing) * currText.length;
    if (angle > PI) {
      angle = -HALF_PI;
      newRadius -= 50;
      letterSpacing += 0.3;
    }
  }

  drawStoredArcs(startAngleText1);

  drawWobblyShapes();
  startAngleText1 += radians(0.2);
  startAngleText2 += radians(0.2);
}

function drawCircles() {
  fill(0);
  ellipse(ellipseCenter.x, ellipseCenter.y, radius);

  fill(blueColor);
  noStroke();
  ellipse(ellipseCenter.x, ellipseCenter.y, radius / 3 - 45);

  fill(0);
  ellipse(ellipseCenter.x, ellipseCenter.y, 7.5);
}

function ttmlTimeToSeconds(ttmlTime) {
  const parts = ttmlTime.split(":");
  const hours = parseFloat(parts[0]) * 3600;
  const minutes = parseFloat(parts[1]) * 60;
  const seconds = parseFloat(parts[2]);
  return hours + minutes + seconds;
}

function startAudio() {
  if (!isAudioPlaying) {
    audio.play();
    isAudioPlaying = true;
  }
}

function trackLyricIndex() {
  if (isAudioPlaying && currentLyricIndex < lyricsData.length) {
    const startTime = ttmlTimeToSeconds(lyricsData[currentLyricIndex].start);
    const endTime = ttmlTimeToSeconds(lyricsData[currentLyricIndex].end);

    if (audio.currentTime() >= startTime && audio.currentTime() <= endTime) {
      lyricsIndexTracker = currentLyricIndex;
    }

    if (audio.currentTime() > endTime) {
      currentLyricIndex++;
    }
  }
}

function drawTextAlongEllipse(
  txt,
  startAngle,
  additionalDegree,
  radius,
  ellipseCenter
) {
  for (let i = 0; i < txt.length; i++) {
    let angle = startAngle + radians(additionalDegree) * i;
    let x = ellipseCenter.x + (cos(angle) * radius) / 2;
    let y = ellipseCenter.y + (sin(angle) * radius) / 2;
    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    text(txt[i], 0, 0);
    pop();
  }
}

function generateVinylArcs(maxRadius, numArcs) {
  for (let i = 0; i < numArcs; i++) {
    let arcRadius = random(maxRadius / 3 + 1, maxRadius * 0.99);
    let startAngle = random(TWO_PI);
    let arcLength = random(PI / 16, PI / 3);
    let endAngle = startAngle + arcLength;
    let opacity = random(100, 200);
    let sw = random(0.25, 0.5);
    arcs.push({ arcRadius, startAngle, endAngle, opacity, sw });
  }
}

function drawStoredArcs(r) {
  noFill();

  for (let a of arcs) {
    push();
    translate(ellipseCenter.x, ellipseCenter.y);
    rotate(r);

    stroke(255, 255, 255, a.opacity);
    strokeWeight(a.sw);
    arc(0, 0, a.arcRadius, a.arcRadius, a.startAngle, a.endAngle);

    pop();
  }
}

function drawWobblyShapes() {
  let wobbleX = (noise(frameCount * 0.05) - 0.5) * 2;
  let wobbleY = (noise(frameCount * 0.05 + 100) - 0.5) * 2;

  push();
  noStroke();
  translate(wobbleX, wobbleY);
  fill(blueColor);
  quad(
    width,
    0,
    width * 0.75,
    height / 3 + 4,
    width * 0.725,
    height / 3 + 4,
    width * 0.975,
    0
  );
  rect(width * 0.72, height / 3, 30, 70);
  pop();
}
