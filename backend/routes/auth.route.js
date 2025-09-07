import express from 'express'
const authRouter = express.Router();

import { Login, Profile, SignUp } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

authRouter.post("/signup", SignUp);
authRouter.post("/login", Login);
authRouter.get("/profile", verifyToken, Profile);

export default authRouter;