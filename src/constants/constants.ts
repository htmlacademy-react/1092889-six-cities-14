const enum AuthorizationStatus {
  Authorized = 1,
  Unauthorized = 2,
  Unknown = 0
}

const DEFAULT_TITLE = '6 cities';

const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'];

const OfferTypes = [
  'apartment',
  'room',
  'house',
  'hotel'
];

const enum AppRoutes {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id',
  ErrorPage = '/error'
}

export {AuthorizationStatus, Cities, OfferTypes, AppRoutes, DEFAULT_TITLE};
