import {Header} from '../header/header.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import React, {Fragment} from 'react';
import {getToken} from '../../api/token.ts';
import {store} from '../../store/store.ts';
import {checkAuth} from '../../store/slices/authentication.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <Fragment>
    <ToastContainer />
    {(useLocation().pathname === '/login') ? '' : (<Header/>)}
    <Outlet/>
  </Fragment>
);

const loader = () => {
  if(getToken() !== ''){
    store.dispatch(checkAuth());
  }
  return null;
};

export {Layout, loader};

