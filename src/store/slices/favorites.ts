import {Offer} from '../../contracts/contaracts.ts';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ThunkApi} from '../store-types.ts';
import {
  FAVORITE_STATUS,
  REQUEST_STATUS,
  ServerRoutes
} from '../../constants/constants.ts';
import {checkAuth, login, logout} from './authentication.ts';

interface FavoritesState {
  favorites: Offer[];
  requestStatus: REQUEST_STATUS;
}

const initialState: FavoritesState = {
  favorites: [],
  requestStatus: REQUEST_STATUS.IDLE,
};

const fetchFavorites = createAsyncThunk<Offer[], undefined, ThunkApi>(
  'fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const response = await api.get<Offer[]>(`${ServerRoutes.favorite}`);
    return response.data;
  }
);
const changeFavoriteStatus = createAsyncThunk<Offer, {offerId: Offer['id']; status: FAVORITE_STATUS }, ThunkApi>(
  'changeFavoriteStatus',
  async ({offerId, status}, {extra: api}) => {
    const response = await api.post<Offer>(`${ServerRoutes.favorite}/${offerId}/${status}`);
    return response.data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.requestStatus = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
    });
    builder.addCase(fetchFavorites.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(changeFavoriteStatus.fulfilled, (state, action) => {
      const replaceIndex = state.favorites.find((el) => el.id === action.payload.id)!;
      if(replaceIndex) {
        state.favorites = state.favorites.filter((el) => el.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
      state.requestStatus = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(changeFavoriteStatus.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
    });
    builder.addCase(changeFavoriteStatus.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(checkAuth.fulfilled, () => {
      fetchFavorites();
    });
    builder.addCase(login.fulfilled, () => {
      fetchFavorites();
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.favorites = [];
    });
  }
});

export const favoritesReducers = favoritesSlice.reducer;

export {favoritesSlice, fetchFavorites, changeFavoriteStatus};
export type {FavoritesState};

