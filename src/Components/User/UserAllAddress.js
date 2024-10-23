import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ViewAddressesHook from '../../hook/user/view-addresses-hook';
import UserAddressCard from './UserAddressCard';

const UserAllAddress = () => {
  const { res } = ViewAddressesHook();

  return (
    <div>
      <div className="admin-content-text pb-4">Address Book</div>
      {res.data ? (
        res.data.map((item, index) => {
          return <UserAddressCard key={index} item={item} />;
        })
      ) : (
        <h6>No addresses available at the moment</h6>
      )}

      <Row className="justify-content-center">
        <Col sm="5" className="d-flex justify-content-center">
          <Link to="/user/add-address" style={{ textDecoration: 'none' }}>
            <button className="btn-add-address">Add a New Address</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllAddress;
