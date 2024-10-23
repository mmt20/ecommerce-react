import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import EditCouponHook from '../../hook/coupon/edit-coupon-hook';
import { useParams } from 'react-router-dom';

const AdminEditCoupon = () => {
  const { id } = useParams();
  const {
    coupnName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
  } = EditCouponHook(id);

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">Edit coupon</div>
        <Col sm="8">
          <input
            value={coupnName}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="coupon name"
          />
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="expiry date"
            onChange={onChangeDate}
            value={couponDate}
          />
          <input
            value={couponValue}
            onChange={onChangeValue}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="coupon discount percentage"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={onSubmit} className="btn-save d-inline mt-2 ">
            Save Edit
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminEditCoupon;
