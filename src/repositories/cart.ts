import { prisma } from "../libs/prisma";
import { Cart } from "../dtos/cart-dto";

export function createCart(data: { userId: number }) {
  return prisma.cart.create({ data });
}

export function findCartByUserId(userId: number) {
  return prisma.cart.findMany({ where: { userId } });
}

export async function deleteCartItem(cartItemId: number) {
  const cartItemExists = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItemExists) {
    console.error(`CartItem with ID ${cartItemId} does not exist.`);
    throw new Error(`CartItem with ID ${cartItemId} does not exist.`);
  }

  return prisma.cartItem.delete({ where: { id: cartItemId } });
}

export function findCartById(id: number) {
  return prisma.cart.findUnique({ where: { id } });
}

export async function updateCartItemQty(cartItemId: number, qty: number) {
  const cartItemExists = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItemExists) {
    throw new Error(`CartItem with ID ${cartItemId} does not exist.`);
  }

  return await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { qty: qty },
  });
}

export function findAllCarts() {
  return prisma.cart.findMany({
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
}

export function addProductToCart(
  cartId: number,
  productId: number,
  qty: number
) {
  return prisma.cartItem
    .create({
      data: {
        cartId: cartId,
        productId: productId,
        qty: qty,
      },
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      throw error;
    });
}

export async function getCartItems(cartId: number) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const totalAmount = cart.cartItems.reduce((total, item) => {
    return total + item.product.price * item.qty;
  }, 0);

  return {
    ...cart,
    totalAmount,
  };
}
