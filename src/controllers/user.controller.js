import UserService from '../services/user.service.js';
import bcrypt from 'bcrypt';
import AuthService from '../services/auth.service.js';
import BankService from '../services/bank.service.js';

const create = async (req, res) => {
    const { email, password, fullname } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await UserService.createUser({ email, password: hashedPassword, fullname });
        const token = AuthService.generateToken(user.id);
        const newAccount = BankService.createService({ userId: user.id, balance: 0 });

        if (!newAccount) {
            return res.status(400).json({ message: 'Algo de errado aconteceu ao criar uma nova conta' });
        }

        res.status(200).json({
            id: user.id,
            email,
            fullname,
            token
        });
    } catch (e) {
        res.status(409).json({ message: 'Usuário já cadastrado!', error: e.message });
    }
};

const read = async (req, res) => {
    try {
        const users = await UserService.readUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: 'Não existem usuários cadastrados!' });
        }

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro ao tentar buscar os dados!', error: error.message });
    }
};

export default {
    create,
    read
};
