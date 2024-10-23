import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import AddAddressHook from '../../hook/user/add-address-hook';
import { ToastContainer } from 'react-toastify';

const UserAddAddress = () => {
  const [onSubmit] = AddAddressHook();

  const initialValues = {
    alias: '',
    details: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    alias: Yup.string().required('Address label is required'),
    details: Yup.string().required('Address details are required'),
    phone: Yup.string()
      .required('Phone number is required')
      .phone('EG', 'Please enter an Egyptian number'),
  });

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-2">Add a New Address</div>
        <Col sm="8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values.alias, values.details, values.phone);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="alias"
                  type="text"
                  className="input-form d-block mt-3 px-3"
                  placeholder="Address label (e.g., Home - Work)"
                />
                <ErrorMessage
                  name="alias"
                  component="div"
                  className="text-danger"
                />

                <Field
                  as="textarea"
                  name="details"
                  className="input-form-area p-2 mt-3"
                  rows="4"
                  cols="50"
                  placeholder="Address in detail"
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="phone"
                  type="text"
                  className="input-form d-block mt-3 px-3"
                  placeholder="Phone number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />

                <Row>
                  <Col sm="8" className="d-flex justify-content-end ">
                    <button type="submit" className="btn-save d-inline mt-2 ">
                      Add Address
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default UserAddAddress;
