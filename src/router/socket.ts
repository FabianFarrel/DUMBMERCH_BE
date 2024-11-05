import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import * as chatController from "../controllers/chatController";
const chatRouter = Router();

chatRouter.get("/rooms/:roomId/message",authentication, chatController.getMessages);

chatRouter.post("/rooms/:roomId/message",authentication, chatController.sendMessage);

export default chatRouter;