import AuthService from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import BankService from '../services/bank.service.js';
import { uuid } from 'uuidv4';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthService.loginService(email);

        if (!user) {
            return res.status(404).json({ message: 'User or password not found' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).json({ message: 'User or password not found' });
        }

        const token = AuthService.generateToken(user.id);
        const bankAccount = await BankService.findService({ userId: user.id });
        res.status(201).json({
            token,
            fullname: user.fullname,
            balance: bankAccount.balance,
            accountNumber: bankAccount.accountNumber
        });
    } catch (error) {
        res.status(400).json({
            message: 'A error ocurred',
            error: error.message
        });
    }
};

const register = async (req, res) => {
    const { email, password, fullname } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await AuthService.registerService({ email, password: hashedPassword, fullname });
        const token = AuthService.generateToken(user.id);
        const newAccount = BankService.createService({ accountNumber: uuid(), userId: user.id, balance: 0 });

        if (!newAccount) {
            return res.status(400).json({ message: 'Algo de errado aconteceu ao criar uma nova conta' });
        }

        res.status(200).json({
            fullname,
            balance: 0,
            token
        });
    } catch (e) {
        res.status(409).json({ message: 'Usuário já cadastrado!', error: e.message });
    }
};

export default {
    login,
    register
};
