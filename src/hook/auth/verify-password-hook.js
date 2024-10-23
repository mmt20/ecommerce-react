import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewUser,
  forgetPassword,
  loginUser,
  verifyPassword,
} from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotifaction';

const VerifyPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  const OnChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = async () => {
    if (code === '') {
      notify('Please enter the code', 'error');
      return;
    }
    setLoading(true);
    await dispatch(
      verifyPassword({
        resetCode: code,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authReducer.verifyPassword);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.data.status === 'Success') {
          notify('Activation code is valid', 'success');
          setTimeout(() => {
            navigate('/user/reset-password');
          }, 1500);
        }
        if (res.data.status === 'fail') {
          notify('The code is invalid or expired', 'error');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return [code, OnChangeCode, onSubmit];
};

export default VerifyPasswordHook;
