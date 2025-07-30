const cluster = require("cluster");
const os = require("os");

const TOTAL_CPUs = os.cpus().length;
const N = 100000000000;
let workerObj = {};

const timeStart = new Date();

if (cluster.isPrimary) {
  const n = N / TOTAL_CPUs;
  const rem = N % TOTAL_CPUs;
  let TotalSum = 0;

  console.log("Each cpu calcs sum till", n);

  for (let i = 0; i < TOTAL_CPUs; i++) {
    const worker = cluster.fork();
    workerObj[i] = worker;
  }

  for (let key in workerObj) {
    workerObj[key].send({ index: key, n: n });
    console.log("Each worker gets", { index: key, n: n });
    workerObj[key].on("message", (msg) => {
      TotalSum += msg.sum;
      console.log("The total sum is : ", TotalSum + rem);
      let timeEnd = new Date();
      let timeDiff = timeEnd - timeStart;
      console.log("Time taken : ", timeDiff);
    });
  }
} else {
  console.log(`process starts with ${process.pid}`);
  process.on("message", (msg) => {
    console.log(`process gets`, msg);
    const start = msg.index * msg.n;
    console.log(
      `process ${msg.index} start is ${start} end is ${start + msg.n}`
    );
    let processTotal = 0;
    for (let i = start + 1; i <= start + msg.n; i++) {
      processTotal = processTotal + i;
    }
    console.log(`process ${msg.index} total is ${processTotal}`);
    process.send({ sum: processTotal });
  });
}
