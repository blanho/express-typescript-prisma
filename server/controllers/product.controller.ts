import { Request, Response } from 'express';

import { findMany, findOne } from '../services/product.service';

const getProducts = async (req: Request, res: Response) => {
  const products = await findMany();
  res.status(200).json(products);
};

const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await findOne(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
};

export { getProducts, getProductById };
