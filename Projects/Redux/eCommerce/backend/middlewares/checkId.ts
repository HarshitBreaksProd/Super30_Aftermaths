import { isValidObjectId } from "mongoose";

const checkId = async (req: any, res: any, next: any) => {
  const id = req.params.id;

  if (!id || !isValidObjectId(id)) {
    res.status(402).json({ message: "Product Id is invalid" });
    return;
  }

  next();
};

export default checkId;
