import connectDB from "./Config/connectDB.js";
import productModel from "./models/product.model.js";
import { products } from "../Client/src/Utils/jsonData.js";


const seedData = async () => {
    try {
        await connectDB();

        // await productModel.deleteMany(); // optional for cleanup 
        
        await productModel.insertMany(products);

        console.log("Data inserted successfully...");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedData();