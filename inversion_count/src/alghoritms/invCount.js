function mergeAndCount(arr, temp, left, mid, right) {
    let inv_count = 0;
    let i = left;
    let j = mid + 1;
    let k = left;
  
    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp[k] = arr[i];
        i++;
      } else {
        temp[k] = arr[j];
        j++;
        inv_count += mid - i + 1;
      }
      k++;
    }
  
    while (i <= mid) {
      temp[k] = arr[i];
      i++;
      k++;
    }
  
    while (j <= right) {
      temp[k] = arr[j];
      j++;
      k++;
    }
  
    for (let l = left; l <= right; l++) {
      arr[l] = temp[l];
    }
  
    return inv_count;
  }
  
  function sortAndCount(arr, temp, left, right) {
    let inv_count = 0;
  
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
  
      inv_count += sortAndCount(arr, temp, left, mid); 
      inv_count += sortAndCount(arr, temp, mid + 1, right); 
      inv_count += mergeAndCount(arr, temp, left, mid, right); 
    }
  
    return inv_count;
  }
  
  function invCount(arr) {
    const temp = Array(arr.length);
    return sortAndCount(arr, temp, 0, arr.length - 1);
  }
  
  
  // Example usage:
  var arr = [
    [8, 4, 2, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [1, 5,  4,  8,  10,  2],
    [6, 9, 12, 11, 3, 7]
]

  arr.forEach((array)=>{
    console.log(array)
    console.log(invCount(array))
  })
  
export default invCount