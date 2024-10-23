import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewUser,
  forgetPassword,
  loginUser,
} from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotifaction';

const ForgetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const OnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    if (email === '') {
      notify('Please enter your email', 'error');
      return;
    }
    localStorage.setItem('user-email', email);
    setLoading(true);
    await dispatch(
      forgetPassword({
        email,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authReducer.forgetPassword);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status === 200) {
          notify('The code was sent to the email successfully', 'success');
          setTimeout(() => {
            navigate('/user/verify-code');
          }, 1000);
        }
        if (res.status === 404) {
          notify('This account does not exist with us', 'error');
        }
      }
    }
  }, [loading]);

  return [OnChangeEmail, email, onSubmit];
};

export default ForgetPasswordHook;