let mytxt = "comp form fall 2024";
let txtMap = {};
let txtLoc = [
  [2, 3],
  [2, 6],
  [2, 10],
  [2, 16],
  [5, 2],
  [5, 5],
  [5, 7],
  [5, 10],
  [8, 8],
  [8, 12],
  [8, 13],
  [8, 16],
  [11, 12],
  [11, 15],
  [11, 18],
  [11, 20],
];
let geist;
("");
let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let incr = 40;

function preload() {
  geist = loadFont("GeistMono-Medium.otf");
}

function setup() {
  createCanvas(1000, 520);
  mytxt = mytxt.split("").filter((char) => char !== " ");
  mytxt.forEach((l, i) => {
    let locationKey = `${incr / 4 + txtLoc[i][1] * incr},${
      incr / 2 + txtLoc[i][0] * incr
    }`;
    txtMap[locationKey] = l;
  });

  textFont(geist);
  textStyle(NORMAL);
  textSize(18);
  textAlign(LEFT);
  noLoop();

  exportButton = createButton("Export as PNG");
  exportButton.position(10, height + 10);
  exportButton.mousePressed(exportSketch);
}

function draw() {
  background(0);
  fill(255);
  for (let i = incr / 2; i < height; i += incr) {
    for (let j = incr / 4; j < width; j += incr) {
      // Create the location key
      console.log(i, j);
      let locationKey = `${j},${i}`;

      // Check if the location exists in txtMap
      if (txtMap[locationKey]) {
        // If it exists, use the letter from txtMap
        // fill("red");
        text(txtMap[locationKey], j, i);
      } else {
        // If no match, draw a random letter
        fill(255);
        let randomLetter = random(letters);
        text(randomLetter, j, i);
      }
    }
  }

  // for (let i = 0; i < width; i += 20) {
  //   line(i, 0, i, height);
  // }
  // for (let i = 0; i < height; i += 20) {
  //   line(0, i, width, i);
  // }
}

function exportSketch() {
  saveCanvas("mySketch", "png");
}
