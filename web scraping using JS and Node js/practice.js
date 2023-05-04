const arr = [5,1,2,3,6]
let ans = arr.reduce((acc, curr) => {
  return Math.max(acc, curr)
}, 100)
console.log(ans);
console.log(arr);
