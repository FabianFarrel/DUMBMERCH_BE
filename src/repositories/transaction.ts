import { prisma } from "../libs/prisma";
import midtrans from "../libs/midtrans";
import * as cartRepo from "../repositories/cart";

export async function createTransaction(cartId: number) {
    let transactionRecord = null;
    try {
        // Fetch all items in the cart
        const cart = await cartRepo.getCartItems(cartId);
        if (!cart || cart.cartItems.length === 0) {
            throw new Error("Cart is empty or not found.");
        }

        // Calculate the total amount and prepare item details
        const totalAmount = cart.cartItems.reduce((sum, item) => 
            sum + item.product.price * item.qty, 0
        );

        const itemDetails = cart.cartItems.map(item => ({
            id: item.product.id.toString(),
            price: item.product.price,
            quantity: item.qty,
            name: item.product.productName,
        }));

        // Create a new transaction record
        transactionRecord = await prisma.transactions.create({
            data: {
                amount: totalAmount,
                status: "PENDING",
                userId: cart.userId,
                cartId: cartId,
            },
        });

        const orderId = `order-${transactionRecord.id}-${Date.now()}`;

        // Create the transaction in Midtrans
        const midtransTransaction = await midtrans.createTransaction({
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount,
            },
            item_details: itemDetails,
            callbacks: {
                finish: "http://localhost:5000/finish",
            },
        });

        // Update transaction status in database
        await prisma.transactions.update({
            where: { id: transactionRecord.id },
            data: {
                status: midtransTransaction.transaction_status,
            },
        });

        return { orderId, transaction: midtransTransaction, redirectUrl: midtransTransaction.redirect_url };
    } catch (error) {
        console.error("Transaction creation error:", error);

        if (transactionRecord) {
            await prisma.transactions.delete({
                where: {
                    id: transactionRecord.id,
                },
            });
        }
        throw new Error(`Failed to create transaction: ${(error as Error).message}`);
    }
}
