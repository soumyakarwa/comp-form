class Shape {
  constructor(
    centerX,
    centerY,
    startAngle,
    endAngle,
    lineLength,
    baseColor,
    ringWidth
  ) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.lineLength = lineLength;
    this.baseColor = baseColor || color(100, 200, 100);
    this.ringWidth = ringWidth;
    this.gap = random(1, 5);
    this.ringColor = color(
      random(100, 255),
      random(100, 255),
      random(100, 255)
    );

    this.triangleCoordinates = this.calculateTriangleCoordinates();
    [this.baseEllipseCoorindates, this.baseEllipseRadius] =
      this.calculateBaseEllipseCoordinates();
  }

  calculateTriangleCoordinates() {
    let startAngleRadians = radians(this.startAngle);
    let endAngleRadians = radians(this.endAngle);

    let startX = this.centerX + this.lineLength * cos(startAngleRadians);
    let startY = this.centerY + this.lineLength * sin(startAngleRadians);

    let endX = this.centerX + this.lineLength * cos(endAngleRadians);
    let endY = this.centerY + this.lineLength * sin(endAngleRadians);

    return [this.centerX, this.centerY, startX, startY, endX, endY];
  }

  calculateBaseEllipseCoordinates() {
    let [, , startX, startY, endX, endY] = this.triangleCoordinates;

    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;

    let radius = dist(startX, startY, endX, endY);

    return [[midX, midY], radius];
  }

  show() {
    // stroke(0);
    fill(this.baseColor);
    triangle(...this.triangleCoordinates);

    ellipse(...this.baseEllipseCoorindates, this.baseEllipseRadius);
    fill(this.ringColor);
    ellipse(...this.baseEllipseCoorindates, this.baseEllipseRadius - this.gap);
    fill(this.baseColor);
    ellipse(
      ...this.baseEllipseCoorindates,
      this.baseEllipseRadius - this.gap - this.ringWidth
    );
  }

  changeLineLength(length) {
    this.lineLength = length;
    this.triangleCoordinates = this.calculateTriangleCoordinates();
    [this.baseEllipseCoorindates, this.baseEllipseRadius] =
      this.calculateBaseEllipseCoordinates();
  }
}
