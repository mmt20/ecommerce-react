import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getAllCoupon } from '../../redux/actions/couponAction';
import notify from './../useNotifaction';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AddCouponHook = () => {
  const dispatch = useDispatch();

  // Yup schema for form validation
  const validationSchema = Yup.object({
    coupnName: Yup.string().required('Coupon name is required'),
    couponDate: Yup.string().required('Expiration date is required'),
    couponValue: Yup.number()
      .required('Discount percentage is required')
      .min(1, 'Discount percentage must be greater than 0'),
  });

  // Formik for handling form state and submission
  const formik = useFormik({
    initialValues: {
      coupnName: '',
      couponDate: '',
      couponValue: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { coupnName, couponDate, couponValue } = values;

      await dispatch(
        addCoupon({
          name: coupnName,
          expire: couponDate,
          discount: couponValue,
        })
      );
    },
  });

  // Selectors for coupon state
  const res = useSelector((state) => state.couponReducer.addCoupon);
  const allCoupon = useSelector((state) => state.couponReducer.allCoupon);

  // Effect to handle response from adding coupon
  useEffect(() => {
    if (res) {
      if (res.status === 201) {
        notify('Coupon added successfully', 'success');
        window.location.reload(false);
      } else if (res.status === 400) {
        notify('This coupon already exists', 'error');
      } else if (res.status === 403) {
        notify('You are not allowed to add', 'error');
      }
    }
  }, [res]);

  // Effect to fetch all coupons
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCoupon());
    };
    get();
  }, [dispatch]);

  let coupons = [];
  try {
    if (allCoupon && allCoupon.data.length >= 1) coupons = allCoupon.data;
  } catch (e) {
    console.error('Error fetching coupons:', e);
  }

  return {
    formik,
    coupons,
  };
};

export default AddCouponHook;
