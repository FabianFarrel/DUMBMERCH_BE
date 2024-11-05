import { Router } from 'express';
import { authentication } from '../middlewares/authentication';
import { TransactionController } from '../controllers/list';

const listRouter = Router();

listRouter.get('/admin/transactions', authentication,TransactionController.getTransactionHistory);

export default listRouter;
