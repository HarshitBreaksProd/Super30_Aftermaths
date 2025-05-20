import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  participants: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  joinCode: { type: String, required: true, unique: true },
});

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    roomId: { type: Types.ObjectId, ref: "Room", required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
const roomModel = mongoose.model("Room", roomSchema);
const messageModel = mongoose.model("Message", messageSchema);

export { userModel, roomModel, messageModel };
