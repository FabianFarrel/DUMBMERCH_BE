import { createProductDto, editProductDto } from "../dtos/product-dto";
import { prisma } from "../libs/prisma";

export function findAllProduct() {
  return prisma.product.findMany({
    select: {
      id: true,
      productName: true,
      productDesc: true,
      price: true,
      Qty: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
    },
  });
}

export function findProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      productName: true,
      productDesc: true,
      price: true,
      Qty: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
    },
  });
}

export function createProduct(data: createProductDto, categoryId: number) {
  if (!data.image || !data.image.url) {
    throw new Error("Image URL is required.");
  }
  return prisma.product.create({
    data: {
      productName: data.productName,
      productDesc: data.productDesc,
      price: data.price,
      Qty: data.Qty,
      category: {
        connect: { id: categoryId },
      },
      images: {
        create: { url: data.image.url },
      },
    },
  });
}

export function editProduct(data: editProductDto) {
  return prisma.product.update({
    where: { id: data.id },
    data: {
      productName: data.productName,
      productDesc: data.productDesc,
      price: data.price,
      Qty: data.Qty,
    },
  });
}

export function editProductImage(id: number, url: string) {
  return prisma.imageProduct.update({
    where: { id },
    data: { url },
  });
}

export function deleteProduct(id: number) {
  return prisma.product.delete({
    where: { id },
  });
}
