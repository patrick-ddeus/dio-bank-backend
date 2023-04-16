import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validLogin } from '../middlewares/auth.middleware.js';
import { validUser } from '../middlewares/user.middlewares.js';
const AuthRouter = Router();

AuthRouter.post('/login', validLogin, AuthController.login);
AuthRouter.post('/register', validUser, AuthController.register);

export default AuthRouter;
