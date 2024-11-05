import { createCategoryDto, editCategoryDto } from "../dtos/category-dto";
import * as categoryRepo from "../repositories/category";

export async function findCategoryById(id: number) {
    const category = await categoryRepo.findCategoryById(id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
}

export async function createCategory(data: createCategoryDto) {
    const category = await categoryRepo.createCategory(data);
    if (!category) {
        throw new Error("Category not created");
    }
    return category;
}

export async function editCategory(data: editCategoryDto) {
    const category = await categoryRepo.editCategory(data);
    if (!category) {
        throw new Error("Category not updated");
    }
    return category;
}

export async function deleteCategory(id: number) {
    const category = await categoryRepo.deleteCategory(id);
    if (!category) {
        throw new Error("Category not deleted");
    }
    return category;
}
