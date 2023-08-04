import { Button, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

const Layout = () => {
  const { t } = useTranslation();

  const { logOut, username } = useAuth();
  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <div className="container">
          <Navbar.Brand as={Link} to="/">{t('common.hexletChat')}</Navbar.Brand>
          {!!username && <Button onClick={logOut}>{t('common.logout')}</Button>}
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
