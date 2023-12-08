import {Navigate, Outlet} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RequestStatus} from '../../constants/constants.ts';
import {useAppSelector} from '../../hooks/store.ts';
import {Spinner} from '../spinner/spinner.tsx';


export const AuthRoute = () => {
  const auth = useAppSelector((state) => state.authentication);
  const isAuthorized = (auth.status === AuthorizationStatus.Authorized);

  if (auth.requestStatus === RequestStatus.Pending) {
    return <Spinner />;
  } else {
    return isAuthorized ? <Outlet /> : <Navigate to={AppRoute.Login} />;
  }
};


