// routes/userRouter.ts
import express from "express";
import { prisma } from "../libs/prisma";
import { authentication } from "../middlewares/authentication";

const userRouter = express.Router();

// Route to get all users
userRouter.get("/all", authentication, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        username: true,
        profile: {
          select: {
            fullname: true,
            phone: true,
            gender: true,
            address: true,
            image: true,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default userRouter;
