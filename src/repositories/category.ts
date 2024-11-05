import { createCategoryDto, editCategoryDto } from "../dtos/category-dto";
import { prisma } from "../libs/prisma";

export function findAllCategory() {
    return prisma.category.findMany({
        select: {
            id: true,
            categoryName: true,
            _count: true,
            product: {
                select: {
                    id: true,
                    productName: true,
                    productDesc: true,
                    price: true,
                    Qty: true,
                    image: true,
                    _count: true
                }
            }
        }
    });
}

export function findCategoryById(id: number) {
    return prisma.category.findUnique({
        where: { id },
        select: {
            id: true,
            categoryName: true,
            product: {
                select: {
                    id: true,
                    productName: true,
                    productDesc: true,
                    price: true,
                    Qty: true,
                    image: true,
                }
            }
        }
    });
}

export function createCategory(data: createCategoryDto) {
    return prisma.category.create({
        data: {
            categoryName: data.categoryName
        }
    });
}

export function editCategory(data: editCategoryDto) {
    return prisma.category.update({
        where: { id: data.id },
        data: {
            categoryName: data.categoryName
        }
    });
}

export function deleteCategory(id: number) {
    return prisma.category.delete({
        where: { id }
    });
}
