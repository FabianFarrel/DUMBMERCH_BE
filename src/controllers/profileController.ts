import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as profileService from "../services/profileService";
import uploader from "../libs/cloudinary";

export async function updateProfile(req: CustomRequest, res: Response) {
  try {
    const body = req.body;
    const userId = req.user.id;
    if (req.file) {
      body.image = (await uploader(req.file as Express.Multer.File)).url;
    }
    await profileService.updateProfile(body, userId);
    res.json({ message: "Profile updated" });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getProfile(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user.id;
    const profile = await profileService.getProfile(userId);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.json(profile);
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
}
