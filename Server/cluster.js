import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`
    );

    console.log("Starting a new worker...");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  await import("./server.js");
}