import {Icon} from 'leaflet';
import {City} from '../contracts/contaracts.ts';

const enum AuthorizationStatus {
  Authorized = 1,
  Unauthorized = 2,
  Unknown = 0
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
  name: 'Dusseldorf',
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  },
}, {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
}, {
  name: 'Brussels',
  location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
}, {
  name: 'Hamburg',
  location: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
}];

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
  ACTIVE_ICON};
