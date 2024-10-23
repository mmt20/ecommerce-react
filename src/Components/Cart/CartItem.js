import React from 'react';
import { Button, Col, Modal, Row, Image } from 'react-bootstrap';
import mobile from '../../images/mobile.png';
import deleteIcon from '../../images/delete.png';
import DeleteCartHook from '../../hook/cart/delete-cart-hook';

const CartItem = ({ item }) => {
  const {
    show,
    handleClose,
    handleShow,
    handelDeleteItem,
    itemCount,
    onChangeCount,
    handeleUpdateCart,
  } = DeleteCartHook(item);
  console.log(item);

  return (
    <Col xs={12} className="my-2">
      <Row className="align-items-center">
        <Col xs={12} md={3}>
          <Image
            src={item.product.image || mobile}
            alt={item.product.title}
            fluid
          />
        </Col>
        <Col xs={12} md={9}>
          <Row className="mb-2">
            <Col xs={8}>
              <small className="text-muted">
                Category: {item.product.category.name || 'N/A'}
              </small>
            </Col>
            <Col xs={4} className="text-end">
              <Button variant="link" className="p-0" onClick={handleShow}>
                <Image src={deleteIcon} width={20} height={24} alt="Delete" />
              </Button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h5>{item.product.name || 'Untitled Product'}</h5>
              <small className="text-muted">
                Rating: {item.product.ratingsAverage || 'N/A'}
              </small>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center">
                <span className="me-2">Quantity:</span>
                <input
                  value={itemCount}
                  onChange={onChangeCount}
                  className="form-control form-control-sm me-2"
                  type="number"
                  style={{ width: '60px' }}
                />
                <Button onClick={handeleUpdateCart} size="sm" variant="dark">
                  Update
                </Button>
              </div>
            </Col>
            <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
              <strong>Price: ${(item.price * item.quantity).toFixed(2)}</strong>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handelDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default CartItem;
