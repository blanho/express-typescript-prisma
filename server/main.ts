import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';

import authRoute from './routes/auth.route';
import productRoute from './routes/product.route';
import validatEnv from './utils/validateEnv';
import { errorHandling, notFound } from './middleware/error.middleware';
import spec from './utils/swaggerConfig';
require('dotenv').config();

validatEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap () {
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(spec, { explorer: true })
  );

  // Routes
  app.use('/api/auth', authRoute);
  app.use('/api/products', productRoute);

  // Error
  app.use(notFound);
  app.use(errorHandling);

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
