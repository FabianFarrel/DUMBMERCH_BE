import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import { authentication } from "../middlewares/authentication";

const transactionRouter = Router();

transactionRouter.post('/checkout/:cartId', authentication, transactionController.initiatePayment);

export default transactionRouter;
    