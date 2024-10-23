import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserAllOrderCard from './UserAllOrderCard';

const UserAllOrderItem = ({ orderItem }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log('orderItem', orderItem);

  return (
    <div className="user-order px-4 w-100 ">
      <Row className="d-flex justify-content-between align-items-center py-2">
        <Col xs="6">
          <div className="order-title mx-2">
            Order Number #{orderItem._id || 0}
          </div>
        </Col>
        <Col xs="6" className="text-end">
          <div className="order-date">
            Ordered on {formatDate(orderItem.createdAt)}
          </div>
        </Col>
      </Row>
      {orderItem.products
        ? orderItem.products.map((item, index) => {
            return <UserAllOrderCard key={index} item={item} />;
          })
        : null}

      <Row className="d-flex flex-row justify-content-between align-items-center mt-4">
        <Col xs="3" className="mb-2 text-end">
          <strong>Delivery: </strong>
          <span
            className={orderItem.isDelivered ? 'text-success' : 'text-danger'}
          >
            {orderItem.isDelivered ? 'Delivered' : 'Not Delivered'}
          </span>
        </Col>

        <Col xs="3" className="mb-2 text-end">
          <strong>Payment: </strong>
          <span className={orderItem.isPaid ? 'text-success' : 'text-danger'}>
            {orderItem.isPaid ? 'Paid' : 'Not Paid'}
          </span>
        </Col>

        <Col xs="3" className="mb-2 text-end">
          <strong>Payment Method: </strong>
          <span>
            {orderItem.paymentMethodType === 'cash' ? 'Cash' : 'Credit Card'}
          </span>
        </Col>

        <Col xs="3" className="text-end">
          <div className="fs-4 text-success">
            <strong>{orderItem.totalOrderPrice || 0} EGP</strong>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderItem;
