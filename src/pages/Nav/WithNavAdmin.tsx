import { Outlet } from 'react-router';
import { NavbarAdmin } from '../../components/NavbarAdmin';

export default () => {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
    </>
  );
};
