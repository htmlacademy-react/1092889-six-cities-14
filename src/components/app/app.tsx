import {loader as MainPageLoader, MainPage} from '../../pages/main-page/main-page.tsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {loader as OfferPageLoader, OfferPage} from '../../pages/offer-page/offer-Page.tsx';
import {FavoritesPage, loader as FavoritePageLoader} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthorizedRoute} from '../authorization/authorized-route.tsx';
import {AppRoutes, Cities} from '../../constants/constants.ts';
import {Layout} from '../layout/layout.tsx';
import {useSyncExternalStore} from 'react';
import {store} from '../../store/store.ts';
import {Offer} from '../../contracts/contaracts.ts';

export const App = () => {
  const {subscribe, getState} = store;
  const {offers, comments} = useSyncExternalStore(subscribe, getState);
  const router = createBrowserRouter([{
    element: <Layout/>,
    children: [{
      element: <Navigate to={`/${Cities[0].name}`}/>,
      index: true,
    },
    ...Cities.map((city) => ({
      element: <MainPage city={city}/>,
      path: `/${city.name}`,
      loader: () => MainPageLoader([...offers.offers as Offer[]], city.name),
    })),
    {
      path: AppRoutes.OfferPage,
      element: <OfferPage/>,
      loader: ({params}) => OfferPageLoader([...offers.offers as Offer[]], comments.comments, params)
    },
    {
      element: <AuthorizedRoute/>,
      children: [{
        path: AppRoutes.FavoritesPage,
        element: <FavoritesPage/>,
        loader: () => FavoritePageLoader([...offers.offers as Offer[]])
      }]
    },
    {
      element: <LoginScreen/>,
      path: AppRoutes.LoginPage,
    }]
  }, {
    path: '*',
    element: <LoginScreen/>,
  }
  ]);

  return (
    <RouterProvider router={router}/>
  );
};
