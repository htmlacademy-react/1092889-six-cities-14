import {Navigate, Outlet} from 'react-router-dom';
import {APP_ROUTES, AUTHORIZATION_STATUS, REQUEST_STATUS} from '../../constants/constants.ts';
import {useAppSelector} from '../../hooks/store.ts';
import {Spinner} from '../spinner/spinner.tsx';


export const AuthorizedRoute = () => {
  const auth = useAppSelector((state) => state.authentication);
  const isAuthorized = (auth.status === AUTHORIZATION_STATUS.AUTHORIZED);

  if (auth.requestStatus === REQUEST_STATUS.PENDING) {
    return <Spinner />;
  } else {
    return isAuthorized ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN} />;
  }
};


