import { Router } from "express";
import * as categoryController from "../../src/controllers/categoryController";
import { authentication } from "../../src/middlewares/authentication";

const categoryRouter = Router();

categoryRouter.get('/get-all', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.post('/create', authentication, categoryController.createCategory);
categoryRouter.put('/edit/:id', authentication, categoryController.editCategory);
categoryRouter.delete('/delete/:id', authentication, categoryController.deleteCategory);


export default categoryRouter;