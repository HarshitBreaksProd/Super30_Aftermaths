const timeStart = new Date();
const N = 100000000000;
let total = 0;
for (let i = 0; i <= N; i++) {
  total += i;
}

console.log("Total is : ", total);
let timeEnd = new Date();
let timeDiff = timeEnd - timeStart;
console.log("Time taken : ", timeDiff);
