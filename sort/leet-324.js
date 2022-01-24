const wiggleSort = function (nums) {
  const temp = [...nums].sort((a, b) => b - a);
  const half = Math.floor(nums.length / 2);

  for (let i = 0; i < half; i++) {
    nums[2 * i + 1] = temp[i];
  }

  for (let i = half; i < nums.length; i++) {
    const remainIndex = i - half;
    nums[2 * remainIndex] = temp[i];
  }
};
