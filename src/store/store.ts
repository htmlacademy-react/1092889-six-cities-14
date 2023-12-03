import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersReducer, offersSlice, OffersState} from './slices/offers.ts';
import {commentsReducer, commentsSlice, CommentsState} from './slices/comments.ts';
import {cityReducer, citySlice, CityState} from './slices/city.ts';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';

interface Store extends ToolkitStore{
  subscribe: (listener: () => void) => () => void;
  getState: () => {offers: OffersState; city: CityState; comments: CommentsState};
}
const reducer = combineReducers({
  [offersSlice.name]: offersReducer,
  [citySlice.name]: cityReducer,
  [commentsSlice.name]: commentsReducer});

const store: Store = configureStore({reducer});


export {store};

