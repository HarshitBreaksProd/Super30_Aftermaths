import jwt from "jsonwebtoken";

const generateToken = (res: any, userId: any) => {
  const jwtSecret = process.env.JWT_SECRET as string;

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
