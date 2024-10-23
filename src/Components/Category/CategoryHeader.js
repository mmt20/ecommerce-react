import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AllCategoryHook from './../../hook/category/all-category-page-hook';

const CategoryHeader = () => {
  const { category } = AllCategoryHook();

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (category) setItems(category.data);
  }, [category]);

  return (
    <div className="cat-header bg-light py-3">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start flex-wrap">
            {items &&
              items.slice(0, 7).map((item, index) => (
                <Link
                  key={index}
                  to={`/products/category/${item._id}`}
                  className="text-decoration-none text-dark me-3 mb-2"
                >
                  <div className="nav-link text-secondary px-3 py-2">
                    {item.name}
                  </div>
                </Link>
              ))}
            <Link
              to="/allcategory"
              className="text-decoration-none text-dark me-3 mb-2"
            >
              <div className="nav-link text-secondary px-3 py-2">More</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryHeader;
