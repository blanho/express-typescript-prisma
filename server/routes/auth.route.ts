import express from 'express';

import { validate } from '../middleware/validate';
import { createUserSchema, verifyEmailSchema, loginUserSchema } from '../../schemas/user.schema';
import { login, logout, refreshToken, register, verifyEmail } from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';

const router = express.Router();

router.post('/register', validate(createUserSchema), register);

router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);

router.post('/login', validate(loginUserSchema), login);

router.get('/refresh-token', deserializeUser, refreshToken);

router.get('/logout', deserializeUser, logout);

export default router;
