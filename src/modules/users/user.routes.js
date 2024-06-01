import { Router } from "express";
const router = Router();
import * as userController from './user.controller.js';

router.post('/registration', userController.registration);
router.patch('/login', userController.login);
router.patch('/logout', userController.logout);


export default router;
