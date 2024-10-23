import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AdminEditProductHook from '../../hook/products/edit-products-hook';
import AdminAddProductHook from '../../hook/products/add-products-hook';

const AdminProductForm = ({ id }) => {
  const isEditMode = !!id;
  const { formik, handleImageChange, category, loading, product } = isEditMode
    ? AdminEditProductHook(id)
    : AdminAddProductHook();

  if (isEditMode && loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </div>
        <Col sm="8">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="input-form d-block mt-3 px-3"
              placeholder="Product Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <textarea
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="input-form-area p-2 mt-3"
              rows="4"
              placeholder="Product Description"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}

            <input
              type="number"
              name="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              className="input-form d-block mt-3 px-3"
              placeholder="Quantity"
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="error">{formik.errors.quantity}</div>
            ) : null}

            <input
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="input-form d-block mt-3 px-3"
              placeholder="Price"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}

            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="input-form d-block mt-3 px-3"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="error">{formik.errors.image}</div>
            ) : null}

            {isEditMode && product.image && (
              <img
                src={product.image}
                alt="Product Preview"
                style={{ width: '200px', height: 'auto', marginTop: '10px' }}
              />
            )}

            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="select input-form-area mt-3 px-2"
            >
              <option value="">Select Category</option>
              {category.data
                ? category.data.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="error">{formik.errors.category}</div>
            ) : null}

            <button type="submit" className="btn-save d-inline mt-3 ">
              {isEditMode ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminProductForm;
