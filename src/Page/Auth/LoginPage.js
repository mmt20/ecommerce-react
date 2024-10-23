import React from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginHook from './../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';
import { ErrorMessage, Field, Formik } from 'formik';
import notify from '../../hook/useNotifaction';

const LoginPage = () => {
  const [onSubmit, validationSchema] = LoginHook();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <Row className="w-100">
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className="p-5 bg-light rounded shadow"
        >
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center my-4">
            Don't have an account?
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: 'pointer' }} className="text-danger px-2">
                Sign up here
              </span>
            </Link>
          </p>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email..."
                    className="form-control "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="my-2">Password</Form.Label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password..."
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="btn btn-dark btn-block mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center my-4">
            <Link
              to="/user/forget-password"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              Forgot your password?
            </Link>
          </p>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
