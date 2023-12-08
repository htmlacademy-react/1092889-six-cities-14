import {Icon} from 'leaflet';
import {City, Offer, User} from '../contracts/contaracts.ts';

const PLACEHOLDER_NUMBER = 0;
const enum AuthorizationStatus {
  Authorized = 1,
  Unauthorized = 2,
  Unknown = 0
}

const enum FavoriteStatus {
  Favorite = 1,
  Not_Favorite = 0
}

const EMPTY_USER: User = {
  name: 'user',
  isPro: false,
  avatarUrl: '',
  token: '',
  email: ''
};

const enum RequestStatus {
  Idle = 0,
  Pending = 1,
  Rejected = 2,
  Fulfilled = 3
}

const MAP_LAYER_URL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
const MARKER_URL = './img/pin.svg';
const MARKER_URL_ACTIVE = './img/pin-active.svg';
const OPENSOURCE_ATTRIBUTION = '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const DEFAULT_ICON = new Icon({
  iconUrl: MARKER_URL,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const ACTIVE_ICON = new Icon({
  iconUrl: MARKER_URL_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});


const CITIES: City[] = [{
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  }
}, {
  name: 'Cologne',
  location: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13,
  },
}, {
  name: 'Brussels',
  location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  }
}, {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  }
},
{
  name: 'Hamburg',
  location: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  }
},
{
  name: 'Dusseldorf',
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
},];

const enum MapTypeOffer {
  Cities = 'cities__map',
  Offers = 'offer__map'
}

const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id',
}

const CardTypeValues = new Map([
  ['City', {
    articleClass: 'cities__card',
    imageClass: 'cities__image-wrapper',
    width: 260,
    height: 200,
    cardInfo: ''}],
  ['Near-Places', {
    articleClass: 'near-places__card',
    imageClass: 'near-places__image-wrapper',
    width: 260,
    height: 200,
    cardInfo: ''
  }],
  ['Favorites', {
    articleClass: 'favorites__card',
    imageClass: 'favorites__image-wrapper',
    width: 150,
    height: 110,
    cardInfo: 'favorites__card-info'
  }]
]);

const enum CitySortType {
  Popular = 'popular',
  Top = 'top',
  HighToLow = 'high to low',
  LowToHigh = 'low to high'
}

const CITY_SORTS = new Map([
  [CitySortType.Popular,{
    name: 'Popular',
    sortFn: () => PLACEHOLDER_NUMBER,
  }],
  [CitySortType.LowToHigh, {
    name: 'Price: low to high',
    sortFn: (a: Offer,b: Offer) => a.price - b.price
  }],
  [CitySortType.HighToLow, {
    name: 'Price: high to low',
    sortFn: (a: Offer,b: Offer) => b.price - a.price
  }],
  [CitySortType.Top, {
    name: 'Top rated first',
    sortFn: (a: Offer,b: Offer) => b.rating - a.rating
  }]
]
);

const ServerRoutes = {
  login: '/login',
  logout: '/logout',
  offers: '/offers',
  offer: '/offers/',
  nearByOffers: '/nearby',
  favorite: '/favorite',
  comments: '/comments/',
};

export {
  AuthorizationStatus,
  CITIES,
  AppRoute,
  MAP_LAYER_URL,
  MARKER_URL,
  MARKER_URL_ACTIVE,
  OPENSOURCE_ATTRIBUTION,
  DEFAULT_ICON,
  ACTIVE_ICON,
  MapTypeOffer,
  CardTypeValues,
  CitySortType,
  CITY_SORTS,
  RequestStatus,
  EMPTY_USER,
  ServerRoutes,
  FavoriteStatus};
