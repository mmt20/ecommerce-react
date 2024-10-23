import React, { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Pagination from '../Utility/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';
import CardProductsContainer from '../Products/CardProductsContainer';

const UserFavoriteProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      setLoading(false);
    };
    get();
  }, [dispatch]);

  const res = useSelector((state) => state.wishListReducer.allWishList);

  useEffect(() => {
    if (!loading) {
      if (res) setItems(res.data);
    }
  }, [loading, res]);

  return (
    <Row className="justify-content-between">
      <div className="admin-content-text">Favorite Products</div>
      <Row className="justify-content-between">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : items.length <= 0 ? (
          <h6>No favorite products at the moment</h6>
        ) : (
          <CardProductsContainer products={items} title="" btntitle="" />
        )}
        <Pagination />
      </Row>
    </Row>
  );
};

export default UserFavoriteProduct;
