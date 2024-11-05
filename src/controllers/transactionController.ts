import { Request, Response } from "express";
import * as paymentService from "../services/transactionService";

export const initiatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartId = parseInt(req.params.cartId);

        // Initiate payment with only cartId
        const transaction = await paymentService.initiatePayment(cartId);

        res.status(200).json({ 
            message: "Transaction created successfully.",
            orderId: transaction.orderId,
            redirectUrl: transaction.redirectUrl
        });
    } catch (error) {
        console.error("Payment initiation error:", error);
        res.status(500).json({ message: `Payment initiation failed: ${(error as Error).message}` });
    }
};
