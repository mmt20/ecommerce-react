import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AddCategoryHook from '../../hook/category/add-category-hook';

const AdminAddCategory = () => {
  const { formik, img, loading, isPress, onImageChange } = AddCategoryHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a New Category</div>
        <Col sm="8">
          <div className="text-form pb-2">Category Image</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="Category"
                height="100px"
                width="120px"
                style={{ cursor: 'pointer' }}
              />
              <input
                type="file"
                name="image"
                id="upload-photo"
                hidden
                onChange={onImageChange}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="text-danger">{formik.errors.image}</div>
              )}
            </label>
          </div>
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="Category Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="btn-save d-inline mt-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </Col>
      </Row>
      {isPress && (
        <>
          {loading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            <h4>Completed</h4>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminAddCategory;
