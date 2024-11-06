class myBlob {
  constructor(x, y, innerColor, radius) {
    this.x = x;
    this.y = y;
    this.innerColor = innerColor;
    this.outerColor = color(0, 0, 0); // Outer color set to white for blending
    this.radius = radius;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  display() {
    for (let r = this.radius; r > 0; r -= 1) {
      let interColor = lerpColor(
        this.innerColor,
        this.outerColor,
        r / this.radius
      );
      fill(interColor);
      noStroke();
      ellipse(this.x, this.y, r * 2, r * 2);
    }
  }
}
