import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO"
    }).then(() => {
        console.log("Connected to database...");
    }).catch((err) => {
        console.log(`Error occured connecting to database: ${err}`);
    });
};

export default dbConnection;