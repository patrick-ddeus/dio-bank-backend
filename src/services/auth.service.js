import User from '../models/user.model.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const loginService = (email) => User.findOne({ email }).select('+password');
const registerService = (objectQuery) => User.create(objectQuery);
const generateToken = (id) => jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 864000 });

export default {
    loginService,
    generateToken,
    registerService
};
