import React from 'react';
import { Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastify';
import RegisterHook from '../../hook/auth/register-hook';

const RegisterPage = () => {
  const { initialValues, validationSchema, onSubmit } = RegisterHook();

  return (
    <Container style={{ minHeight: '680px' }}>
      <Row className="py-5 d-flex justify-content-center">
        <Col md={6} className="d-flex flex-column">
          <label className="mx-auto title-login">Create New Account</label>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="d-flex flex-column justify-content-center p-2">
                <BootstrapForm.Group controlId="formName">
                  <Field
                    name="name"
                    placeholder="Username..."
                    type="text"
                    className="form-control mt-3 text-center"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formEmail">
                  <Field
                    name="email"
                    placeholder="Email..."
                    type="email"
                    className="form-control my-3 text-center"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPhone">
                  <Field
                    name="phone"
                    placeholder="Phone..."
                    type="text"
                    className="form-control text-center"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPassword">
                  <Field
                    name="password"
                    placeholder="Password..."
                    type="password"
                    className="form-control text-center mt-3"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formConfirmPassword">
                  <Field
                    name="confirmPassword"
                    placeholder="Confirm Password..."
                    type="password"
                    className="form-control text-center mt-3"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-login mx-auto mt-4"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <label className="mx-auto my-4">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: 'pointer' }} className="text-danger">
                Click here
              </span>
            </Link>
          </label>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
