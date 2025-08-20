import express from 'express';
import {registerUser, logInUser } from '../controller/userController.js';

const userRoutes = express.Router(;
    userRouter.post('/register', registerUser);
    userRouter.post('/login', logInUser);

    export default userRouter;

    // npm i jsonwebtoken