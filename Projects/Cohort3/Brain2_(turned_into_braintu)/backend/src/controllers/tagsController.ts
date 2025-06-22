import { Request, Response } from "express";
import z from "zod";
import { tagModel } from "../models";

export const createTag = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    title: z.string(),
  });

  const reqBody = req.body;
  const isInputValid = inputValidator.safeParse(reqBody);

  if (!isInputValid.success) {
    console.log("Invalid Input");
    res.status(411).json({
      message: "Invalid inputs",
    });
    return;
  }

  const tagInfo = isInputValid.data;

  try {
    const tag = await tagModel.create(tagInfo);
    res.json({ message: "New Tag Added" });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error creating new content",
    });
    return;
  }
};

export const fetchAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagModel.find();
    res.json({ tags });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching Tags",
    });
    return;
  }
};

export const fetchTagsByKeyword = async (req: Request, res: Response) => {
  const keyword = req.params.keyword;

  try {
    const tags = await tagModel.find({
      title: { $regex: keyword, $options: "i" },
    });
    res.json({ tags });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching Tags",
    });
    return;
  }
};
