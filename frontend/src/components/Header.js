import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getIsMaintainer, removeCookie, removeSessionStorage } from '../utils/helpers';

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
    removeSessionStorage();
    navigate('/');
  };

  return (
    <Navbar expand='lg' className='navbar navbar-dark bg-dark'>
      <Container>
        <Navbar.Brand href='/dashboard'>PeerPrep</Navbar.Brand>
        <div className='Navbar'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/dashboard'>Home</Nav.Link>
              <Nav.Link href='/questions'>Questions</Nav.Link>
              <Nav.Link href='/submission-history'>Submissions</Nav.Link>
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
