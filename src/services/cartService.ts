import { Cart } from "../dtos/cart-dto";
import * as cartRepo from "../repositories/cart";

export async function createCart(userId: number) {
    return await cartRepo.createCart({ userId });
}

export async function findCartByUserId(userId: number) {
    return await cartRepo.findCartByUserId(userId);
}

export async function findCartById(id: number) {
    return await cartRepo.findCartById(id);
}

export async function deleteCart(id: number) {
    return await cartRepo.deleteCartItem(id);
}

// cartService.ts
export async function updateCartItemQty(cartItemId: number, qty: number) {
    return await cartRepo.updateCartItemQty(cartItemId, qty);
}


export async function findAllCarts() {
    return await cartRepo.findAllCarts();
}

export async function addProductToCart(cartId: number, productId: number, qty: number) {
    return await cartRepo.addProductToCart(cartId, productId, qty);
}

export async function getCartItems(cartId: number) {
    return await cartRepo.getCartItems(cartId);
}
