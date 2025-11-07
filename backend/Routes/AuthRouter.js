import express from 'express'
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';
import { login, signup } from '../Controllers/AuthController.js';


const userRouter = express.Router();

userRouter.post('/login',loginValidation,login);

userRouter.post('/signup',signupValidation,signup)

export default userRouter;