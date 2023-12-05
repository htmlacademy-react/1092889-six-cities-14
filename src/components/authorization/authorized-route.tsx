import {Navigate, Outlet} from 'react-router-dom';
import {AppRoutes, AuthorizationStatus} from '../../constants/constants.ts';
import {useAppSelector} from '../../hooks/store.ts';


export const AuthorizedRoute = () => {
  const auth = useAppSelector((state) => state.authentication.status);
  const isAuthorized = (auth === AuthorizationStatus.Authorized);

  return (isAuthorized ? <Outlet /> : <Navigate to={AppRoutes.LoginPage} />);

};

