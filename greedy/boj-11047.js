const [NK, ...strCoins] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, K] = NK.split(' ');
const coins = strCoins.map(Number);

function solution(K, coins) {
  let balance = K;

  const minUsageCoin = coins.reduceRight((count, currCoin) => {
    if (currCoin > balance) return count;
    const countUsageCurrCoin = Math.floor(balance / currCoin);
    balance -= countUsageCurrCoin * currCoin;

    return count + countUsageCurrCoin;
  }, 0);

  console.log(minUsageCoin);
}

solution(+K, coins);
