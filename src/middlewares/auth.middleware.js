import UserService from '../services/user.service.js';
import sanitizeObjects from '../helpers/sanitizeObjects.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validLogin = (req, res, next) => {
    const { email, password } = sanitizeObjects(req.body);

    const schema = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().alphanum().trim().required()
    });

    const { error } = schema.validate({ email, password });

    if (error) {
        return res.status(400).json({
            message: 'Campo body inválido',
            error: error.message
        });
    }

    req.body = { email, password };

    return next();
};

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Error, falta o campo authorization nos headers!' });
        }

        const parts = authorization.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Formato inválido de token!' });
        }

        const [schema, token] = parts;

        if (schema !== 'Bearer') {
            return res.status(401).json({ message: 'Formato inválido de token!' });
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
            if (error) {
                res.status(401).json({ message: 'Token inválido!' });
            }

            const user = await UserService.readOneUser(decode.id);

            if (!user || !user.id) {
                res.status(401).json({ message: 'Token inválido!' });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

    return next();
};
