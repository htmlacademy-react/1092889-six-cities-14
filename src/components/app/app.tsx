import {MainPage} from '../../pages/main-page/main-page.tsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {OfferPage} from '../../pages/offer-page/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthRoute} from '../auth-route/auth-route.tsx';
import {AppRoute, cities} from '../../constants/constants.ts';
import {Layout} from '../layout/layout.tsx';
import {ErrorPage} from '../../pages/error-page/error-page.tsx';
import {store} from '../../store/store.ts';
import {checkAuth} from '../../store/slices/authentication.ts';
import {mainPageLoader} from '../../pages/main-page/main-page-loader.ts';
import {layoutLoader} from '../layout/layout-loader.ts';
import {offerPageLoader} from '../../pages/offer-page/offer-page-loader.ts';


export const App = () => {
  store.dispatch(checkAuth());

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement:<ErrorPage />,
    loader: layoutLoader,
    children: [{
      element: <Navigate to={`/${cities[0].name}`}/>,
      index: true,
    },
    ...cities.map((city) => ({
      element: <MainPage city={city}/>,
      path: `/${city.name}`,
      loader: mainPageLoader,
    })),
    {
      path: AppRoute.Offers,
      element: <OfferPage/>,
      loader: ({params}) => offerPageLoader(params),
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
