import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../../redux/actions/authAction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import notify from './../useNotifaction';

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const res = useSelector((state) => state.authReducer.createUser);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your username'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'The number must be an Egyptian 11-digit number')
      .required('Please enter your phone number'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Please confirm your password')
      .required('Please enter your password confirmation'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await dispatch(
      createNewUser({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        phone: values.phone,
      })
    );
    setSubmitting(false);

    if (res && res.data && res.data.token) {
      localStorage.setItem('token', res.data.token);
      notify('Account registered successfully', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else if (res && res.data && res.data.errors) {
      res.data.errors.forEach((error) => {
        if (error.msg === 'E-mail already in use') {
          notify('This email is already registered', 'error');
        } else if (error.msg === 'accept only egypt phone numbers') {
          notify('The number must be an Egyptian 11-digit number', 'error');
        } else if (error.msg === 'must be at least 6 chars') {
          notify(
            'The password must not be less than 6 letters or numbers',
            'error'
          );
        }
      });
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export default RegisterHook;
