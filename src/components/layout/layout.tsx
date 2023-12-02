import {Header} from '../header/header.tsx';
import {Outlet} from 'react-router-dom';
import {Fragment,} from 'react';

const Layout = () => (
  <Fragment>
    <Header />
    <Outlet />
  </Fragment>
);

export {Layout};

