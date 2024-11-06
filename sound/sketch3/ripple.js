class myRipple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10; // Initial size of the ripple
    this.alpha = 200; // Initial opacity of the ripple
  }

  expand() {
    this.size += 5; // Increase the size continuously
    this.alpha -= 3; // Decrease the alpha gradually for fade-out
  }

  display() {
    noFill();
    stroke(255, 0, 150, this.alpha); // Ripple color with fading alpha
    strokeWeight(2);
    ellipse(this.x, this.y, this.size); // Draw the single expanding ellipse
  }

  isFinished() {
    return this.alpha <= 0; // Ripple is finished when fully transparent
  }
}
