import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { useGetProductsQuery } from '../redux/api/productAPI';

const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <>
      <Container>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <Loader />
        ) : products ? (
          <>
            <Row className="main">
              {products.map(product => {
                return (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })}
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default HomePage;
