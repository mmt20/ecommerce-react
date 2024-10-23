import React from 'react';
import ProductGallery from './ProductGallery';
import ProductsText from './ProductsText';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';
import AddToCartHook from '../../hook/cart/add-to-cart-hook';
import { Col, Row, Container, Card } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const { item, image } = ViewProductsDetalisHook(id);
  const { addToCartHandel } = AddToCartHook(id, item);
  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col lg={6}>
              <ProductGallery images={image} />
            </Col>
            <Col lg={6}>
              <ProductsText item={item} addToCartHandel={addToCartHandel} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
