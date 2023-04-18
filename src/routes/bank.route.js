import { Router } from 'express';
import BankController from '../controllers/bank.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validBalance } from '../middlewares/bank.middleware.js';

const BankRouter = Router();

BankRouter.post('/deposit', validBalance, authMiddleware, BankController.deposit);
BankRouter.post('/withdraw', validBalance, authMiddleware, BankController.withdraw);
BankRouter.get('/balance', authMiddleware, BankController.getBalance);

export default BankRouter;
