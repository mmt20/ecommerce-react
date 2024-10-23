import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DeleteCartHook from './../../hook/cart/delete-cart-hook';
import ApplayCouponHook from './../../hook/cart/applay-coupon-hook';
import { ToastContainer } from 'react-toastify';

const CartCheckout = ({
  totalCartPrice,
  totalCartPriceAfterDiscount,
  couponNameRes,
  cartItems,
}) => {
  const { handelDeleteCart } = DeleteCartHook();
  const { couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout } =
    ApplayCouponHook(cartItems);
  useEffect(() => {
    if (couponNameRes) {
      onChangeCoupon(couponNameRes);
    }
  }, [couponNameRes]);

  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="copon-input d-inline text-center "
            placeholder="Discount Code"
          />
          <button onClick={handelSubmitCoupon} className="copon-btn d-inline ">
            Apply
          </button>
        </div>
        <div className="product-price d-inline w-100 my-3  border">
          {totalCartPriceAfterDiscount >= 1
            ? `${totalCartPrice} EGP ... After Discount ${totalCartPriceAfterDiscount} EGP`
            : `${totalCartPrice} EGP`}
        </div>

        <button
          onClick={handelCheckout}
          className="product-cart-add  w-100 px-2  d-inline"
        >
          Complete Purchase
        </button>

        <button
          onClick={handelDeleteCart}
          className="product-cart-add btn  btn-danger w-100 px-2 my-1"
        >
          Clear Cart
        </button>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default CartCheckout;
