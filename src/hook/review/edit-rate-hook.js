import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import notify from '../useNotifaction';
import { updateReviewOnProduct } from './../../redux/actions/reviewAction';
const EditRateHook = (review) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [newRateText, setNewRateText] = useState(review.title);
  const [newRateValue, setNewRateValue] = useState(review.ratings);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const onChangeRateText = (e) => {
    setNewRateText(e.target.value);
  };
  const OnChangeRateValue = (val) => {
    setNewRateValue(val);
  };

  const handelEdit = async () => {
    setLoading(true);
    await dispatch(
      updateReviewOnProduct(review._id, {
        title: newRateText,
        ratings: newRateValue,
      })
    );
    setLoading(false);
    handleCloseEdit();
  };
  const res = useSelector((state) => state.reviewReducer.updateReview);

  useEffect(() => {
    if (loading === false) {
      if (res.status && res.status === 200) {
        notify('The rating was successfully modified', 'success');
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else notify('There was a problem modifying the rating', 'error');
    }
  }, [loading]);

  return {
    showEdit,
    handleCloseEdit,
    handleShowEdit,
    handelEdit,
    onChangeRateText,
    newRateText,
    OnChangeRateValue,
    newRateValue,
  };
};

export default EditRateHook;
