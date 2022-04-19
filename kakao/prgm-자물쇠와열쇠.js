function solution(key, lock) {
  const keys = getRotatedKeys(key);

  const lockSlots = getLockSlots(lock);

  if (lockSlots.length === 0) return true;

  const validKey = keys.find((key) => {
    const keyPeaks = getKeyPeaks(key);

    let isValidKey = false;

    keyPeaks.forEach((peak, i, self) => {
      if (isValidKey) return;
      const copyLock = JSON.parse(JSON.stringify(lock));
      let diff = [lockSlots[0][0] - peak[0], lockSlots[0][1] - peak[1]];
      let isFit = true;

      self.forEach(([ax, ay]) => {
        if (!isFit) return;
        const rx = ax + diff[0];
        const ry = ay + diff[1];

        if (rx < 0 || rx >= copyLock.length || ry < 0 || ry >= copyLock.length) return;
        if (copyLock[rx][ry] === 1) {
          isFit = false;
        } else {
          copyLock[rx][ry] = 1;
        }
      });

      if (isFit) {
        isValidKey = copyLock.every((line) => line.every((el) => el === 1));
      }
    });

    return isValidKey;
  });

  return validKey !== undefined;
}

function getKeyPeaks(key) {
  const keyPeaks = [];
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (key[i][j] === 0) continue;
      keyPeaks.push([i, j]);
    }
  }
  return keyPeaks;
}

function getRotatedKeys(key) {
  const keys = [key];
  let rotatedKey = key;

  for (let i = 0; i < 3; i++) {
    rotatedKey = rotateClockWise(rotatedKey);
    keys.push(rotatedKey);
  }

  return keys;
}

function getLockSlots(lock) {
  const lockSlots = [];

  for (let i = 0; i < lock.length; i++) {
    for (let j = 0; j < lock.length; j++) {
      if (lock[i][j] === 1) continue;
      lockSlots.push([i, j]);
    }
  }
  return lockSlots;
}

function rotateClockWise(key) {
  const copy = JSON.parse(JSON.stringify(key));
  const size = copy.length;
  const rotated = copy.map((row, rowIndex, board) => row.map((_, colIndex) => board[size - colIndex - 1][rowIndex]));

  return rotated;
}
