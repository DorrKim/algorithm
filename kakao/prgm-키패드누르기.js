function solution(numbers, hand) {
  const initialLeftHandPosition = 10 - 1;
  const initialRighttHandPosition = 12 - 1;
  let leftHandPosition = initialLeftHandPosition;
  let rightHandPosition = initialRighttHandPosition;

  const result = numbers.map((number) => {
    const index = (number === 0 ? 11 : number) - 1;
    const distToLeftHand =
      Math.abs(Math.floor(leftHandPosition / 3) - Math.floor(index / 3)) +
      Math.abs((leftHandPosition % 3) - (index % 3));
    const distToRightHand =
      Math.abs(Math.floor(rightHandPosition / 3) - Math.floor(index / 3)) +
      Math.abs((rightHandPosition % 3) - (index % 3));

    switch (index % 3) {
      case 0:
        leftHandPosition = index;
        return 'L';
      case 1:
        if (distToLeftHand === distToRightHand) {
          if (hand === 'left') {
            leftHandPosition = index;
          } else {
            rightHandPosition = index;
          }
          return hand.slice(0, 1).toUpperCase();
        } else if (distToLeftHand < distToRightHand) {
          leftHandPosition = index;
          return 'L';
        } else {
          rightHandPosition = index;
          return 'R';
        }
      case 2:
        rightHandPosition = index;
        return 'R';
      default:
        return;
    }
  });

  return result.join('');
}
