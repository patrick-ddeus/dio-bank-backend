import { Router } from 'express';
import BankService from '../services/bank.service';

const BankRouter = Router();

BankRouter.get('/', async (req, res) => {
    try {
        const BankAccounts = await BankService.findAllService();

        if (BankAccounts.length === 0) {
            res.status(404).json({ message: 'Não existem contas registrada!' });
        }

        res.status(201).send(BankAccounts);
    } catch (err) {
        res.sendStatus(400);
    }
});
