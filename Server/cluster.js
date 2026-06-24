import cluster, { worker } from 'cluster';
import os from 'os';

const totalCPUs = os.cpus().length;

if(cluster.isPrimary){
    console.log(`Master ${process.pid} running`);
    
    for(let i=0; i<totalCPUs; i++){
        cluster.fork();
    }
    
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        
        cluster.fork();
    })
}else{
    import('./server.js');
}