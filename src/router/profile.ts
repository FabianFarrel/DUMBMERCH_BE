import { Router } from "express";
import * as profileController from "../controllers/profileController";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/uploadFile";

const profileRouter = Router();

profileRouter.put(
  "/update",
  authentication,
  upload.single("image"),
  profileController.updateProfile
);
profileRouter.get("/me", authentication, profileController.getProfile);

export default profileRouter;
