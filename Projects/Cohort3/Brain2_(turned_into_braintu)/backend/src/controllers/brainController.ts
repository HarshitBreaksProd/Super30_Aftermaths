import { Request, Response } from "express";
import { contentModel, linkModel, userModel } from "../models";
import { random } from "../utils";

export const enableBrainShareController = async (
  req: Request,
  res: Response
) => {
  try {
    const share = req.body.share;
    if (share) {
      const existingLink = await linkModel.findOne({ userId: req.user?._id });

      if (existingLink) {
        res.json({
          message: "Sharable link already exists",
          hash: `${existingLink?.hash}`,
        });
        return;
      }

      const link = await linkModel.create({
        userId: req.user?._id,
        hash: random(15),
      });
      res.json({
        message: "Enabled Sharable Link",
        hash: `${link?.hash}`,
      });
      return;
    } else {
      await linkModel.deleteOne({ userId: req.user?._id });
      res.json({
        message: "Disabled Sharable Link",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error changing share status",
    });
    return;
  }
};

export const getSharedBrainControler = async (req: Request, res: Response) => {
  try {
    const hash = req.params.shareLink;
    const link = await linkModel.findOne({ hash });
    if (!link) {
      res.status(404).json({
        message: "The Brain you are looking for does not exist",
      });
      return;
    }
    const content = await contentModel
      .find({ userId: link.userId })
      .populate("tags");
    const user = await userModel.findOne({ _id: link.userId });
    res.json({ username: user?.username, content });
    return;
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching brain",
    });
    return;
  }
};

export const getShareLinkStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const link = await linkModel.findOne({ userId });
    if (!link) {
      res.status(200).json({
        status: false,
      });
      return;
    } else {
      res.status(200).json({
        status: true,
        hash: link.hash,
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error fetching share status",
    });
    return;
  }
};
