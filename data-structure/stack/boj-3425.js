const input = require('fs').readFileSync('example.txt').toString().trim().split('\n');
const testCases = [];

let rest = input;

while (true) {
  const splitIndex = rest.findIndex((command) => command === '');
  if (splitIndex === -1) break;
  const testCase = rest.slice(0, splitIndex);
  rest = rest.slice(splitIndex + 1);

  testCases.push(testCase);
}

function solution(testCases) {
  const result = testCases.map((testCase) => executeGoStack(testCase)).join('\n\n');

  console.log(result);
}

class GoStack {
  constructor() {
    this.goStack = [];
  }

  numberPush(number) {
    this.goStack.push(number);
  }

  pop() {
    if (this.goStack.length === 0) {
      this.error();
    } else this.goStack.pop();
  }

  inverse() {
    if (this.goStack.length === 0) {
      this.error();
    } else {
      const firstNum = this.goStack.pop();
      this.goStack.push(-firstNum);
    }
  }

  dupulicate() {
    if (this.goStack.length === 0) {
      this.error();
    } else {
      const top = this.goStack[this.goStack.length - 1];
      this.goStack.push(top);
    }
  }

  swap() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const firstNumber = this.goStack.pop();
      const secondNumber = this.goStack.pop();

      this.goStack.push(firstNumber);
      this.goStack.push(secondNumber);
    }
  }

  add() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const firstNumber = this.goStack.pop();
      const secondNumber = this.goStack.pop();

      const sum = firstNumber + secondNumber;

      if (Math.abs(sum) > 10 ** 9) {
        this.error();
      } else this.goStack.push(sum);
    }
  }

  substract() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const firstNumber = this.goStack.pop();
      const secondNumber = this.goStack.pop();

      const diff = secondNumber - firstNumber;

      if (Math.abs(diff) > 10 ** 9) {
        this.error();
      } else this.goStack.push(diff);
    }
  }

  multiply() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const first = this.goStack.pop();
      const second = this.goStack.pop();

      const product = first * second;

      if (Math.abs(product) > 10 ** 9) {
        this.error();
      } else this.goStack.push(first * second);
    }
  }

  divide() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const first = this.goStack.pop();
      const second = this.goStack.pop();
      const isNegative = (first < 0 && second >= 0) || (first >= 0 && second < 0);

      if (first === 0) {
        this.error();
      } else {
        const absoluteValue = Math.floor(Math.abs(second) / Math.abs(first));
        this.goStack.push(isNegative ? -absoluteValue : absoluteValue);
      }
    }
  }

  modular() {
    if (this.goStack.length < 2) {
      this.error();
    } else {
      const first = this.goStack.pop();
      const second = this.goStack.pop();

      const isNegative = second < 0;

      if (first === 0) {
        this.error();
      } else {
        const absoluteValue = Math.floor(Math.abs(second) % Math.abs(first));
        this.goStack.push(isNegative ? -absoluteValue : absoluteValue);
      }
    }
  }

  error() {
    throw new Error('goStack error');
  }

  clear() {
    this.goStack = [];
  }
}

function executeGoStack(testCase) {
  const goStack = new GoStack();

  const commandMapper = {
    POP: () => goStack.pop(),
    INV: () => goStack.inverse(),
    DUP: () => goStack.dupulicate(),
    SWP: () => goStack.swap(),
    ADD: () => goStack.add(),
    SUB: () => goStack.substract(),
    MUL: () => goStack.multiply(),
    DIV: () => goStack.divide(),
    MOD: () => goStack.modular()
  };

  const numberStartIndex = testCase.findIndex((line) => !isNaN(line));
  const commands = testCase.slice(0, numberStartIndex);
  const numbers = testCase.slice(numberStartIndex);

  let result = '';

  loop1: for (let i = 1; i < numbers.length; i++) {
    const number = numbers[i];

    goStack.clear();

    goStack.numberPush(+number);

    for (let j = 0; j < commands.length - 1; j++) {
      const command = commands[j];
      if (command === 'END') break;

      if (command.startsWith('NUM')) {
        const [_, targetNumber] = command.split(' ');
        goStack.numberPush(+targetNumber);
      } else {
        try {
          commandMapper[command]();
        } catch (error) {
          result += 'ERROR\n';
          continue loop1;
        }
      }
    }

    if (goStack.goStack.length === 1) {
      result += `${goStack.goStack[0]}\n`;
    } else {
      result += 'ERROR\n';
    }
  }

  return result.trim();
}

solution(testCases);
