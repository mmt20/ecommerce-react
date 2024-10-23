import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UserAllOrderItem from '../User/UserAllOrderItem';
import { useParams } from 'react-router-dom';
import GetOrderDetalisHook from '../../hook/admin/get-order-detalis-hook';
import ChangeOrderStatusHook from '../../hook/admin/change-order-status-hook';
import { ToastContainer } from 'react-toastify';

const AdminOrderDetalis = () => {
  const { id } = useParams();
  const { orderData, cartItems } = GetOrderDetalisHook(id);
  const { onChangePaid, changePayOrder, onChangeDeliver, changeDeliverOrder } =
    ChangeOrderStatusHook(id);

  return (
    <div>
      <div className="admin-content-text">Order Details </div>
      <UserAllOrderItem orderItem={orderData} />

      <Row className="justify-content-center mt-4 user-data">
        <Col xs="12" className="d-flex">
          <div className="admin-content-text py-2">Customer Details</div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
          >
            Name:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            {orderData ? (orderData.user ? orderData.user.name : '') : ''}
          </div>
        </Col>

        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
          >
            Phone Number:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            {orderData ? (orderData.user ? orderData.user.phone : '') : ''}
          </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
          >
            Email:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            {orderData ? (orderData.user ? orderData.user.email : '') : ''}
          </div>
        </Col>
        <div className="d-flex mt-3 justify-content-around align-items-center">
          <div className="d-flex align-items-center">
            <select
              onChange={onChangePaid}
              name="pay"
              id="paid"
              className="form-select text-center w-75"
            >
              <option value="0">Payment</option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
            <button onClick={changePayOrder} className="btn btn-dark mx-3">
              Save
            </button>
          </div>

          <div className="d-flex align-items-center">
            <select
              onChange={onChangeDeliver}
              name="deliver"
              id="deliver"
              className="form-select text-center w-75"
            >
              <option value="0">Delivery</option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
            <button onClick={changeDeliverOrder} className="btn btn-dark mx-3">
              Save
            </button>
          </div>
        </div>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminOrderDetalis;
