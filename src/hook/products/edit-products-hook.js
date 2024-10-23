import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllCategory } from '../../redux/actions/categoryAction';
import {
  getOneProduct,
  updateProducts,
} from '../../redux/actions/productsAction';
import notify from '../../hook/useNotifaction';

const AdminEditProductHook = (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // Get product and category data from Redux store
  const category = useSelector((state) => state.allCategory.category);
  const product = useSelector((state) => state.allproducts.oneProduct?.data);

  // Fetch product and categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(getOneProduct(id)),
          dispatch(getAllCategory(100)),
        ]);
      } catch (error) {
        notify('Error loading product data', 'error');
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  // Form validation schema
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
  });

  // Initialize formik with product data
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      quantity: '',
      price: '',
      category: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();

      // Append form values to FormData
      Object.keys(values).forEach((key) => {
        if (
          values[key] !== null &&
          values[key] !== undefined &&
          values[key] !== ''
        ) {
          formData.append(key, values[key]);
        }
      });

      // Only append image if a new file was selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      try {
        await dispatch(updateProducts(id, formData));
        notify('Product updated successfully', 'success');
      } catch (error) {
        notify('Error updating product', 'error');
      }
      setLoading(false);
    },
  });

  // Update form values when product data is loaded
  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name || '',
        description: product.description || '',
        quantity: product.quantity || '',
        price: product.price || '',
        category: product.category?._id || '',
      });
    }
  }, [product]);

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Reset file input
  const fileInputRef = React.useRef(null);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFile(null);
  };

  return {
    formik,
    handleImageChange,
    category,
    loading,
    product,
    selectedFile,
    resetFileInput,
    fileInputRef,
  };
};

export default AdminEditProductHook;
