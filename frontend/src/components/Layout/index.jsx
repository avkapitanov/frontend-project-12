import { useAuth } from '../../hooks/useAuth';
import { Button, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const { logOut, username } = useAuth();
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            {!!username && <Button onClick={logOut}>Logout</Button>}
          </div>
        </Navbar>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;