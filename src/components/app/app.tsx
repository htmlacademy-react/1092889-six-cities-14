import {loader as MainPageLoader, MainPage} from '../../pages/main-page/main-page.tsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {OfferPage, loader as OfferPageLoader} from '../../pages/offer-page/offer-Page.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthRoute} from '../auth-route/auth-route.tsx';
import {AppRoute, CITIES} from '../../constants/constants.ts';
import {Layout, loader as LayoutLoader} from '../layout/layout.tsx';
import {ErrorPage} from '../../pages/error-page/error-page.tsx';
import {store} from '../../store/store.ts';
import {checkAuth} from '../../store/slices/authentication.ts';

export const App = () => {
  store.dispatch(checkAuth());

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement:<ErrorPage />,
    loader: () => LayoutLoader(),
    children: [{
      element: <Navigate to={`/${CITIES[0].name}`}/>,
      index: true,
    },
    ...CITIES.map((city) => ({
      element: <MainPage city={city}/>,
      path: `/${city.name}`,
      loader: MainPageLoader,
    })),
    {
      path: AppRoute.Offers,
      element: <OfferPage/>,
      loader: ({params}) => OfferPageLoader(params),
    },
    {
      element: <AuthRoute/>,
      children: [{
        path: AppRoute.Favorites,
        element: <FavoritesPage/>,
      }]
    },
    {
      element: <LoginPage/>,
      path: AppRoute.Login,
    }]
  }, {
    path: '*',
    element: <ErrorPage/>,
  }]);

  return (
    <RouterProvider router={router}/>
  );
};
