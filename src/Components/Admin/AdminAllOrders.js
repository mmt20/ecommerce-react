import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminAllOrdersItem from './AdminAllOrdersItem';
import UserGetAllOrderHook from '../../hook/user/user-get-all-order-hook';
import Pagination from '../Utility/Pagination';

const AdminAllOrders = () => {
  const { userName, paginate, results, orderData, onPress } =
    UserGetAllOrderHook();

  return (
    <div>
      <Row className="justify-content-between mb-3">
        <Col>
          <h2 className="admin-content-text">Manage All Orders</h2>{' '}
        </Col>
      </Row>
      <Row className="justify-content-center">
        {orderData.length > 0 ? (
          orderData.map((orderItem, index) => (
            <AdminAllOrdersItem key={index} orderItem={orderItem} />
          ))
        ) : (
          <Col>
            <h6>No orders available yet</h6>
          </Col>
        )}

        {paginate.numberOfPages > 1 && (
          <Pagination onPress={onPress} pageCount={paginate.numberOfPages} />
        )}
      </Row>
    </div>
  );
};

export default AdminAllOrders;
