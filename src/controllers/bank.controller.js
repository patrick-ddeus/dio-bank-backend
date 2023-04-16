import BankService from '../services/bank.service.js';

const updateBalance = async (req, res) => {
    const { balance } = req.body;
    const id = req.id;

    try {
        const UserAccount = await BankService.findService({ userId: id });
        const newBalance = UserAccount.balance + balance;
        await BankService.updateBalanceService({ userId: id }, { $set: { balance: newBalance } });
        res.status(201).json({ message: 'Usuário atualizado!' });
    } catch (err) {
        res.sendStatus(400);
    }
};

export default {
    updateBalance
};
