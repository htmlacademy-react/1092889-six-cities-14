import {loader as MainPageLoader, MainPage} from '../../pages/main-page/main-page.tsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginPage} from '../../pages/login-page/login-page.tsx';
import {OfferPage, loader as OfferPageLoader} from '../../pages/offer-page/offer-Page.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthorizedRoute} from '../authorization/authorized-route.tsx';
import {APP_ROUTES, CITIES} from '../../constants/constants.ts';
import {Layout, loader as LayoutLoader} from '../layout/layout.tsx';
import {Page404} from '../../error-page/404-page.tsx';

export const App = () => {

  const router = createBrowserRouter([{
    element: <Layout/>,
    errorElement:<Page404 />,
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
      path: APP_ROUTES.OFFER,
      element: <OfferPage/>,
      loader: ({params}) => OfferPageLoader(params),
    },
    {
      element: <AuthorizedRoute/>,
      children: [{
        path: APP_ROUTES.FAVORITES,
        element: <FavoritesPage/>,
      }]
    },
    {
      element: <LoginPage/>,
      path: APP_ROUTES.LOGIN,
    }]
  }, {
    path: '*',
    element: <Page404/>,
  }]);

  return (
    <RouterProvider router={router}/>
  );
};
