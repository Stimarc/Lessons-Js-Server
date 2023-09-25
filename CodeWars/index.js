function firstNonConsecutive(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1] + 1) {
        return arr[i];
      }
    }
    return null;
  }
  
  // Example
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr2 = [1, 2, 3, 4, 6, 7, 8];
  console.log(firstNonConsecutive(arr1));
  console.log(firstNonConsecutive(arr2));
  