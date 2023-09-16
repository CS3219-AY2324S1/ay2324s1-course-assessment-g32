import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSignOut = () => {
    // TODO: Update state (i.e. isAuthenticated, isAdmin, id) to initial state using a better way
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/landing'>PeerPrep</Navbar.Brand>
        <div className='Navbar'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavDropdown title='User Settings' id='basic-nav-dropdown'>
                {user && user.isAdmin ? <NavDropdown.Item href='/user-management'>All users management</NavDropdown.Item> : <NavDropdown.Item href='/user-profile'>Your profile</NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
