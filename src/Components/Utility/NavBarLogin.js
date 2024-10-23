import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
import GetAllUserCartHook from '../../hook/cart/get-all-user-cart-hook';

export const NavBarLogin = () => {
  const { OnChangeSearch, searchWord } = NavbarSearchHook();
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : '';
    } catch (e) {
      console.error('Error accessing user from localStorage:', e);
      return '';
    }
  });

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser('');
  };

  const { itemsNum } = GetAllUserCartHook();

  const getUserInitials = (name) => {
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            className="logo"
            alt="logo-img"
            style={{ height: '30px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex me-auto ">
            <Form.Control
              size="sm"
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
              value={searchWord}
              onChange={OnChangeSearch}
              style={{ width: '400px' }}
            />
          </Form>
          <Nav>
            <div className="d-flex  flex-row  align-items-center justify-content-center ">
              <div className="position-relative  me-4">
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="d-flex align-items-center"
                >
                  <img
                    src={cart}
                    alt="cart-icon"
                    style={{ height: '20px', marginRight: '5px' }}
                  />
                  <span style={{ color: 'white' }}>Cart</span>
                </Nav.Link>
                {itemsNum > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemsNum}
                  </span>
                )}
              </div>
              <div className="">
                {user !== '' ? (
                  <NavDropdown
                    title={
                      <div className="d-inline-flex align-items-center mb-3">
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#555',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                          }}
                        >
                          {getUserInitials(user.name)}
                        </div>
                      </div>
                    }
                    id="basic-nav-dropdown"
                    align="end"
                  >
                    {user.role === 'admin' ? (
                      <NavDropdown.Item as={Link} to="/admin/allproducts">
                        Admin Dashboard
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item as={Link} to="/user/profile">
                        Profile
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut} as={Link} to="/">
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="d-flex align-items-center"
                  >
                    <img
                      src={login}
                      alt="login-icon"
                      style={{ height: '20px', marginRight: '5px' }}
                    />
                    <span style={{ color: 'white' }}>Login</span>
                  </Nav.Link>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
