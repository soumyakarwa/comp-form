// Initialize Paper.js
paper.setup(document.getElementById("sketch-canvas"));
const canvasWidth = document
  .getElementById("sketch-canvas")
  .getBoundingClientRect().width;
const canvasHeight = document
  .getElementById("sketch-canvas")
  .getBoundingClientRect().height;

const center = { x: canvasWidth / 2, y: canvasHeight / 2 };
let ellipseSize = { width: 200, height: 400 };
let rotationAngle = 45;
ellipseArray = [];

for (let n = 0; n < 30; n++) {
  // Center of the circle
  let centerX = Math.random() * canvasWidth;
  let centerY = Math.random() * canvasHeight;
  let radius = Math.random() * (80 - 40) + 20;
  let rectWidth = Math.random() * (4 - 1) + 1;
  let numberOfRects = Math.floor(Math.random() * (30 - 10) + 10);
  let angleIncr = (Math.PI * 2) / numberOfRects;
  let randomColor = new paper.Color(
    (Math.random() * (255 - 100) + 100) / 255,
    (Math.random() * (255 - 100) + 100) / 255,
    (Math.random() * (255 - 100) + 100) / 255
  );

  for (let i = 0; i < Math.PI * 2; i += angleIncr) {
    let randomHeight = Math.random() * (40 - 10) + 10; // Random height between 10 and 40

    let x = centerX + radius * Math.cos(i);
    let y = centerY + radius * Math.sin(i);

    let rect = new paper.Path.Rectangle({
      point: [-rectWidth / 2, -randomHeight], // Rectangle is centered along its width at the base
      size: [randomHeight, rectWidth], // Random height, fixed width
      fillColor: randomColor,
    });

    rect.position = new paper.Point(x, y);

    rect.rotate(i * (180 / Math.PI), new paper.Point(x, y)); // Convert angle to degrees
  }
}

// HELPER FUNCIONS //

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
