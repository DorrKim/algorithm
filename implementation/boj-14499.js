const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const [N, M, X, Y, K] = input[0].split(' ').map(Number);
const COMMANDS = input.pop().split(' ').map(Number);
const BOARD = input.slice(1).map((row) => row.split(' ').map(Number));

class Dice {
  constructor() {
    this.face = {
      top: 0,
      bottom: 0,
      front: 0,
      back: 0,
      left: 0,
      right: 0
    };
  }

  copyToBottom(number) {
    this.face.bottom = number;
  }

  rollFront() {
    const { top, bottom, front, back } = this.face;
    this.face.top = back;
    this.face.front = top;
    this.face.bottom = front;
    this.face.back = bottom;
  }

  rollBehind() {
    const { top, bottom, front, back } = this.face;
    this.face.top = front;
    this.face.front = bottom;
    this.face.bottom = back;
    this.face.back = top;
  }

  rollLeft() {
    const { top, bottom, left, right } = this.face;
    this.face.top = right;
    this.face.left = top;
    this.face.bottom = left;
    this.face.right = bottom;
  }

  rollRight() {
    const { top, bottom, left, right } = this.face;
    this.face.top = left;
    this.face.right = top;
    this.face.bottom = right;
    this.face.left = bottom;
  }
}

function solution([X, Y], BOARD, COMMANDS) {
  const dice = new Dice();
  const result = [];
  let row = X;
  let col = Y;

  COMMANDS.forEach((command) => {
    const dr = '1102'[command - 1] - 1;
    const dc = '2011'[command - 1] - 1;

    const nr = row + dr;
    const nc = col + dc;

    if (nr < 0 || nr >= BOARD.length || nc < 0 || nc >= BOARD[0].length) return;

    row = nr;
    col = nc;

    switch (command) {
      case 1:
        dice.rollRight();
        break;
      case 2:
        dice.rollLeft();
        break;
      case 3:
        dice.rollBehind();
        break;
      case 4:
        dice.rollFront();
        break;
      default:
        break;
    }
    if (BOARD[row][col] === 0) {
      BOARD[row][col] = dice.face.bottom;
    } else {
      dice.face.bottom = BOARD[row][col];
      BOARD[row][col] = 0;
    }
    result.push(dice.face.top);
  });
  console.log(result.join('\n'));
}

solution([X, Y], BOARD, COMMANDS);
