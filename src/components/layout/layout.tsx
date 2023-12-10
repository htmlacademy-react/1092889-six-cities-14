import {Header} from '../header/header.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import {Fragment} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <Fragment>
    <ToastContainer/>
    {(useLocation().pathname === '/login') ? '' : (<Header/>)}
    <Outlet/>
  </Fragment>
);

export {Layout};

