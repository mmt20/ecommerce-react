import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/authAction';
import { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import notify from './../useNotifaction';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginHook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    setIsPress(true);
    setLoading(true);
    await dispatch(loginUser(values));
    setLoading(false);
    setIsPress(false);
    setSubmitting(false);
  };

  const res = useSelector((state) => state.authReducer.loginUser);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data));
          notify('Login successful', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }

        if (res.data.message === 'Incorrect email or password') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          notify('Incorrect email or password', 'error');
        }
        setLoading(true);
      }
    }
  }, [loading, res]);

  return [onSubmit, validationSchema];
};

export default LoginHook;
