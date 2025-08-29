import mongoose from "mongoose";

// connect to mongodb
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("db connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/chatapp`);
  } catch (error) {
    console.log(error);
  }
};
