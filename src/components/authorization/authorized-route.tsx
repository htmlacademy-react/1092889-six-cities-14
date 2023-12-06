import {Navigate, Outlet} from 'react-router-dom';
import {APP_ROUTES, AUTHORIZATION_STATUS} from '../../constants/constants.ts';
import {useAppSelector} from '../../hooks/store.ts';


export const AuthorizedRoute = () => {
  const auth = useAppSelector((state) => state.authentication.status);
  const isAuthorized = (auth === AUTHORIZATION_STATUS.AUTHORIZED);

  return (isAuthorized ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN} />);

};

