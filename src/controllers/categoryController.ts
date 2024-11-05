import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as categoryService from "../services/categoryService";
import { findAllCategory } from "../repositories/category";

export async function getAllCategories(req: CustomRequest, res: Response) {
    try {
        const categories = await findAllCategory();
        res.json(categories);
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getCategoryById(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const category = await categoryService.findCategoryById(id);
        res.json(category);
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function createCategory(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        await categoryService.createCategory(body);
        res.json({ message: "Category created" });
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function editCategory(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const id = parseInt(req.params.id);
        await categoryService.editCategory({ ...body, id });
        res.json({ message: "Category updated" });
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function deleteCategory(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await categoryService.deleteCategory(id);
        res.json({ message: "Category deleted" });
    } catch (error) {
        console.error(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}
