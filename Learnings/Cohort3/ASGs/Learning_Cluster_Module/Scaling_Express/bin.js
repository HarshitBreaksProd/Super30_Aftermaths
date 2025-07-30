import cluster from "cluster";
import os from "os";
import { app } from "./index";

const totalCPUs = os.cpus().length;

const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
