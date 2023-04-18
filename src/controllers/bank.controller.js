import BankService from '../services/bank.service.js';

const deposit = async (req, res) => {
    const { balance } = req.body;
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const newBalance = UserAccount.balance + Number(balance);
        const transaction = { type: 'deposit', amount: Number(balance), date: Date.now() };

        await BankService.updateBalanceService({ userId: id }, { $set: { balance: newBalance }, $push: { transactions: transaction } });
        res.status(201).json({ message: 'Saldo atualizado!', balance: newBalance });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const withdraw = async (req, res) => {
    const { balance } = req.body;
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const newBalance = UserAccount.balance - Number(balance);

        if (newBalance < 0) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }

        const transaction = { type: 'withdraw', amount: Number(balance), date: Date.now() };

        await BankService.updateBalanceService({ userId: id }, { $set: { balance: newBalance }, $push: { transactions: transaction } });
        res.status(201).json({ message: 'Saldo atualizado!', balance: newBalance });
    } catch (err) {
        res.sendStatus(500);
    }
};

const getBalance = async (req, res, next) => {
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const balance = UserAccount.balance;
        res.status(201).json({ balance });
    } catch (err) {
        res.sendStatus(500);
    }
};

export default {
    deposit,
    withdraw,
    getBalance
};
