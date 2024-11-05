import e, { Request, Response } from "express";
import * as chatService from "../services/chatService";

export const sendMessage = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const { content } = req.body;
  const { roomId } = req.params;

  if (!userId || !roomId || !content) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }

  try {
    const message = await chatService.sendMessage(+userId, +roomId, content);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId) {
   res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const messages = await chatService.getMessage(+roomId);
    res.status(200).json({ messages }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
