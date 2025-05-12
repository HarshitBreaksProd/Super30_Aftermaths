import jwt from "jsonwebtoken";
import User from "../models/userModel";

const authenticate = async (req: any, res: any, next: any) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    res.status(404).json({ message: "Login to access" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "Login to access" });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Jwt Cookie not found" });
  }
};

const authorizeAdmin = async (req: any, res: any, next: any) => {
  const user = req.user;

  if (user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "User is not an admin" });
  }
};

export { authenticate, authorizeAdmin };
