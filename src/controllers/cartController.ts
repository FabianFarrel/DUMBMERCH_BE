import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as cartService from "../services/cartService";

export async function createCart(req: CustomRequest, res: Response) {
    try {
        const userId = req.user.id;  
        const cart = await cartService.createCart(userId);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function deleteCart(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await cartService.deleteCart(id);
        res.json({ message: "Cart deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getCartById(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const cart = await cartService.findCartById(id);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getAllCarts(req: CustomRequest, res: Response) {
    try {
        const carts = await cartService.findAllCarts();
        res.json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}

// cartController.ts
export async function updateCartItemQty(req: CustomRequest, res: Response) {
    try {
        const { qty } = req.body;  // Get the quantity from the request body
        const cartItemId = parseInt(req.params.id); // Use cart item ID from params

        await cartService.updateCartItemQty(cartItemId, qty);
        res.json({ message: "Cart item quantity updated" });
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}


export async function addProductToCart(req: CustomRequest, res: Response) {
    try {
        const { cartId, productId, qty } = req.body;
        const cartItem = await cartService.addProductToCart(cartId, productId, qty);
        res.json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getCartItems(req: CustomRequest, res: Response) {
    try {
        const cartId = parseInt(req.params.id);
        const cart = await cartService.getCartItems(cartId);

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: (error as Error).message });
    }
}
