import AuthService from '../services/auth.service.js';
import bcrypt from 'bcrypt';

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
        res.status(201).json({ token, fullname: user.fullname });
    } catch (error) {
        res.status(400).json({
            message: 'A error ocurred',
            error: error.message
        });
    }
};

export default {
    login
};
