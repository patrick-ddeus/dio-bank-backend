import BankService from '../services/bank.service.js';
import { isUuid } from 'uuidv4';

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

const getBalance = async (req, res) => {
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const balance = UserAccount.balance;
        res.status(201).json({ balance });
    } catch (err) {
        res.sendStatus(500);
    }
};

const getTransactions = async (req, res) => {
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const transactions = UserAccount.transactions;
        res.status(201).json({ transactions });
    } catch (err) {
        res.sendStatus(500);
    }
};

const transfer = async (req, res) => {
    const { balance } = req.body;
    const { hash } = req.headers;
    const id = req.id;
    if (!hash || !isUuid(hash)) {
        return res.status(400).json({ message: 'Invalid Hash' });
    }

    try {
        const UserToGetTransfer = await BankService.findService({ accountNumber: hash });
        const UserToDoTransfer = await BankService.findService({ userId: id });
        const userToGetTransferBalance = UserToGetTransfer.balance + balance;
        const userToDoTransferBalance = UserToDoTransfer.balance - balance;

        if (UserToGetTransfer.accountNumber === UserToDoTransfer.accountNumber) {
            return res.status(400).json({ message: 'Transferências devem ser realizadas entre contas diferentes' });
        }

        const userToDoTransaction = { type: 'transference', amount: Number(balance), date: Date.now() };
        const UserToGetTransaction = { type: 'transference', amount: Number(balance), date: Date.now() };

        // Atualiza usuário que recebeu a transferência
        await BankService.updateBalanceService(
            { accountNumber: hash },
            { $set: { balance: userToGetTransferBalance }, $push: { transactions: UserToGetTransaction } }
        );
        // Atualiza usuário que fez a transferência
        await BankService.updateBalanceService(
            { userId: id },
            { $set: { balance: userToDoTransferBalance }, $push: { transactions: userToDoTransaction } }
        );
        res.status(201).json({ message: 'Transferência realizada com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    deposit,
    withdraw,
    getBalance,
    getTransactions,
    transfer
};
