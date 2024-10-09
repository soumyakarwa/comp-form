// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

// draws a rectangle, where you tell it to!

let amplitude_slider;
let frequency_slider;
let time_slider;

let startX = 50;
let startY = 250;
let endX = 450;
let endY = 50;

function setup() {
  createCanvas(500, 300);

  let container = select("#controls-container");

  // Create amplitude control
  let amplitudeDiv = createDiv();
  amplitudeDiv.class("control-row"); // Assign class to this div
  let amplitudeLabel = createElement("label", "Amplitude");
  amplitudeLabel.attribute("for", "amplitudeSlider");
  amplitude_slider = createSlider(0, 100, 50);
  amplitude_slider.id("amplitudeSlider");

  amplitudeDiv.child(amplitudeLabel);
  amplitudeDiv.child(amplitude_slider);
  container.child(amplitudeDiv);

  // Create frequency control
  let frequencyDiv = createDiv();
  frequencyDiv.class("control-row");
  let frequencyLabel = createElement("label", "Frequency");
  frequencyLabel.attribute("for", "frequencySlider");
  frequency_slider = createSlider(0, 100, 50);
  frequency_slider.id("frequencySlider");

  frequencyDiv.child(frequencyLabel);
  frequencyDiv.child(frequency_slider);
  container.child(frequencyDiv);

  // Create time speed control
  let timeDiv = createDiv();
  timeDiv.class("control-row");
  let timeLabel = createElement("label", "Time Speed");
  timeLabel.attribute("for", "timeSlider");
  time_slider = createSlider(0, 100, 50);
  time_slider.id("timeSlider");

  timeDiv.child(timeLabel);
  timeDiv.child(time_slider);
  container.child(timeDiv);
}
function draw() {
  background(50);
  ellipseMode(CENTER);
  rectMode(CENTER);

  let amplitude = amplitude_slider.value() / 50;
  let timeSpeed = time_slider.value() / 100;
  let frequencySlider = frequency_slider.value() / 100;

  noiseDetail(1, 0.5);

  fill(255);
  noStroke();

  // study this loop. do you understand how the line of ellipses is created?
  for (i = 0; i < 1; i += 0.02) {
    let x = lerp(startX, endX, i);
    let y = lerp(startY, endY, i);

    // hint: drive offsetX and offsetY with noise() instead of random()
    let offsetX =
      (noise(i * frequencySlider * timeSpeed * frameCount) - 0.5) *
      amplitude *
      10;
    let offsetY =
      (noise(i * frequencySlider * timeSpeed * frameCount) - 0.5) *
      amplitude *
      10;

    // fill(random(100, 255));
    // ellipse(x + offsetX, y + offsetY, 10, 10);
    rect(
      x + offsetX,
      y + offsetY,
      15 * noise(i * frequencySlider * timeSpeed * frameCount),
      200 * noise(i * frequencySlider * timeSpeed * frameCount)
    );
  }
}
