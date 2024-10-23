import { useState, useEffect } from 'react';
import avatar from '../../images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/actions/categoryAction';
import notify from '../../hook/useNotifaction';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddCategoryHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPress, setPress] = useState(false);

  const res = useSelector((state) => state.allCategory.category);

  // Formik for form management
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
      image: Yup.mixed().required('Category image is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', selectedFile);

      setLoading(true);
      setPress(true);
      await dispatch(createCategory(formData));
      setLoading(false);
    },
  });

  // Handle image selection
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue('image', e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  // Effect for handling category creation response
  useEffect(() => {
    if (!loading && isPress) {
      if (res.status === 201) {
        notify('Category added successfully', 'success');
        formik.resetForm();
        setImg(avatar);
        setSelectedFile(null);
      } else {
        notify('There was a problem adding the category', 'error');
      }
      setPress(false);
    }
  }, [loading, res.status, isPress, formik]);

  return { formik, img, loading, isPress, onImageChange };
};

export default AddCategoryHook;
