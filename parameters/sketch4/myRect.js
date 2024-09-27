class myRect {
  constructor(x, y, size, c, shape) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = c;
    this.isVisible = false;

    this.shape = shape || "square";
  }

  showSquare() {
    fill(this.c);
    stroke("#ffffff");
    rect(this.x, this.y, this.size);
  }

  showBottomRightTriangle() {
    fill(this.c);
    stroke("#ffffff");
    triangle(
      this.x + this.size,
      this.y + this.size,
      this.x + this.size,
      this.y,
      this.x,
      this.y + this.size
    );
  }

  showBottomLeftTriangle() {
    fill(this.c);
    stroke("#ffffff");
    triangle(
      this.x,
      this.y,
      this.x,
      this.y + this.size,
      this.x + this.size,
      this.y + this.size
    );
  }

  showTopRightTriangle() {
    fill(this.c);
    stroke("#ffffff");
    triangle(
      this.x,
      this.y,
      this.x + this.size,
      this.y,
      this.x + this.size,
      this.y + this.size
    );
  }

  showTopLeftTriangle() {
    fill(this.c);
    stroke("#ffffff");
    triangle(
      this.x,
      this.y,
      this.x + this.size,
      this.y,
      this.x,
      this.y + this.size
    );
  }

  showTopHalfHorizontalRectangle() {
    fill(this.c);
    stroke("#ffffff");
    rect(this.x, this.y, this.size, this.size / 2);
  }

  showBottomHalfHorizontalRectangle() {
    fill(this.c);
    stroke("#ffffff");
    rect(this.x, this.y + this.size / 2, this.size, this.size / 2);
  }

  showLeftVerticalRectangle() {
    fill(this.c);
    stroke("#ffffff");
    rect(this.x, this.y, this.size / 2, this.size);
  }

  showRightVerticalRectangle() {
    fill(this.c);
    stroke("#ffffff");
    rect(this.x + this.size / 2, this.y, this.size / 2, this.size);
  }

  showChosenShape() {
    if (this.shape == "square") {
      this.showSquare();
    } else if (this.shape == "bottom right triangle") {
      this.showBottomRightTriangle();
    } else if (this.shape == "bottom left triangle") {
      this.showBottomLeftTriangle();
    } else if (this.shape == "top right triangle") {
      this.showTopRightTriangle();
    } else if (this.shape == "top left triangle") {
      this.showTopLeftTriangle();
    } else if (this.shape == "top half horizontal rectangle") {
      this.showTopHalfHorizontalRectangle();
    } else if (this.shape == "bottom half horizontal rectangle") {
      this.showBottomHalfHorizontalRectangle();
    } else if (this.shape == "left vertical rectangle") {
      this.showLeftVerticalRectangle();
    } else {
      this.showRightVerticalRectangle();
    }
  }

  checkIfClickInSquare(mX, mY) {
    // Check if the mouse is within the x and y bounds of the square
    return (
      mX >= this.x &&
      mX <= this.x + this.size &&
      mY >= this.y &&
      mY <= this.y + this.size
    );
  }
}
