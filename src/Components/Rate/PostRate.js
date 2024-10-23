import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import AddRateHook from '../../hook/review/add-rate-hook';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StarFill } from 'react-bootstrap-icons';

const PostRate = () => {
  const { id } = useParams();
  const {
    OnChangeRateText,
    OnChangeRateValue,
    rateText,
    rateValue,
    user,
    onSubmit,
  } = AddRateHook(id);

  const name = user ? user.name : '';

  const starSettings = {
    size: 30,
    count: 5,
    color: '#e0e0e0',
    activeColor: '#ffc107',
    value: rateValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <StarFill />,
    halfIcon: <StarFill />,
    filledIcon: <StarFill />,
    onChange: OnChangeRateValue,
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-3">Write a Review</h5>
        <Row className="align-items-center mb-3">
          <Col sm={4} md={3}>
            <div className="d-flex align-items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                alt={name}
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span className="fw-bold">{name}</span>
            </div>
          </Col>
          <Col sm={8} md={9}>
            <ReactStars {...starSettings} />
          </Col>
        </Row>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={rateText}
              onChange={OnChangeRateText}
              placeholder="Write your review here..."
              className="border-0 bg-light"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="px-4 py-2">
              Post Review
            </Button>
          </div>
        </Form>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default PostRate;
