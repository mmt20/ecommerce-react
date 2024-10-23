import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AddCouponHook from '../../hook/coupon/add-coupon-hook';
import AdminCoupnCard from './AdminCoupnCard';

const AdminAddCoupon = () => {
  const { formik, coupons } = AddCouponHook();
  const dateRef = useRef();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add New Coupon</div>
        <Col sm="12" md="8">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="Coupon Name"
              name="coupnName"
              value={formik.values.coupnName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.coupnName && formik.errors.coupnName && (
              <div className="text-danger my-2">{formik.errors.coupnName}</div>
            )}

            <input
              ref={dateRef}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="Expiration Date"
              name="couponDate"
              value={formik.values.couponDate}
              onChange={formik.handleChange}
              onFocus={() => (dateRef.current.type = 'date')}
              onBlur={() => (dateRef.current.type = 'text')}
            />
            {formik.touched.couponDate && formik.errors.couponDate && (
              <div className="text-danger my-2">{formik.errors.couponDate}</div>
            )}

            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="Coupon Discount Percentage"
              name="couponValue"
              value={formik.values.couponValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.couponValue && formik.errors.couponValue && (
              <div className="text-danger my-2">
                {formik.errors.couponValue}
              </div>
            )}

            <button type="submit" className="btn-save d-inline mt-2">
              Save Coupon
            </button>
          </form>
        </Col>
      </Row>

      <Row>
        <Col sm="12" md="8">
          {coupons && coupons.length > 0 ? (
            coupons.map((item, index) => (
              <AdminCoupnCard key={index} coupon={item} />
            ))
          ) : (
            <h6>No Coupons Available Yet</h6>
          )}
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCoupon;
