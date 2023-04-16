/**
 * @fileoverview Move p5.js library
 * @version 1.0.0
 * @license MIT
 * @author Dennis "Mars" Porter Jr
 * 
 * @see {@link https://github.com/supercolored/move}
 * 
 * @description
 * Move is a library for p5.js that provides a simple way to move objects around the canvas.
 * 
 * @example
 * const move = new Move();
 * 
 * function setup() {
 *  createCanvas(400, 400);
 * }
 * 
 * function draw() {
 *  background(220);
 * 
 *  // move between 0 and 100
 *  const x = move.between(0, 100, 0.5);
 * 
 *  // move around 0, 0
 *  const y = move.around(0, 0, 0, 0, Math.PI / 2);
 * 
 *  // move flock 0, 0
 *  const z = move.flock(0, 0, 0, 0, Math.PI / 2, 100);
 * }
 * 
 */

const MOVE_EASING = {
  /* @param {number} t - time */
  quadIn: (t) => t * t,
  quadOut: (t) => t * (2 - t),
  quadInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  cubicIn: (t) => t * t * t,
  cubicOut: (t) => (--t) * t * t + 1,
  cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  quartIn: (t) => t * t * t * t,
  quartOut: (t) => 1 - (--t) * t * t * t,
  quartInOut: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  quintIn: (t) => t * t * t * t * t,
  quintOut: (t) => 1 + (--t) * t * t * t * t,
  quintInOut: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  sineIn: (t) => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  sineOut: (t) => Math.sin(Math.PI / 2 * t),
  sineInOut: (t) => 0.5 * (1 + Math.sin(Math.PI * t - Math.PI / 2)),
  sexticIn: (t) => t * t * t * t * t * t,
  sexticOut: (t) => 1 - (1 - t) * (1 - t) * (1 - t) * (1 - t) * (1 - t) * (1 - t),
  sexticInOut: (t) => t < 0.5 ? 6 * t * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 6) / 2,
}

class Move {
  constructor() {
    this.pace = MOVE_EASING;
  }

  /** 
   * @param {number} start - start value
   * @param {number} end - end value
   * @param {number} progress - progress value
   * @returns {number} - interpolated value
   * @example
   * move.between(0, 100, 0.5) // 50
   * move.between(0, 100, 0.25) // 25
   * move.between(0, 100, 0.75) // 75
   **/
  between = (start, end, progress) => start + (end - start) * progress;
  btwn = this.between; // alias

  backAndForth = (start, end, progress) => {
    const diff = end - start;
    const t = progress * 2;
    if (t < 1) {
      return start + diff * t;
    } else {
      return end - diff * (t - 1);
    }
  };
  baf = this.backAndForth; // alias

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @param {number} cx - center x coordinate
   * @param {number} cy - center y coordinate
   * @param {number} angle - angle in radians
   * 
   * @returns {object} - object with x and y coordinates
   * @example
   * move.around(0, 0, 0, 0, Math.PI / 2) // {x: 0, y: 0}
   * move.around(0, 0, 0, 0, Math.PI) // {x: 0, y: 0}
   * move.around(0, 0, 0, 0, Math.PI * 2) // {x: 0, y: 0}
   * move.around(0, 0, 0, 0, Math.PI * 3) // {x: 0, y: 0}
   **/
  around = (x, y, cx, cy, angle) => {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    x -= cx;
    y -= cy;
    const xnew = x * c - y * s;
    const ynew = x * s + y * c;
    return {
      x: xnew + cx,
      y: ynew + cy
    };
  };
  arnd = this.around; // alias

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @param {number} cx - center x coordinate
   * @param {number} cy - center y coordinate
   * @param {number} angle - angle in radians
   * @param {number} distance - distance from center
   * 
   * @returns {object} - object with x and y coordinates
   * @example
   * move.flock(0, 0, 0, 0, Math.PI / 2, 100) // {x: 100, y: 0}
   * move.flock(0, 0, 0, 0, Math.PI, 100) // {x: 0, y: -100}
   * move.flock(0, 0, 0, 0, Math.PI * 2, 100) // {x: 100, y: 0}
   * move.flock(0, 0, 0, 0, Math.PI * 3, 100) // {x: 100, y: 0}
   * move.flock(0, 0, 0, 0, Math.PI * 4, 100) // {x: 100, y: 0}
   * move.flock(0, 0, 0, 0, Math.PI * 5, 100) // {x: 100, y: 0}
   * move.flock(0, 0, 0, 0, Math.PI * 6, 100) // {x: 100, y: 0}
   **/
  flock = (x, y, cx, cy, angle, distance) => {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    x -= cx;
    y -= cy;
    const xnew = x * c - y * s;
    const ynew = x * s + y * c;
    return {
      x: xnew + cx + distance,
      y: ynew + cy + distance
    };
  };
}

export default Move;