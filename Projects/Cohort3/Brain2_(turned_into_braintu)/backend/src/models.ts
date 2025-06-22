import mongoose, { Types } from "mongoose";
import { contentTypes } from "./types";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

const contentSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      validate: async function (value: Types.ObjectId) {
        const user = await userModel.findById(value);
        if (!user) {
          throw new Error("User does not exist");
        }
      },
    },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
});

const userModel = mongoose.model("User", userSchema);
const tagModel = mongoose.model("Tag", tagSchema);
const contentModel = mongoose.model("Content", contentSchema);
const linkModel = mongoose.model("Link", linkSchema);

export { userModel, tagModel, contentModel, linkModel };
