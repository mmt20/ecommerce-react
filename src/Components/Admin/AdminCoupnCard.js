import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import CouponCardHook from '../../hook/coupon/coupon-card-hook';
import deleteicon from '../../images/delete.png';
import editicon from '../../images/edit.png';
import { Link } from 'react-router-dom';

const AdminCouponCard = ({ coupon }) => {
  const [formatDate, dateString, show, handleClose, handleShow, handleDelete] =
    CouponCardHook(coupon);

  return (
    <div className="user-address-card my-3 px-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">Confirm Deletion</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">
            Are you sure you want to delete this coupon?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="font" variant="dark" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between">
        <Col xs="6">
          <div className="p-2">Coupon Name: {coupon.name}</div>
        </Col>
        <Col xs="6" className="d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link
              to={`/admin/editcoupon/${coupon._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="d-flex mx-2">
                <img
                  alt=""
                  className="ms-1 mt-2"
                  src={editicon}
                  height="17px"
                  width="15px"
                />
                <p className="item-delete-edit">Edit</p>
              </div>
            </Link>
            <div onClick={handleShow} className="d-flex">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit">Delete</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
          >
            Expiry Date: {formatDate(dateString)}
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
          >
            Discount Rate:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Almarai',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            {coupon.discount} %
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCouponCard;
