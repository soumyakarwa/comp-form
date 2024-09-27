let squareSize = 20;
let bounds = [3, 16];
let numRows, numCols;
let mySquares = [];
let radio,
  mySquare,
  topHalfHorizontalRectangle,
  bottomHalfHorizontalRectangle,
  leftVerticalRectangle,
  rightVerticalRectangle,
  bottomLeftTriangle,
  bottomRightTriangle,
  topLeftTriangle,
  topRightTriangle;
let chosenShape;

function setup() {
  createCanvas(windowWidth / 3, windowHeight);
  numRows = height / squareSize;
  numCols = width / squareSize;
  // noLoop();
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      if (i < bounds[0] && j < bounds[1]) {
        continue; // Skip these squares
      }

      mySquares.push(
        new myRect(
          i * squareSize,
          j * squareSize,
          squareSize,
          color(random(100, 255), random(100, 255), random(100, 255))
        )
      );
    }
  }

  topHalfHorizontalRectangle = "./topHalfRectangleHorizontal.svg";
  bottomHalfHorizontalRectangle = "./bottomHalfRectangleHorizontal.svg";
  leftVerticalRectangle = "./leftVerticalRectangle.svg";
  rightVerticalRectangle = "./rightVerticalRectangle.svg";

  bottomLeftTriangle = "./bottomLeftTriangle.svg";
  bottomRightTriangle = "./bottomRightTriangle.svg";
  topLeftTriangle = "./topLeftTriangle.svg";
  topRightTriangle = "./topRightTriangle.svg";

  mySquare = "./square.svg";

  imgVerticalRectSource = "./vertical-rect.svg";

  radio = createRadio();

  radio.option("square", "");

  radio.option("top half horizontal rectangle", "");
  radio.option("bottom half horizontal rectangle", "");
  radio.option("left vertical rectangle", "");
  radio.option("right vertical rectangle", "");

  radio.option("bottom left triangle", "");
  radio.option("bottom right triangle", "");
  radio.option("top left triangle", "");
  radio.option("top right triangle", "");

  // Position and style the radio buttons
  radio.position(5, 14);
  radio.style("display", "flex");
  radio.style("flex-direction", "column");
  radio.style("gap", "15px");

  addImageToRadio("square", mySquare);
  addImageToRadio("top half horizontal rectangle", topHalfHorizontalRectangle);
  addImageToRadio(
    "bottom half horizontal rectangle",
    bottomHalfHorizontalRectangle
  );
  addImageToRadio("bottom right triangle", bottomRightTriangle);
  addImageToRadio("bottom left triangle", bottomLeftTriangle);
  addImageToRadio("top right triangle", topRightTriangle);
  addImageToRadio("top left triangle", topLeftTriangle);
  addImageToRadio("left vertical rectangle", leftVerticalRectangle);
  addImageToRadio("right vertical rectangle", rightVerticalRectangle);

  // Default selected option
  radio.selected("square");
}

function draw() {
  background("#000000");

  drawGridLines();

  fill("#ffffff");
  rect(0, 0, squareSize * bounds[0], squareSize * bounds[1]);

  for (let mySq of mySquares) {
    if (mySq.isVisible) {
      mySq.showChosenShape();
    }
  }
}

function mousePressed() {
  for (let mySq of mySquares) {
    if (mySq.checkIfClickInSquare(mouseX, mouseY)) {
      mySq.shape = radio.value();
      mySq.isVisible = true;
    }
  }
}

function drawGridLines() {
  stroke("#ffffff");
  for (let i = 0; i < numCols; i++) {
    line(i * squareSize, 0, i * squareSize, height);
  }
  for (let i = 0; i < numRows; i++) {
    line(0, i * squareSize, width, i * squareSize);
  }
}

function addImageToRadio(optionValue, img) {
  // Find the radio input element for the given value
  let radioElement = document.querySelector(`input[value="${optionValue}"]`);

  // Create an image element and add it after the radio button
  let imgElement = createImg(img);
  imgElement.size(15, 15);
  imgElement.parent(radioElement.parentElement); // Attach the image to the radio button label
}
