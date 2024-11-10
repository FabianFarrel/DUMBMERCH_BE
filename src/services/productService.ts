import { createProductDto, editProductDto } from "../dtos/product-dto";
import * as productRepo from "../repositories/product";

export async function findProductByUserId(userId: number) {
  const product = await productRepo.findProductById(userId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export async function createProduct(
  data: createProductDto,
  categoryId: number
) {
  const product = await productRepo.createProduct(
    { ...data, price: Number(data.price), Qty: Number(data.Qty) },
    categoryId
  );
  if (!product) {
    throw new Error("Product not created");
  }
  return product;
}

export async function editProduct(data: editProductDto) {
  const product = await productRepo.findProductById(data.id);
  if (!product) {
    throw new Error("Product not found");
  }
  const updatedData = {
    id: data.id,
    productName:
      data.productName == "" ? product.productName : data.productName,
    productDesc:
      data.productDesc == "" ? product.productDesc : data.productDesc,
    price: data.price == undefined ? Number(product.price) : Number(data.price),
    Qty: data.Qty == undefined ? Number(product.Qty) : Number(data.Qty),
  };
  if (data.image) {
    await productRepo.editProductImage(product.images[0].id, data.image.url);
  }
  const updateProduct = await productRepo.editProduct(updatedData);

  if (!updateProduct) {
    throw new Error("Product not updated");
  }
  return updateProduct;
}

export async function deleteProduct(id: number) {
  const product = await productRepo.deleteProduct(id);
  if (!product) {
    throw new Error("Product not deleted");
  }
  return product;
}
