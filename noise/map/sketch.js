let houses = [];
let newPositions = [];
let houseDim = { width: 50, height: 80 };
let treasurePos;
let startingPos;
let total = 1050;

function setup() {
  createCanvas(windowWidth / 3, windowHeight);
  treasurePos = getRandomInt(0, total);

  startingPos = getRandomInt(0, total);
  while (startingPos == treasurePos) {
    startingPos = getRandomInt(0, total);
  }

  console.log(treasurePos, startingPos);

  for (let i = 0; i < total; i++) {
    // Generate unique noise values for each iteration
    let noiseSeed = i * 0.1; // Use the loop counter to vary the noise inputs

    let noiseWidth = noise(noiseSeed);
    let noiseHeight = noise(noiseSeed + 100); // Offset to generate a different noise value for height

    // Map the noise values to the desired width and height range
    houseDim.width = map(noiseWidth, 0, 1, 10, 20);
    houseDim.height = map(noiseHeight, 0, 1, 20, 40);

    let rColor = color(random(150, 255), random(150, 255), random(150, 255));
    let tColor = color(random(150, 255), random(150, 255), random(150, 255));

    // Add new house with generated dimensions
    houses.push(
      new House(-1, -1, houseDim.width, houseDim.height, rColor, tColor)
    );
  }

  const originalHouseList = JSON.parse(JSON.stringify(houses));
  console.log(originalHouseList);

  // Run the bottom-left packing algorithm
  houses = bottomLeftPacking(houses, width, height);
  console.log(houses);
  noLoop();
}

function draw() {
  background(0);
  let i = 0;
  for (let h of houses) {
    h.shape.x = h.x;
    h.shape.y = h.y;
    h.shape.show();

    if (i == treasurePos) {
      fill(0);
      noStroke();
      text("X", h.shape.x + h.shape.w / 4, h.shape.y + (3 / 4) * h.shape.h);
    }

    if (i == startingPos) {
      fill(255);
      noStroke();
      ellipse(h.shape.x + h.shape.w / 2, h.shape.y + (3 / 4) * h.shape.h, 10);
    }

    i++;
  }
}

function bottomLeftPacking(shapes) {
  // Sort shapes by area (or height and width, as needed)
  sortByArea(shapes);

  let addedShapes = [];
  let placementPositions = [{ x: 4, y: height - 4 }]; // Start with bottom-left corner

  for (let s of shapes) {
    let placed = false;

    // Try each possible placement position
    for (let i = 0; i < placementPositions.length; i++) {
      let pos = placementPositions[i];
      let x = pos.x;
      let y = pos.y - s.h; // Adjust y for the bottom-left alignment

      // Check if the shape can fit at this x, y position
      if (canPlaceShape(x, y, s, addedShapes)) {
        // Record the placed shape
        addedShapes.push({ shape: s, x: x, y: y });
        placed = true;

        // Add new possible placement positions:
        // One to the right of the placed shape and one above the placed shape
        placementPositions.push({
          x: x + s.w, // Right side of the shape
          y: y + s.h, // Same y level
        });
        placementPositions.push({
          x: x, // Same x level
          y: y, // Above the shape
        });

        // Remove the current position from the list since it's now occupied
        placementPositions.splice(i, 1);
        break; // Break once the shape is placed
      }
    }

    // If no valid position was found, the shape doesn't fit in the canvas
    if (!placed) {
      console.log("Shape doesn't fit in canvas");
      return null;
    }

    // if (
    //   !hasSpaceForRemainingShapes(
    //     shapes.slice(addedShapes.length),
    //     placementPositions
    //   )
    // ) {
    //   console.log("No more space available for remaining shapes");
    //   break; // Exit the loop if no more space is available
    // }
  }

  return addedShapes;
}

// Helper function to check if a shape can be placed at a given x, y position
function canPlaceShape(x, y, shape, pos) {
  // Ensure the shape fits within canvas bounds
  if (x + shape.w > width || y < 0) {
    // Ensures shape stays within canvas height
    return false;
  }

  // Check if the shape overlaps with any previously placed shape
  for (let item of pos) {
    if (
      shapesOverlap(
        {
          x: item.x,
          y: item.y,
          width: item.shape.w,
          height: item.shape.h,
        },
        {
          x: x,
          y: y,
          width: shape.w,
          height: shape.h,
        }
      )
    ) {
      return false;
    }
  }

  // If all checks pass, the shape can be placed
  return true;
}

// Helper function to check if two shapes overlap
function shapesOverlap(existingShape, newShape) {
  // Check if the two shapes are disjoint (i.e., no overlap)
  const noOverlap =
    newShape.x + newShape.width <= existingShape.x || // newShape is to the left
    newShape.x >= existingShape.x + existingShape.width || // newShape is to the right
    newShape.y + newShape.height <= existingShape.y || // newShape is above
    newShape.y >= existingShape.y + existingShape.height; // newShape is below

  // If they are not disjoint, then they overlap
  return !noOverlap;
}

// Sort shapes by area for efficient packing
function sortByArea(shapes) {
  shapes.sort((a, b) => {
    const areaA = a.w * a.h;
    const areaB = b.w * b.h;
    return areaB - areaA; // Sort in descending order by area
  });
}

function getRandomInt(min, max) {
  // Ensure min is inclusive, max is exclusive
  return floor(random(min, max + 1));
}
