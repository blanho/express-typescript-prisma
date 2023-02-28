import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { IProductResponse } from '../types/Product';
import Rating from './Rating';

interface IProductItemProps {
  product: IProductResponse;
}

const Product: FC<IProductItemProps> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Img src={product.image} variant="top" />
        <a href={`/products/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <Rating stars={product.rating} reviews={product.numReviews} />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
