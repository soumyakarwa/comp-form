// Initialize Paper.js
paper.setup(document.getElementById("sketch-canvas"));

const circleRadius = 20;
const numSpikes = 40;
const outerRadius = circleRadius; // Length of the spikes
const innerRadius = 200; // Inner radius, closer to the circle
const center = [250, 250];

// Create a simple circle
let circle = new paper.Path.Circle({
  center,
  radius: circleRadius,
  fillColor: "black",
});

// Draw spikes around the circle
drawSpikes(center, numSpikes, outerRadius, innerRadius);

// Render the view
paper.view.draw();

// HELPER FUNCIONS //
function drawSpike(center, outerRadius, innerRadius, angle) {
  const innerPoint = new paper.Point({
    length: innerRadius,
    angle: angle,
  }).add(center);

  const leftPoint = new paper.Point({
    length: outerRadius,
    angle: angle - 10, // Adjust for spike width
  }).add(center);

  const rightPoint = new paper.Point({
    length: outerRadius,
    angle: angle + 10, // Adjust for spike width
  }).add(center);

  // Create the triangular spike
  const spike = new paper.Path();
  spike.add(innerPoint);
  spike.add(leftPoint);
  spike.add(rightPoint);
  spike.closed = true;
  spike.fillColor = "black"; // Color for spikes
}

function drawSpikes(center, numSpikes, outerRadius, innerRadius) {
  const angleStep = 360 / numSpikes;
  for (let i = 0; i < numSpikes; i++) {
    drawSpike(center, outerRadius, innerRadius, i * angleStep);
  }
}

document.getElementById("download-btn").addEventListener("click", function () {
  // Get the canvas element
  var canvas = document.getElementById("sketch-canvas");

  // Convert canvas content to a data URL (base64 encoded PNG)
  var dataURL = canvas.toDataURL("image/png");

  // Create a temporary link element to trigger the download
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "sketch.png"; // Filename for the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
