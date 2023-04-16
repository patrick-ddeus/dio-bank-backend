import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
const UserRouter = Router();

UserRouter.get('/', UserController.read);
export default UserRouter;
