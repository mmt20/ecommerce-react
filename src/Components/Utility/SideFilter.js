import React, { useEffect, useState } from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';

const SideFilter = () => {
  const { category, clickCategory, priceFrom, priceTo } = SidebarSearchHook();
  const [localFrom, setLocalFrom] = useState(
    localStorage.getItem('priceFrom') || ''
  );
  const [localTo, setLocalTo] = useState(localStorage.getItem('priceTo') || '');

  useEffect(() => {
    localStorage.setItem('priceFrom', localFrom);
  }, [localFrom]);

  useEffect(() => {
    localStorage.setItem('priceTo', localTo);
  }, [localTo]);

  const handlePriceFromChange = (e) => {
    setLocalFrom(e.target.value);
    priceFrom(e);
  };

  const handlePriceToChange = (e) => {
    setLocalTo(e.target.value);
    priceTo(e);
  };

  return (
    <div className="mt-3 p-3 ">
      <Row>
        <Col>
          <h5 className="mb-3">Category</h5>
          <Form>
            <Form.Check
              type="checkbox"
              id="category-all"
              label="All"
              value="0"
              className="mb-2"
              onChange={clickCategory}
            />
            {category && category.length > 0 ? (
              category.map((item) => (
                <Form.Check
                  key={item._id}
                  type="checkbox"
                  id={`category-${item._id}`}
                  label={item.name}
                  value={item._id}
                  onChange={clickCategory}
                  className="mb-2"
                />
              ))
            ) : (
              <p>No categories available</p>
            )}
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h5 className="mb-3">Price</h5>
          <Form>
            <Form.Group className="mb-3" controlId="priceFrom">
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="number"
                value={localFrom}
                onChange={handlePriceFromChange}
                className="w-100"
              />
            </Form.Group>
            <Form.Group controlId="priceTo">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="number"
                value={localTo}
                onChange={handlePriceToChange}
                className="w-100"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SideFilter;
