import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validLogin } from '../middlewares/auth.middleware.js';

const AuthRouter = Router();

AuthRouter.post('/', validLogin, AuthController.login);

export default AuthRouter;
