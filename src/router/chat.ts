import { Router } from "express";
import * as chatController from "../controllers/chatController";
import { authentication } from "../middlewares/authentication";

const chatRouter = Router();

chatRouter.get("/rooms/:roomId/message", chatController.getMessages);
chatRouter.get("/rooms", chatController.getOrCreateRoom);

export default chatRouter;
