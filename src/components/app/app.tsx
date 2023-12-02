import {loader as MainPageLoader, MainPage} from '../../pages/main-page/main-page.tsx';
import {getComments, getOffersMocks} from '../../mocks/offersMocks.ts';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {loader as OfferPageLoader, OfferPage} from '../../pages/offer-page/offer-Page.tsx';
import {FavoritesPage, loader as FavoritePageLoader} from '../../pages/favorites-page/favorites-page.tsx';
import {AuthorizedRoute} from '../authorization/authorized-route.tsx';
import {AppRoutes, Cities} from '../../constants/constants.ts';
import {Layout} from '../layout/layout.tsx';

const offers = getOffersMocks(40);
const comments = getComments();

const router = createBrowserRouter([{
  element: <Layout />,
  children:[{
    element: <Navigate to={`/${Cities[0]}`}/>,
    index: true,
  },
  ...Cities.map((city) => ({
    element: <MainPage city={city}/>,
    path: `/${city}`,
    loader:() => MainPageLoader([...offers], city)
  })),
  {
    path: AppRoutes.OfferPage,
    element: <OfferPage />,
    loader: ({params}) => OfferPageLoader([...offers], comments, params)
  },
  {
    element: <AuthorizedRoute />,
    children: [{
      path: AppRoutes.FavoritesPage,
      element: <FavoritesPage />,
      loader: () => FavoritePageLoader([...offers])
    }]
  },
  {
    element: <LoginScreen />,
    path: AppRoutes.LoginPage,
  }]},{
  path: '*',
  element: <LoginScreen />,
}
]);

export const App = () => (
  <RouterProvider router={router}/>
);
