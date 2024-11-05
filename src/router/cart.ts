import { Router } from "express";
import * as cartController from "../controllers/cartController";
import { authentication } from "../middlewares/authentication";

const cartRouter = Router();

cartRouter.get('/get-all', authentication, cartController.getAllCarts);
cartRouter.post('/create', authentication, cartController.createCart);
cartRouter.get('/get/:id', authentication, cartController.getCartById);
cartRouter.put('/update/:id', authentication, cartController.updateCartItemQty);
cartRouter.post('/add-product', authentication, cartController.addProductToCart); 
cartRouter.delete('/delete/:id', authentication, cartController.deleteCart);
cartRouter.get('/items/:id', authentication, cartController.getCartItems);

export default cartRouter;