import { Request, Response } from "express";
import { z } from "zod";
import { contentTypes } from "../types";
import { contentModel } from "../models";

export const createContent = async (req: Request, res: Response) => {
  const inputValidator = z.object({
    type: z.enum(contentTypes, { message: "Invalid type" }),
    link: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
  });

  const reqBody = req.body;

  const isInputValid = inputValidator.safeParse(reqBody);

  if (!isInputValid.success) {
    console.log("Invalid Input:", isInputValid.error.errors[0].message);
    res.status(411).json({
      message: `Invalid inputs: ${isInputValid.error.errors[0].message}`,
    });
    return;
  }

  const contentInfo = isInputValid.data;

  if (
    !contentInfo.link.includes("https://") &&
    !contentInfo.link.includes("http://")
  ) {
    contentInfo.link = "http://".concat(contentInfo.link);
  }

  try {
    const content = await contentModel.create({
      ...contentInfo,
      userId: req.user?._id,
    });
    res.json({ message: "New Content Added" });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error creating new content",
    });
    return;
  }
};

export const fetchAllContent = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const userContent = await contentModel.find({ userId }).populate("tags");
    res.json({ userContent });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching content",
    });
    return;
  }
};

export const deleteContentById = async (req: Request, res: Response) => {
  const contentId = req.params.id;
  const userId = req.user?._id;

  try {
    const content = await contentModel.findOne({
      _id: contentId,
    });

    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    if (content.userId?.toString() !== userId?.toString()) {
      res
        .status(403)
        .json({ message: "You are trying to delete a doc you don't own" });
      return;
    }

    await contentModel.deleteOne({ _id: contentId, userId });

    res.json({
      message: `${content?.title} has been deleted`,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error deleting content",
    });
    return;
  }
};
