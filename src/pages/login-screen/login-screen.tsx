import {useDocumentTitle} from '../../hooks/useDocumentTitle.ts';
import {store} from '../../store/store.ts';
import {login} from '../../store/slices/authentication.ts';
import {FormEvent} from 'react';
import {AuthorizationStatus} from '../../constants/constants.ts';
import {Navigate} from 'react-router-dom';
import {LoginCredentials} from '../../contracts/contaracts.ts';
import {useSyncStore} from '../../hooks/useSyncStore.ts';


export const LoginScreen = () => {
  const {authentication} = useSyncStore();
  useDocumentTitle('Login');
  const handleLogin = (evt: FormEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    const data = new FormData(target);
    const credentials = Object.fromEntries(data.entries()) as LoginCredentials;
    store.dispatch(login(credentials));
  };
  return (
    <div className="page page--gray page--login">
      {(authentication.status === AuthorizationStatus.Authorized) ? <Navigate to={'/'} /> : ''}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="login" method="post" onSubmit={handleLogin}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/Amsterdam">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
