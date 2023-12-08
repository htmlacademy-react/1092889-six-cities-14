import {Header} from '../header/header.tsx';
import {Outlet, useLocation} from 'react-router-dom';
import {Fragment} from 'react';
import {store} from '../../store/store.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchFavorites} from '../../store/slices/favorites.ts';
import {RequestStatus} from '../../constants/constants.ts';

const Layout = () => (
  <Fragment>
    <ToastContainer/>
    {(useLocation().pathname === '/login') ? '' : (<Header/>)}
    <Outlet/>
  </Fragment>
);

const loader = () => {
  if(store.getState().favorites.requestStatus === RequestStatus.Idle){
    store.dispatch(fetchFavorites());
  }
  return null;
};

export {Layout, loader};

