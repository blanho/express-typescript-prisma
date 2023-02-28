import React, { useState } from 'react';
import { Button, ListGroup, Col, Row, Image, Card, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductQuery } from '../redux/api/productAPI';
import { InputChange } from '../utils/Event';

const ProductPage = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useGetProductQuery(Number(id));

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <section className="main">
      <Link className="btn btn-light btn-block my-3" to="/">
        Go Back
      </Link>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : product ? (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating stars={product.rating} reviews={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            style={{ appearance: 'auto' }}
                            onChange={(e: InputChange) => setQty(Number(e.target.value))}
                          >
                            {Array.from({ length: product.countInStock }, (value, index) => {
                              return (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1} <i style={{ width: '5rem' }} className="fas fa-shopping-cart"></i>
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCart}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </section>
  );
};

export default ProductPage;
