import "./Config/env.js";
import connectDB from './Config/connectDB.js';
import app from './app.js';

connectDB().then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on PORT:", process.env.PORT || 8000);
    });

    process.on("SIGINT", async () => {
        console.log("Shutting down");
        
        await mongoose.connection.close();
        
        server.close(() => {
            process.exit(0);
        });
    });
});