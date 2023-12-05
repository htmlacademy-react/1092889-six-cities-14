import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {offersReducer, offersSlice, OffersState} from './slices/offers.ts';
import {commentsReducer, commentsSlice, CommentsState} from './slices/comments.ts';
import {cityReducer, citySlice, CityState} from './slices/city.ts';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import {createAPI} from '../api/api.ts';
import {authenticationSlice, authenticationReducer, AuthenticationState} from './slices/authentication.ts';

const api = createAPI();
interface Store extends ToolkitStore{
  subscribe: (listener: () => void) => () => void;
  getState: () => {
    offers: OffersState;
    city: CityState;
    comments: CommentsState;
    authentication: AuthenticationState;
  };
}
const reducer = combineReducers({
  [offersSlice.name]: offersReducer,
  [citySlice.name]: cityReducer,
  [commentsSlice.name]: commentsReducer,
  [authenticationSlice.name]: authenticationReducer});

const store: Store = configureStore({reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}})});


export {store, api};

