let params = {
  CIRCLE_RADIUS: 10,
  FLOCK_NUMBER: 20,
  FLOCK_SPACING: 1,
  BOUNDING_OFFSET: 0,
  DEMO: ['orbit', 'flock']
};
let orbitParams = {
  CIRCLE_RADIUS: 25,
};
let gui;
let move;

function setup() {
  createCanvas(windowWidth, windowHeight);
  move = new Move();

  gui = createGui('p5.move.js demo');
  gui.addObject(params);

 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (params.DEMO === 'orbit') {
    // move around the mouse
    orbitDemo();
  } else if (params.DEMO === 'flock') {
    flockDemo();
  }
}

function orbitDemo() {
  const { x, y } = move.orbit(mouseX, mouseY, width / 2, height / 2, frameCount / 100);
  noStroke();
  let randomColor = random(move.color.colors.find(n => n.name === 'roygbiv').colors);
  fill(randomColor, 100)
  ellipse(
    constrain(x, 0 + params.BOUNDING_OFFSET, width - params.BOUNDING_OFFSET), 
    constrain(y, 0 + params.BOUNDING_OFFSET, height - params.BOUNDING_OFFSET), 
    params.CIRCLE_RADIUS, params.CIRCLE_RADIUS
  );
}

function flockDemo() {
  let flock = [];
  
  // the first bird follows the mouse
  const { x: fx, y: fy } = move.flock(mouseX, mouseY, width / 2, height / 2, frameCount / 100, params.FLOCK_SPACING);
  ellipse(fx, fy, params.CIRCLE_RADIUS, params.CIRCLE_RADIUS);

  // add the first bird to the flock
  flock.push({ x: fx, y: fy })

  // the second bird follows the first bird, the third the second, etc.
  for (let n = 1; n < params.FLOCK_NUMBER; n++) {
    let leader = flock[n - 1]; // the bird that is being followed

    let drift = move.btw(
      -params.FLOCK_SPACING, 
       params.FLOCK_SPACING,
       Math.random() * n / (params.FLOCK_NUMBER - 1)
    );
    const { x: fnx, y: fny } = move.flock(
      leader.x, leader.y,
      width / 2, height / 2,
      frameCount / 100, params.FLOCK_SPACING * n + drift
    );

    let birdColor = move.color.mapToRoygbiv(0, params.FLOCK_NUMBER - 1, n);

    // draw the bird
    noStroke();
    fill(birdColor, 100)
    ellipse(
      constrain(fnx, 0 + params.BOUNDING_OFFSET, width - params.BOUNDING_OFFSET),
      constrain(fny, 0 + params.BOUNDING_OFFSET, height - params.BOUNDING_OFFSET),
      params.CIRCLE_RADIUS, params.CIRCLE_RADIUS
    );

    // add the bird to the flock
    flock.push({ x: fnx, y: fny });
  }
}
