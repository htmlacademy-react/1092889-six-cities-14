import {Link, NavLink} from 'react-router-dom';

const ErrorPage = () => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={'/Paris'} className="header__logo-link">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="{81}"
                height="{41}"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities">
        <div className="cities__places-container  container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">404</b>
              <p className="cities__status-description">
                We could not find any page at selected address
              </p>
              <NavLink className="login__submit form__submit button" to={'/'}>Return Home</NavLink>
            </div>
          </section>
          <div className="cities__right-section"/>
        </div>
      </div>
    </main>
  </div>
);

export {ErrorPage};
