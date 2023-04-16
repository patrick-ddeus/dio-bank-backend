import { Router } from 'express';
import { validUser } from '../middlewares/user.middlewares.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';
import UserController from '../controllers/user.controller.js';
const UserRouter = Router();

UserRouter.post('/', validUser, UserController.create);
UserRouter.get('/', UserController.read);
export default UserRouter;
