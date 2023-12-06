import {Icon} from 'leaflet';
import {City, Offer} from '../contracts/contaracts.ts';

const enum AuthorizationStatus {
  Authorized = 1,
  Unauthorized = 2,
  Unknown = 0
}

const enum FAVORITE_STATUS {
  FAVORITE = 1,
  NOT_FAVORITE = 0
}

const EMPTY_USER = {
  name: 'user',
  isPro: false,
  avatarUrl: '',
  token: ''
};

const enum REQUEST_STATUS {
  IDLE = 0,
  PENDING = 1,
  REJECTED = 2,
  FULFILLED = 3
}

const DEFAULT_TITLE = '6 cities';

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


const Cities: City[] = [{
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

const OfferTypes = [
  'apartment',
  'room',
  'house',
  'hotel'
];

const enum MAP_TYPE_CLASS {
  CITY = 'cities__map',
  OFFER = 'offer__map'
}

const enum AppRoutes {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id',
  ErrorPage = '/error'
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

const enum CITY_SORT_TYPE {
  POPULAR = 'popular',
  TOP = 'top',
  HIGH_TO_LOW = 'high to low',
  LOW_TO_HIGH = 'low to high'
}

const CitySorts = new Map([
  [CITY_SORT_TYPE.POPULAR,{
    name: 'Popular',
    sortFn: () => 1,
  }],
  [CITY_SORT_TYPE.TOP, {
    name: 'Top rated first',
    sortFn: (a: Offer,b: Offer) => b.rating - a.rating
  }],
  [CITY_SORT_TYPE.HIGH_TO_LOW, {
    name: 'Price: high to low',
    sortFn: (a: Offer,b: Offer) => b.price - a.price
  }],
  [CITY_SORT_TYPE.LOW_TO_HIGH, {
    name: 'Price: low to high',
    sortFn: (a: Offer,b: Offer) => a.price - b.price
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
  Cities,
  OfferTypes,
  AppRoutes,
  DEFAULT_TITLE,
  MAP_LAYER_URL,
  MARKER_URL,
  MARKER_URL_ACTIVE,
  OPENSOURCE_ATTRIBUTION,
  DEFAULT_ICON,
  ACTIVE_ICON,
  MAP_TYPE_CLASS,
  CardTypeValues,
  CITY_SORT_TYPE,
  CitySorts,
  REQUEST_STATUS,
  EMPTY_USER,
  ServerRoutes,
  FAVORITE_STATUS};
