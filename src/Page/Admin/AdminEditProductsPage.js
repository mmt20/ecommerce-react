import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminEditProducts from '../../Components/Admin/AdminEditProducts';
import { useParams } from 'react-router-dom';
const AdminEditProductsPage = () => {
  const { id } = useParams();
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminEditProducts id={id} />
        </Col>
      </Row>
    </Container>
  );
};
export default AdminEditProductsPage;
