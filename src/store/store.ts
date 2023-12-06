import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersReducer, offersSlice} from './slices/offers.ts';
import {commentsReducer, commentsSlice} from './slices/comments.ts';
import {cityReducer, citySlice} from './slices/city.ts';
import {createAPI} from '../api/api.ts';
import {authenticationSlice, authenticationReducer} from './slices/authentication.ts';
import {favoritesReducers, favoritesSlice} from './slices/favorites.ts';

const api = createAPI();

const reducer = combineReducers({
  [offersSlice.name]: offersReducer,
  [citySlice.name]: cityReducer,
  [commentsSlice.name]: commentsReducer,
  [authenticationSlice.name]: authenticationReducer,
  [favoritesSlice.name]: favoritesReducers});

const store = configureStore({reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}})});


export {store, api};
