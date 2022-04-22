function solution(bracketStr) {
  const result = convertRightBracketStr(bracketStr);
  return result;
}

function convertRightBracketStr(bracketStr) {
  if (bracketStr.trim() === '') return bracketStr;
  const [u, v] = splitToBlancedBrackets(bracketStr);

  if (checkValidBracketStr(u)) {
    return u + convertRightBracketStr(v);
  } else {
    return `(${convertRightBracketStr(v)})${u
      .slice(1, -1)
      .split('')
      .map((bracket) => (bracket === '(' ? ')' : '('))
      .join('')}`;
  }
}

function splitToBlancedBrackets(str) {
  let countOpenBracket = 0;
  let countCloseBracket = 0;
  let splitIndex = 0;

  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    if (bracket === '(') countOpenBracket++;
    else countCloseBracket++;

    if (countOpenBracket === countCloseBracket) {
      splitIndex = i;
      break;
    }
  }

  return [str.slice(0, splitIndex + 1), str.slice(splitIndex + 1)];
}

function checkValidBracketStr(bracketStr) {
  const stack = [];

  for (let bracket of bracketStr) {
    if (bracket === ')' && stack.length >= 1) {
      const top = stack[stack.length - 1];
      if (top === '(') stack.pop();
      continue;
    }
    stack.push(bracket);
  }

  return stack.length === 0;
}
