class myCircle {
  constructor(
    x,
    y,
    originX,
    originY,
    c,
    size,
    trailLength,
    amplitudeX,
    amplitudeY,
    period,
    direction
  ) {
    this.x = x;
    this.y = y;
    this.originX = originX;
    this.originY = originY;
    this.c = c;
    this.size = size;
    this.trail = [];
    this.maxTrailLength = trailLength;
    this.amplitudeX = amplitudeX;
    this.amplitudeY = amplitudeY;
    this.period = period;
    this.direction = direction;
  }

  updateTrail() {
    // Add the current position to the trail array
    this.trail.push({ x: this.x, y: this.y });

    // Remove the oldest position if trail length exceeds max length
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
  }

  show() {
    fill(this.c);

    // Draw the main ellipse
    ellipse(this.x, this.y, this.size);

    for (let i = 0; i < this.trail.length; i++) {
      const pos = this.trail[i];
      const opacity = map(i, 0, this.trail.length, 0, 150); // Fade out over trail length

      fill(red(this.c), green(this.c), blue(this.c), opacity);
      noStroke();
      ellipse(pos.x, pos.y, this.size); // Slightly smaller trail circles
    }
  }
}
