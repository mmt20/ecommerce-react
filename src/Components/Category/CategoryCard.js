import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ img, title, id }) => {
  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-4 d-flex justify-content-around"
    >
      <div className="text-center">
        <Link
          to={`/products/category/${id}`}
          style={{ textDecoration: 'none' }}
        >
          <img
            alt="category-card-img"
            src={img}
            className="rounded-circle img-fluid"
            style={{ width: '100px', height: '100px' }}
          />
          <p className="mt-2 categoty-card-text">{title}</p>
        </Link>
      </div>
    </Col>
  );
};

export default CategoryCard;
