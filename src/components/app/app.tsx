import {loader as MainPageLoader, MainPage} from '../../pages/main-page/main-page.tsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {OfferPage} from '../../pages/offer-page/offer-Page.tsx';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthorizedRoute} from '../authorization/authorized-route.tsx';
import {AppRoutes, Cities} from '../../constants/constants.ts';
import {Layout, loader as LayoutLoader} from '../layout/layout.tsx';

export const App = () => {

  const router = createBrowserRouter([{
    element: <Layout/>,
    loader: () => LayoutLoader(),
    children: [{
      element: <Navigate to={`/${Cities[0].name}`}/>,
      index: true,
    },
    ...Cities.map((city) => ({
      element: <MainPage city={city}/>,
      path: `/${city.name}`,
      loader: () => MainPageLoader(),
    })),
    {
      path: AppRoutes.OfferPage,
      element: <OfferPage/>,
    },
    {
      element: <AuthorizedRoute/>,
      children: [{
        path: AppRoutes.FavoritesPage,
        element: <FavoritesPage/>,
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
