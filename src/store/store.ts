import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersReducer, offersSlice} from './slices/offers.ts';
import {commentsReducer, commentsSlice} from './slices/comments.ts';
import {cityReducer, citySlice} from './slices/city.ts';

const reducer = combineReducers({
  [offersSlice.name]: offersReducer,
  [citySlice.name]: cityReducer,
  [commentsSlice.name]: commentsReducer});

const store = configureStore({reducer});

export {store};
