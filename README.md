# p5.move.js

`Move` is a library for p5.js that provides a simple way to move objects around the canvas.
`SuperColor` is also available at `Move.color`, it's a class that provides a simple way to manipulate colors.

_FYI, this is not structured sanely yet. So I should mention that..._
### ..the main source file lives [here](./demo/move/libraries/p5.move.js).

_...and the demo site is here: https://supercolored.github.io/move/_

## Note

This is very much a work in progress and a passion project. I'm taking liberties with my definition of `flock` and `orbit` but I'll either adjust the algorithms or give those methods more fitting names. Eventually I'll package this a little more sanely and properly submit to Processing, but for now, I'm just gonna obsessively tweak and add stuff that helps me with personal projects. 

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
