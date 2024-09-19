class House {
  constructor(x, y, w, h, rectColor, triColor) {
    // x, y, w, h creates a bounding rectangular box for the house
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.rectColor = rectColor || color(100, 255, 100);
    this.triColor = triColor || color(255, 255, 100);

    // calculates the dimensions of the rectangle body and triangular roof such that 2/3 of the height would be the rectangle
    this.rectDimensions = { width: this.w, height: (2 / 3) * this.h };
    this.triangleDimensions = {
      width: this.w,
      height: this.h - this.rectDimensions.height,
    };

    this.setPositions();
    // appropriately calculates the individual x, y position of the triangle and rectangle
  }

  setPositions() {
    this.rectPos = { x: this.x, y: this.y + this.triangleDimensions.height };
    this.trianglePos = {
      x1: this.x,
      y1: this.y + this.triangleDimensions.height,
      x2: this.x + this.w,
      y2: this.y + this.triangleDimensions.height,
      x3: this.x + this.w / 2,
      y3: this.y,
    };
  }

  /**
   * Function to add the house to the canvas
   */
  show() {
    this.setPositions();
    noStroke();
    fill(this.rectColor);
    rect(
      this.rectPos.x,
      this.rectPos.y,
      this.rectDimensions.width,
      this.rectDimensions.height
    );
    fill(this.triColor);
    triangle(
      this.trianglePos.x1,
      this.trianglePos.y1,
      this.trianglePos.x2,
      this.trianglePos.y2,
      this.trianglePos.x3,
      this.trianglePos.y3
    );
  }
}
