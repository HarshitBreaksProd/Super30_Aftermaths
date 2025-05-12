import asyncHandler from "../middlewares/asyncHandler";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import createToken from "../utils/createToken";

const createUser = asyncHandler(async (req: any, res: any) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json({ message: "All fields are required" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
    return;
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
    return;
  } catch (err) {
    res.status(400).json({ message: "Could not create the user" });
    return;
  }
});

const getAllUsers = asyncHandler(async (req: any, res: any) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

const loginUser = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isVaildPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isVaildPassword) {
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
    res.status(401).json({ message: "Incorrect Password" });
    return;
  }

  res.status(401).json({ message: "User not found" });
  return;
});

const logoutUser = asyncHandler(async (req: any, res: any) => {
  res.clearCookie("jwt");

  res.json({ message: "Logged out successfully" });
});

const getCurrentUserProfile = asyncHandler(async (req: any, res: any) => {
  const user: any = await User.findOne({ _id: req.user._id });

  if (user) {
    res.json({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

const updateCurrentUserProfile = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.user._id);
  console.log("here");

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    console.log(req.body);

    if (req.body.password) {
      const salt = await bcrypt.genSalt(
        parseInt(process.env.SALT_ROUNDS || "10")
      );
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    return;
  } else {
    res.status(404).json({ message: "User not found" });
    return;
  }
});

const deleteUserById = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Cannot Delete Admin User" });
      return;
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
    return;
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const getUserById = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Cannot View Admin User" });
      return;
    }

    res.json({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return;
  } else {
    res.status(404).json({ message: "User not found" });
    return;
  }
});

const updateUserById = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Cannot Update Admin User" });
      return;
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    return;
  } else {
    res.status(404).json({ message: "User not found" });
    return;
  }
});

export {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
