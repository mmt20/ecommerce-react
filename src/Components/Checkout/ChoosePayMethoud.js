import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import ViewAddressesHook from '../../hook/user/view-addresses-hook';
import OrderPayCashHook from '../../hook/checkout/order-pay-cash-hook';
import { ToastContainer } from 'react-toastify';
import notify from '../../hook/useNotifaction';
import OrderPayCardHook from '../../hook/checkout/order-pay-card-hook';
import useGetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';

const ChoosePayMethod = () => {
  const { res } = ViewAddressesHook();
  const { handelChooseAddress, addressDetalis, handelCreateCashOrder } =
    OrderPayCashHook();
  const { handelCreateOrderCARD } = OrderPayCardHook(addressDetalis);
  const { totalCartPrice, totalCartPriceAfterDiscount } =
    useGetAllUserCartHook();
  const [type, setType] = useState();
  const changePaymentMethod = (e) => {
    setType(e.target.value);
  };

  const handelPay = (e) => {
    if (type === 'CARD') {
      handelCreateOrderCARD();
    } else if (type === 'CASH') {
      handelCreateCashOrder();
    } else {
      notify('Please select a payment method', 'warn');
    }
  };

  const fontStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'normal',
  };

  return (
    <div style={fontStyle}>
      <div className="admin-content-text pt-5">Choose Payment Method</div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between ">
          <Col xs="12" className="my-2">
            <input
              onChange={changePaymentMethod}
              name="group"
              id="group1"
              type="radio"
              value="CARD"
              className="mt-2 cursor-pointer"
            />
            <label className="mx-2 cursor-pointer" htmlFor="group1">
              Pay by Credit Card
            </label>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs="12" className="d-flex">
            <input
              onChange={changePaymentMethod}
              name="group"
              id="group2"
              type="radio"
              value="CASH"
              className="mt-2 cursor-pointer"
            />
            <label className="mx-2 cursor-pointer" htmlFor="group2">
              Cash on Delivery
            </label>
          </Col>
        </Row>

        <Row className="mt-1">
          <Col xs="4" className="d-flex  my-3 px-3">
            <select
              name="address"
              id="address"
              className="select mt-1 px-2 "
              onChange={handelChooseAddress}
            >
              <option value="0">Choose shipping address</option>
              {res.data ? (
                res.data.map((item, index) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.alias}
                    </option>
                  );
                })
              ) : (
                <option key={0} value={0}>
                  No addresses registered
                </option>
              )}
            </select>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex gap-4 justify-content-end ">
          <div className="product-price d-inline    border ">
            {totalCartPriceAfterDiscount >= 1
              ? `${totalCartPrice} EGP ... after discount ${totalCartPriceAfterDiscount} `
              : `${totalCartPrice} EGP`}
          </div>
          <div
            onClick={handelPay}
            className="product-cart-add px-2 pt-2 d-inline me-2"
          >
            Complete Purchase
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default ChoosePayMethod;