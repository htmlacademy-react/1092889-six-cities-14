import {Navigate, Outlet} from 'react-router-dom';
import {AppRoutes} from '../../constants/constants.ts';


export const AuthorizedRoute = () => {
  const isAuthorized = window.localStorage.getItem('authorization') === 'true' ?? false;

  return (isAuthorized ? <Outlet /> : <Navigate to={AppRoutes.LoginPage} />);

};

