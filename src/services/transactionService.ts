import * as paymentRepository from "../repositories/transaction";
import * as cartRepository from "../repositories/cart";

export async function initiatePayment(cartId: number) {
    try {
        const cart = await cartRepository.getCartItems(cartId);

        if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
            throw new Error("No items in cart or cart not found.");
        }

        // Create a single transaction for the entire cart
        const transaction = await paymentRepository.createTransaction(cartId);

        return transaction;
    } catch (error) {
        console.error("Payment initiation error:", error);
        throw new Error((error as Error).message);
    }
}
