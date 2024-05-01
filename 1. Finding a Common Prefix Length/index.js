/**
 *
 * @param {string} origin
 * @param {string} suffix
 * @returns {number}
 */
function binarySearch(origin, suffix) {
  let prefix = "";
  let low = 0,
      high = suffix.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    const [originalSlice, suffixSlice] = [
      origin.slice(low, mid + 1),
      suffix.slice(low, mid + 1),
    ];

    if (originalSlice && suffixSlice && originalSlice === suffixSlice) {
      prefix += origin.slice(low, mid + 1);
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return prefix.length;
}

/**
 * @param {string[]} inputs
 * @returns {number[]}
 */
function commonPrefix(inputs) {
  return inputs.map((origin) => {
    let sum = 0;
    for (let i = 0; i < origin.length; i++) {
      const suffix = origin.slice(i);
      sum += binarySearch(suffix, origin.slice(0, suffix.length));
    }
    return sum;
  });
}

console.log(commonPrefix(["aa", "ababaa"]));
