import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to mongoDB");
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};
