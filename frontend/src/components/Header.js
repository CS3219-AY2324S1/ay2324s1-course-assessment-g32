import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getIsMaintainer, removeCookie } from '../utils/helpers.js';

function Header() {
  const navigate = useNavigate();
  const [isMaintainerHeader, setIsMaintainerHeader] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const isMaintainer = await getIsMaintainer();
      setIsMaintainerHeader(isMaintainer);
    }
    fetchData();
  }, []);

  const handleSignOut = () => {
    removeCookie();
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
              <NavDropdown title='User Setting' id='basic-nav-dropdown'>
                {isMaintainerHeader ? (
                  <NavDropdown.Item href='/users-management'>
                    Manage User Profiles
                  </NavDropdown.Item>
                ) : null}
                <NavDropdown.Item href='/user-profile'>
                  Manage Your Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
