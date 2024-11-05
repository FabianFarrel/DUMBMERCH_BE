import { Router } from "express";
import * as productController from "../controllers/productController";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/uploadFile";

const productRouter = Router();

productRouter.get('/get-all', productController.getAllProducts);
productRouter.get('/get/:id', authentication, productController.getProductByUserId);
productRouter.post('/create', authentication, upload.single('image'), productController.createProduct);
productRouter.put('/edit/:id', authentication, upload.single('image'), productController.editProduct)
productRouter.delete('/delete/:id', authentication, productController.deleteProduct);


export default productRouter;