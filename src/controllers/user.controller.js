import UserService from '../services/user.service.js';

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
    read
};
