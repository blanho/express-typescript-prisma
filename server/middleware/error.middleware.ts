/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { IResponse } from '../interfaces/Response';

const errorHandling = (err: Error, req: Request, res: Response<IResponse>, next: NextFunction) => {
  console.log(err.message);
  res.status(500).json({ error: 'Internal server' });
};

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: 'This Route doesnt exist' });
};

export { errorHandling, notFound };
