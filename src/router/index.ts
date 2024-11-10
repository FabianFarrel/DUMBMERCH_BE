import { Router } from "express";
import authRouter from "./auth";
import categoryRouter from "./category";
import productRouter from "./product";
import profileRouter from "./profile";
import cartRouter from "./cart";
import transactionRouter from "./transaction";
import listRouter from "./listTrans";
import chatRouter from "./chat";
import userRouter from "./user";

const router = Router();

router.get("/", (req, res) => {
  res.send("ROOT ROUTER Express APP");
});

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/profile", profileRouter);
router.use("/cart", cartRouter);
router.use("/transaction", transactionRouter);
router.use("/list", listRouter);
router.use("/chat", chatRouter);
router.use("/user", userRouter);

export default router;
