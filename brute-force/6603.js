const stringTestCases = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const testCases = stringTestCases
  .slice(0, -1)
  .map((testCase) => testCase.split(' ').map((stringNumber) => +stringNumber));

function getLocalLottos(testCase) {
  const [K, ...S] = testCase;
  const isUsed = new Array(K).fill(false);
  const localLottos = [];
  combination([], 0);

  return localLottos.join('\n');

  function combination(selectedNumbers, currIndex) {
    if (selectedNumbers.length === 6) {
      const completeLotto = selectedNumbers.join(' ');
      localLottos.push(completeLotto);
      return;
    }

    if (isUsed[currIndex] || currIndex >= K) return;
    const newSelectedNumbers = [...selectedNumbers, S[currIndex]];
    isUsed[currIndex] = true;
    combination(newSelectedNumbers, currIndex + 1);
    combination(selectedNumbers, currIndex + 1);
    isUsed[currIndex] = false;
  }
}

function solution(testCases) {
  const lottos = [];
  testCases.forEach((testCase, index) => {
    const localLottos = getLocalLottos(testCase);
    console.log(localLottos);
    index !== testCases.length - 1 && console.log('');
  });
}
solution(testCases);
