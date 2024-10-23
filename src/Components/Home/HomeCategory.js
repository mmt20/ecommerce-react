import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTitle from '../Utility/SubTitle';
import CategoryCard from '../Category/CategoryCard';
import HomeCategoryHook from '../../hook/category/home-category-hook';

const HomeCategory = () => {
  const [category, loading] = HomeCategoryHook();

  return (
    <Container>
      <SubTitle title="Category" btntitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : category.data && category.data.length > 0 ? (
          category.data
            .slice(0, 6)
            .map((item, index) => (
              <CategoryCard
                key={index}
                title={item.name}
                img={item.image}
                id={item._id}
              />
            ))
        ) : (
          <h4>No Categories</h4>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
