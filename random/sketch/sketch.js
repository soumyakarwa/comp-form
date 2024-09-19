let rows = 7;
let columns = 5;
let squareWidth;
let gridRects = [];
let blackColor;
let alphaBounds = [100, 200];
let singleSquareChance = 0.45;
let chainBounds = [2, 4];

function setup() {
  createCanvas(484, 660);
  squareWidth = width / (columns + 0.5);
  blackColor = color(0, 0, 0, 100);
  noLoop();
  // frameRate(5);

  // Initialize GridRect objects in a 2D array
  for (let i = 0; i < columns; i++) {
    gridRects[i] = [];
    for (let j = 0; j < rows; j++) {
      let xLoc = squareWidth / 4 + squareWidth * i;
      let yLoc = squareWidth / 4 + squareWidth * j;
      gridRects[i][j] = new gridRect(i, j, xLoc, yLoc, squareWidth);
    }
  }
}

function draw() {
  background(255);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if ((i + j) % 2 == 0 && gridRects[i][j].filled == false) {
        let colorToFill = color(
          random(150, 255),
          random(150, 255),
          random(150, 255)
        );

        let randomChance = random(0, 1);
        let leftOrRight = random(0, 1);
        let direction;
        let numberOfSquares;

        if (leftOrRight < 0.5) {
          direction = "rightTop";
        } else {
          direction = "rightBottom";
        }

        if (randomChance < singleSquareChance) {
          numberOfSquares = 1;
        } else {
          numberOfSquares = randomInt(chainBounds[0], chainBounds[1]);
        }

        if (numberOfSquares == 1) {
          colorToFill = blackColor;
        }

        for (let k = 0; k < numberOfSquares; k++) {
          let newI, newJ;
          if (direction == "rightBottom") {
            newI = i + k;
            newJ = j + k;
            console.log(
              `i: ${i}, j: ${j}, numberOfSquares: ${numberOfSquares},  direction: ${direction}, newI: ${newI}, newJ: ${newJ}`
            );
          } else {
            newI = i + k;
            newJ = j - k;
            console.log(
              `i: ${i}, j: ${j}, numberOfSquares: ${numberOfSquares},  direction: ${direction}, newI: ${newI}, newJ: ${newJ}`
            );
          }

          if (numberOfSquares != 1) {
            colorToFill = setAlpha(
              colorToFill,
              random(alphaBounds[0], alphaBounds[1])
            );
          }
          if (newI >= 0 && newI < columns && newJ >= 0 && newJ < rows) {
            let curr = getGridRect(newI, newJ);
            if (curr && !curr.filled) {
              curr.setIsFilled(colorToFill, true);
              fill(colorToFill);
              curr.drawRect();
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if ((i + j) % 2 != 0 && !gridRects[i][j].filled) {
        // Get neighboring squares, but ensure they are within bounds
        let topSq = j > 0 ? getGridRect(i, j - 1) : null;
        let bottomSq = j < rows - 1 ? getGridRect(i, j + 1) : null;
        let leftSq = i > 0 ? getGridRect(i - 1, j) : null;
        let rightSq = i < columns - 1 ? getGridRect(i + 1, j) : null;

        if (topSq && rightSq) {
          drawTriangleIfMatchingColors(
            topSq,
            rightSq,
            i,
            j,
            "topRight",
            squareWidth,
            blackColor,
            [100, 200]
          );
        }

        if (bottomSq && leftSq) {
          drawTriangleIfMatchingColors(
            bottomSq,
            leftSq,
            i,
            j,
            "bottomLeft",
            squareWidth,
            blackColor,
            alphaBounds
          );
        }

        if (topSq && leftSq) {
          drawTriangleIfMatchingColors(
            topSq,
            leftSq,
            i,
            j,
            "topLeft",
            squareWidth,
            blackColor,
            [100, 200]
          );
        }

        if (bottomSq && rightSq) {
          drawTriangleIfMatchingColors(
            bottomSq,
            rightSq,
            i,
            j,
            "bottomRight",
            squareWidth,
            blackColor,
            alphaBounds
          );
        }
      }
    }
  }
}

function colorsEqual(c1, c2) {
  return (
    red(c1) === red(c2) && green(c1) === green(c2) && blue(c1) === blue(c2)
  );
}

function getGridRect(i, j) {
  if (i >= 0 && i < columns && j >= 0 && j < rows) {
    return gridRects[i][j];
  }
  return null; // Return null if i, j are out of bounds
}

function setAlpha(c, a) {
  // Extract the red, green, and blue components of the current filledColor
  let r = red(c);
  let g = green(c);
  let b = blue(c);

  return color(r, g, b, a);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawTriangleIfMatchingColors(
  sq1,
  sq2,
  i,
  j,
  direction,
  squareWidth,
  blackColor,
  alphaBounds
) {
  // Check if both squares have matching filled colors and are not black
  if (
    sq1 &&
    sq2 &&
    colorsEqual(sq1.filledColor, sq2.filledColor) &&
    !colorsEqual(sq1.filledColor, blackColor) &&
    !colorsEqual(sq2.filledColor, blackColor)
  ) {
    // Convert grid coordinates to canvas coordinates
    let x = i * squareWidth + squareWidth / 4;
    let y = j * squareWidth + squareWidth / 4;

    // Set the fill color with interpolated and random alpha
    fill(
      setAlpha(
        lerpColor(sq1.filledColor, sq2.filledColor, 0.5),
        random(alphaBounds[0], alphaBounds[1])
      )
    );

    // Draw a triangle based on the direction
    if (direction === "topRight") {
      triangle(x, y, x + squareWidth, y, x + squareWidth, y + squareWidth);
    } else if (direction === "bottomLeft") {
      triangle(x, y, x, y + squareWidth, x + squareWidth, y + squareWidth);
    } else if (direction === "topLeft") {
      triangle(x, y, x, y + squareWidth, x + squareWidth, y);
    } else if (direction === "bottomRight") {
      triangle(
        x,
        y + squareWidth,
        x + squareWidth,
        y,
        x + squareWidth,
        y + squareWidth
      );
    }
  }
}
