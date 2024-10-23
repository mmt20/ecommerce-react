import React from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import editicon from '../../images/edit.png';
import deleteicon from '../../images/delete.png';
import DeleteAddressHook from './../../hook/user/delete-address-hook';

const UserAddressCard = ({ item }) => {
  const [show, handleClose, handleShow, handleDelete] = DeleteAddressHook(
    item._id
  );

  return (
    <div className="user-address-card my-3 px-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this address?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between">
        <Col xs="6" md="6">
          <div className="p-2">{item.alias}</div>
        </Col>
        <Col xs="6" md="6" className="d-flex justify-content-end">
          <div className="d-flex align-items-center p-2">
            <Link
              to={`/user/edit-address/${item._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="d-flex cursor-pointer align-items-center mx-2">
                <img
                  alt="edit"
                  className="me-2"
                  src={editicon}
                  height="17px"
                  width="15px"
                />
                <p className="mb-0 text-muted">Edit</p>
              </div>
            </Link>
            <div
              onClick={handleShow}
              className="d-flex mx-2 cursor-pointer  align-items-center"
            >
              <img
                alt="delete"
                className="me-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="mb-0 text-muted">Delete</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <div className="text-muted" style={{ fontSize: '14px' }}>
            {item.details}
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="12" className="d-flex align-items-center">
          <div className="text-muted" style={{ fontSize: '16px' }}>
            Phone Number:
          </div>
          <div className="ms-2 text-secondary" style={{ fontSize: '16px' }}>
            {item.phone}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddressCard;
