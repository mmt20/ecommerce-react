import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartItem from '../../Components/Cart/CartItem';
import CartCheckout from '../../Components/Cart/CartCheckout';
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';

const CartPage = () => {
  const {
    cartItems,
    totalCartPrice,
    couponNameRes,
    totalCartPriceAfterDiscount,
  } = GetAllUserCartHook();

  return (
    <div style={{ minHeight: '670px' }}>
      <Container>
        <Row>
          <div className="cart-title fw-bold text-dark p-4">Shopping Cart</div>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs="12" md="9">
            {cartItems && cartItems.length >= 1 ? (
              cartItems.map((item, index) => {
                return <CartItem key={index} item={item} />;
              })
            ) : (
              <h6 className="text-center mt-4">No products in the cart</h6>
            )}
          </Col>
          <Col xs="6" md="3">
            <CartCheckout
              cartItems={cartItems}
              couponNameRes={couponNameRes}
              totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
              totalCartPrice={totalCartPrice}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
