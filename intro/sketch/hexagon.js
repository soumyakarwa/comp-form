// Hexagon class to store properties and methods
class Hexagon {
  constructor(x, y, radius, rotationAngle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeColor = color(0); // Default black stroke
    this.strokeWeight = 1; // Default stroke weight
    this.rotationAngle = rotationAngle;
  }

  // Method to display the hexagon
  display() {
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
    noFill();
    push();

    // Translate to the center of the hexagon and rotate
    translate(this.x, this.y);
    rotate(this.rotationAngle);

    // Draw the hexagon at the origin after the transformation
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI / 6) * i; // 60 degrees in radians
      let vertexX = this.radius * cos(angle);
      let vertexY = this.radius * sin(angle);
      vertex(vertexX, vertexY);
    }
    endShape(CLOSE);

    // Restore the original transformation state
    pop();
  }

  // Method to change stroke color
  changeStrokeColor(r, g, b) {
    this.strokeColor = color(r, g, b);
  }

  // Method to change fill color
  changeFillColor(r, g, b, a = 255) {
    this.fillColor = color(r, g, b, a);
  }

  // Method to change stroke weight
  changeStrokeWeight(weight) {
    this.strokeWeight = weight;
  }

  // Method to move the hexagon
  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  // Method to change the radius
  changeRadius(newRadius) {
    this.radius = newRadius;
  }

  rotateHex(angle) {
    this.rotationAngle += angle; // Increment the rotation angle
  }
}
