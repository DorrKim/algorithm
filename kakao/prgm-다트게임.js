function solution(dartResult) {
  const tokens = dartResult.match(/\d+(S|D|T)(\*|#)?/g);
  const scores = [];
  tokens.forEach((token) => {
    const [score, bonus, option] = token.match(/\d+|(S|D|T)|(\*|#)?/g);
    let calcultedScore;

    switch (bonus) {
      case 'S':
        calcultedScore = score ** 1;
        break;
      case 'D':
        calcultedScore = score ** 2;
        break;
      case 'T':
        calcultedScore = score ** 3;
        break;
      default:
        return;
    }

    if (option === '*') {
      if (scores.length >= 1) {
        scores[scores.length - 1] = scores[scores.length - 1] * 2;
      }
      calcultedScore *= 2;
    } else if (option === '#') {
      calcultedScore *= -1;
    }
    scores.push(calcultedScore);
  });
  return scores.reduce((a, b) => a + b);
}
