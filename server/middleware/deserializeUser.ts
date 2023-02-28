import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IResponse } from '../interfaces/Response';
import { findUniqueUser } from '../services/auth.service';

export const deserializeUser = async(req: Request, res: Response<IResponse>, next: NextFunction) => {
  try {
    let accessToken: string = '';

    if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    if (!accessToken) {
      return res.status(401).json({ error: 'You are not logged in' });
    }

    const decoded = <{id: number}>jwt.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`);

    if (!decoded) {
      return res.status(401).json({ error: 'You are not logged in' });
    }

    const user = await findUniqueUser({ id: decoded.id });
    if (!user) {
      return res.status(401).json({ error: 'You are not logged in' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
