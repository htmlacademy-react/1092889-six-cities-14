import {Fragment} from 'react';
import {Header} from '../header/header.tsx';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {getOffersMocks} from '../../mocks/offersMocks.ts';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {FavoritesScreen} from '../../pages/favorites-screen/favorites-screen.tsx';
import {AuthorizedRoute} from '../authorization/authorized-route.tsx';

export const App = () => (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path={'/login'} element={<LoginScreen/>}/>
      <Route path={'/'} element={
        <MainScreen cards={getOffersMocks(15)}/>
      }
      />
      <Route path={'/offer/:id'} element={<OfferScreen/>}/>
      <Route path={'/favorites'} element={
        <AuthorizedRoute>
          <FavoritesScreen/>
        </AuthorizedRoute>
      }
      />
      <Route path="*" element={
        <Fragment>
          <h1>
            404.
            <br />
            <small>Page not found</small>
          </h1>
          <Link to="/">Go to main page</Link>
        </Fragment>
      }
      />
    </Routes>
  </BrowserRouter>
);
