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

while (rotationAngle < 360) {
  const currEllipse = new paper.Path.Ellipse({
    rectangle: new paper.Rectangle({
      point: [
        center.x - ellipseSize.width / 2,
        center.y - ellipseSize.height / 2,
      ],
      size: [ellipseSize.width, ellipseSize.height],
    }),
  });
  currEllipse.strokeColor = "#800020";
  currEllipse.rotate(rotationAngle);
  // ellipseSize = Object.fromEntries(
  //   Object.entries(ellipseSize).map(([key, value]) => [key, value + 5])
  // );
  ellipseSize.width += 10;
  ellipseSize.height += 5;
  rotationAngle += 2;
  ellipseArray.push(currEllipse);
}

let ellipseGroup = new paper.Group();
// Add all ellipses in ellipseArray to the group
ellipseArray.forEach((ellipse) => {
  ellipseGroup.addChild(ellipse);
});

paper.view.onFrame = function (event) {
  // Rotate the group by 1 degree on every frame
  ellipseGroup.rotate(0.5);
};

// Render the view
paper.view.draw();

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
