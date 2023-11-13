import {Navigate} from 'react-router-dom';

interface AuthorizationRouteProps {
  children: JSX.Element;
}
export const AuthorizedRoute = ({children}: AuthorizationRouteProps) => {
  const isAuthorized = false;

  return (isAuthorized ? children : <Navigate to={'/'} />);

};

