const sockMerchant = (
  numberOfSocks: number,
  listOfColorCode: number[],
): number => {
  const socksCountsByColor = listOfColorCode.reduce(
    (prev, curr) => {
      const key = `${curr}`;
      if (prev.hasOwnProperty(key)) {
        prev[key] = prev[key] + 1;
        if (prev[key] % 2 === 0) {
          prev.pairs = prev.pairs + 1;
        }
        return prev;
      }
      prev[key] = 1;
      return prev;
    },
    { pairs: 0 } as any,
  );
  return socksCountsByColor.pairs;
};
console.log(
  sockMerchant(9, [10, 20, 20, 3, 10, 30, 50, 10, 30, 40, 20, 3, 50]),
); // example
