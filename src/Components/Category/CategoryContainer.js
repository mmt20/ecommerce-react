import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import Spinner from 'react-bootstrap/Spinner';
const CategoryContainer = ({ data, loading }) => {
  return (
    <Container>
      <div className="admin-content-text mt-2">All Categories </div>

      <Row className="my-2 d-flex justify-content-between ">
        {loading === false ? (
          data ? (
            data.map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  id={item._id}
                  title={item.name}
                  img={item.image}
                />
              );
            })
          ) : (
            <h4>There are no categories. </h4>
          )
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

export default CategoryContainer;
