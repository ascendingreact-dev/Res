import mongoose from "mongoose";

//"mongodb://localhost:27017/Elude_Fertile"
// "mongodb+srv://admin:RXy7EM2XEIOkZGHH@cluster0.qfsijke.mongodb.net/"

mongoose
  .connect("mongodb+srv://admin:RXy7EM2XEIOkZGHH@cluster0.qfsijke.mongodb.net/")  
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

export default mongoose;
