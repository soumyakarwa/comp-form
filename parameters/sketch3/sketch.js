let ellipseCenterBounds;

let clusterArray = [];
let numberOfClusters = 1;
let clusterSlider;

let lengthSlider;
let minLengthRange = [60, 140];
let maxLengthRange = [170, 250];

let barlow;

function preload() {
  barlow = loadFont("Barlow/Barlow-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(barlow);
  textSize(16);

  ellipseCenterBounds = {
    x: [width / 10, width - width / 10],
    y: [height / 10, height - height / 10],
  };

  clusterSlider = createSlider(0, 16);
  clusterSlider.value(1);

  lengthSlider = createSlider(...maxLengthRange);
  lengthSlider.value(maxLengthRange[0]);

  addCluster(clusterArray, 0);
}

function draw() {
  background("#F1F1F1");

  addSlider();
  processClusterValue();
  processLineLengthValue();

  for (let cluster of clusterArray) {
    for (let shape of cluster) {
      noStroke();
      shape.show();
    }
  }
}

function addSlider() {
  fill(0);
  textAlign(CENTER);

  clusterSlider.position(30, 40);
  clusterSlider.size(100);
  text("Clusters", 80, 40);
  text(clusterSlider.value(), 145, 53.5);

  lengthSlider.position(30, 90);
  lengthSlider.size(100);
  text("Max Length", 80, 90);
  text(lengthSlider.value(), 148, 103.5);
}

function processClusterValue() {
  let clusterSliderValue = clusterSlider.value();
  if (clusterSliderValue > numberOfClusters) {
    for (let i = numberOfClusters; i < clusterSliderValue; i++) {
      addCluster(clusterArray, i);
    }
  } else if (clusterSliderValue < numberOfClusters) {
    for (let i = numberOfClusters; i > clusterSliderValue; i--) {
      clusterArray.pop();
    }
  }
  numberOfClusters = clusterSliderValue;
}

function processLineLengthValue() {
  let lengthSliderValue = lengthSlider.value();
  let minLengthSliderValue = map(
    lengthSliderValue,
    maxLengthRange[0],
    maxLengthRange[1],
    minLengthRange[0],
    minLengthRange[1]
  );
  if (lengthSliderValue != maxLengthRange[0]) {
    for (let cluster of clusterArray) {
      for (let shape of cluster) {
        shape.changeLineLength(random(minLengthSliderValue, lengthSliderValue));
      }
    }
    maxLengthRange[0] = lengthSliderValue;
  }
}

function addCluster(arr, n) {
  arr[n] = [];
  let ellipseCentreX = random(...ellipseCenterBounds.x);
  let ellipseCentreY = random(...ellipseCenterBounds.y);

  for (let i = 0; i < 360; ) {
    let angle = random(2, 20);
    arr[n].push(
      new Shape(
        ellipseCentreX,
        ellipseCentreY,
        i, // Starting angle
        i + angle, // Ending angle based on the current angle
        random(60, maxLengthRange[0]),
        color(random(100, 255), random(100, 255), random(100, 255)),
        random(4, 10)
      )
    );

    i += angle;
  }
}
