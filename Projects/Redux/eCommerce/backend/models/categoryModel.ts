import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    maxLength: 32,
  },
});

export default mongoose.model("Category", categorySchema);
