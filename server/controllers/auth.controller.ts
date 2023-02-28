import crypto from 'crypto';

import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { CreateUserInput, LoginUserInput, VerifyEmailInput } from '../../schemas/user.schema';
import { IResponse } from '../interfaces/Response';
import { createUser, findUniqueUser, updateUser } from '../services/auth.service';
import sendMail from '../config/sendMail';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const CLIENT_URL = process.env.BASE_URL;

const register = async(req: Request<{}, {}, CreateUserInput>, res: Response<IResponse>, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await findUniqueUser({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationCode = crypto.randomBytes(40).toString('hex');

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationCode
    });

    const url = `${CLIENT_URL}`;
    const name = newUser.lastName.concat(' ', newUser.firstName);
    sendMail({
      name,
      email: newUser.email,
      origin: url,
      verificationToken: newUser.verificationCode,
      text: 'Verify email'
    });

    res.status(200).json({
      msg: 'Success! Please check your email',
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async(req: Request<{}, {}, VerifyEmailInput>, res: Response<IResponse>, next: NextFunction) => {
  try {
    const { token, email } = req.body;
    const user = await findUniqueUser({ email: email.toLowerCase() }, { verificationCode: true, email: true });
    if (!user || user.verificationCode !== token) {
      return res.status(401).json({ error: 'Verification failed' });
    }

    const updatedUser = await updateUser({ email: user.email }, { verificationCode: null, verified: true, verificationDate: new Date(Date.now()) });
    if (!updatedUser) {
      return res.status(401).json({ error: 'Could not verify email' });
    }
    res.status(200).json({
      msg: 'Email verified successfully!',
    });
  } catch (error) {
    next(error);
  }
};

const login = async(req: Request<{}, {}, LoginUserInput>, res: Response<IResponse>, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await findUniqueUser({ email: email.toLowerCase() }, { id: true, email: true, verified: true, password: true });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    if (!user.verified) {
      return res.status(401).json({ error: 'You are not verified, please verify your email to login' });
    }
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 30),
      maxAge: 1000 * 60 * 30
    });
    res.cookie('logged_in', true, {
      httpOnly: false
    });

    res.status(200).json({
      msg: 'Login successfully!',
      data: { ...user, password: '' },
      access_token: accessToken
    });
  } catch (error) {
    next(error);
  }
};

const logout = async(req: Request, res: Response<IResponse>, next: NextFunction) => {
  try {
    res.cookie('accessToken', '', { maxAge: 1 });
    res.cookie('refreshToken', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
    return res.status(200).json({ msg: 'Loggout out' });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async(req: Request, res: Response<IResponse>, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ error: 'Please login now' });

    const decoded = <{id: number}>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
    if (!decoded.id) {
      return res.status(403).json({ error: 'Please login now' });
    }

    const user = await findUniqueUser({ id: decoded.id });
    if (!user) {
      return res.status(403).json({ error: 'This account doesnt exist' });
    }

    const accessToken = generateAccessToken({ id: user.id });

    res.status(200).json({ msg: 'Success', access_token: accessToken });
  } catch (error) {
    next(error);
  }
};

export { register, verifyEmail, login, logout, refreshToken };
