export interface createProductDto {
    productName: string;
    productDesc: string;
    price: number;
    Qty: number;
    image: ProductImageDto;
    categoryId: number;
}

export interface editProductDto {
    id: number;
    productName: string;
    productDesc: string;
    price: number;
    Qty: number;
    image?: ProductImageDto;
}

export interface ProductImageDto {
    url: string;
}