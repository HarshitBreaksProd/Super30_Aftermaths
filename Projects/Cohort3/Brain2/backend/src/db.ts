import mongoose from "mongoose";

export const connectDb = () => {
  const db_url = process.env.DB_URL;
  if (!db_url) {
    console.log("DB_URL not Found");
    process.exit(1);
  }
  try {
    mongoose.connect(db_url);
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error connecting to DB");
    console.error(e);
  }
};
