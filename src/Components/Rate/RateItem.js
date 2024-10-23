import React from 'react';
import { Row, Col, Modal, Button, Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { TrashFill, PencilSquare, StarFill } from 'react-bootstrap-icons';
import DeleteRateHook from '../../hook/review/delete-rate-hook';
import EditRateHook from '../../hook/review/edit-rate-hook';
import ReactStars from 'react-rating-stars-component';

const RateItem = ({ review }) => {
  const { isUser, handelDelete, handleShow, handleClose, showDelete } =
    DeleteRateHook(review);
  const {
    showEdit,
    handleCloseEdit,
    handleShowEdit,
    handelEdit,
    onChangeRateText,
    newRateText,
    OnChangeRateValue,
    newRateValue,
  } = EditRateHook(review);

  const setting = {
    size: 24,
    count: 5,
    color: '#e0e0e0',
    activeColor: '#ffc107',
    value: newRateValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <StarFill />,
    halfIcon: <StarFill />,
    filledIcon: <StarFill />,
    onChange: OnChangeRateValue,
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            {review.user && (
              <div className="d-flex align-items-center mb-2">
                <div className="me-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${review.user.name}&background=random`}
                    alt={review.user.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">{review.user.name}</h5>
                  <div className="text-muted small">
                    <ReactStars
                      {...setting}
                      value={review.ratings}
                      edit={false}
                      size={16}
                    />
                  </div>
                </div>
              </div>
            )}
            <p className="mb-0">{review.title}</p>
          </Col>
          {isUser && (
            <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={handleShow}
              >
                <TrashFill className="me-1" /> Delete
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleShowEdit}
              >
                <PencilSquare className="me-1" /> Edit
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>

      <Modal show={showDelete} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this rating?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars {...setting} className="mb-3" />
          <textarea
            onChange={onChangeRateText}
            value={newRateText}
            className="form-control"
            rows="3"
            placeholder="Update your review..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handelEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Card>
  );
};

export default RateItem;
