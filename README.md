# p5.move.js

`Move` is a library for p5.js that provides a simple way to move objects around the canvas.
`SuperColor` is also available at `Move.color`, it's a class that provides a simple way to manipulate colors.

The source lives [here](./demo/move/libraries/p5.move.js).

## Usage

```javascript
const move = new Move();
 
function setup() {
  createCanvas(400, 400);
  frameRate(60);
}
 
function draw() {
  background(0);

  // orbit around the mouse
  const { x, y } = move.orbit(mouseX, mouseY, width / 2, height / 2, frameCount / 60);
  
  noStroke();
  fill(255, 100)
  ellipse(x, y, 10, 10);
 }
```
