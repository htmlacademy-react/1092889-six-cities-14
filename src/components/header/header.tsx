import {HeaderNavigation} from './navigation.tsx';
import {Link} from 'react-router-dom';


export const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={'/Paris'} className="header__logo-link header__logo-link--active">
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={81}
              height={41}
            />
          </Link>
        </div>
        <HeaderNavigation />
      </div>
    </div>
  </header>);
