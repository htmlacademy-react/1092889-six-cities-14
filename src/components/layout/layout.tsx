import {Header} from '../header/header.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import {Fragment} from 'react';

const Layout = () => (
  <Fragment>
    {(useLocation().pathname === '/login') ? '' : (<Header />)}
    <Outlet />
  </Fragment>
);

export {Layout};

