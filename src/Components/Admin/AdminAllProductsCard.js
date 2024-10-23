import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../redux/actions/productsAction';
import { Trash, Pencil, StarFill } from 'react-bootstrap-icons';

const AdminAllProductsCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteProducts(item._id));
    setShow(false);
    window.location.reload();
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShow(true)}
          >
            <Trash size={16} />
          </Button>
          <Link
            to={`/admin/editproduct/${item._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            <Pencil size={16} />
          </Link>
        </Card.Header>
        <Link to={`/products/${item._id}`} className="text-decoration-none">
          <Card.Img
            variant="top"
            src={item.image}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title className="text-dark f-dark">{item.name}</Card.Title>
            <Card.Text className="d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center justify-content-center text-muted">
                <StarFill className="text-warning mx-1" />
                {item.ratingsQuantity}
              </span>
              <div className="d-flex align-items-center">
                <div className="card-price text-muted">{item.price} EGP</div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="font">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font">
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            className="font"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} className="font">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default AdminAllProductsCard;
