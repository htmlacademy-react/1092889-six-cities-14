import {AppRoutes, AuthorizationStatus} from '../../constants/constants.ts';
import {NavLink} from 'react-router-dom';
import {store} from '../../store/store.ts';
import {logout} from '../../store/slices/authentication.ts';
import {dropToken} from '../../api/token.ts';
import {useSyncStore} from '../../hooks/useSyncStore.ts';


const HeaderNavigation = () => {
  const {authentication} = useSyncStore();
  const handleSignOut = () => {
    dropToken();
    store.dispatch(logout());
  };
  return (
    (authentication.status === AuthorizationStatus.Authorized) ? (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink to={AppRoutes.FavoritesPage}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {authentication.user.name}
              </span>
              <span className="header__favorite-count">3</span>
            </NavLink>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" onClick={handleSignOut}>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      </nav>) : (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink to={'/login'} className="header__nav-link header__nav-link--profile" >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
};

export {HeaderNavigation};
