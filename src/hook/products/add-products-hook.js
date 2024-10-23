import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { createProduct } from '../../redux/actions/productsAction';
import notify from '../../hook/useNotifaction';

const AdminAddProductHook = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.allCategory.category);

  useEffect(() => {
    dispatch(getAllCategory(100));
  }, [dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
      .positive('Quantity must be positive')
      .required('Quantity is required'),
    price: Yup.number()
      .positive('Price must be positive')
      .required('Price is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      quantity: '',
      price: '',
      image: null,
      category: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        await dispatch(createProduct(formData));
        notify('Product added successfully', 'success');
        resetForm();
      } catch (error) {
        notify('Error adding product', 'error');
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
  };

  return {
    formik,
    handleImageChange,
    category,
  };
};

export default AdminAddProductHook;
