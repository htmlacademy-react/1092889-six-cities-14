import {FavoriteStatusChangePayload, Offer} from '../../contracts/contaracts.ts';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ThunkApi} from '../store-types.ts';
import {
  ServerRoutes
} from '../../constants/constants.ts';
import {logout} from './authentication.ts';

interface FavoritesState {
  favorites: Offer[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const fetchFavorites = createAsyncThunk<Offer[], undefined, ThunkApi>(
  'fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const response = await api.get<Offer[]>(`${ServerRoutes.favorite}`);
    return response.data;
  }
);
const changeFavoriteStatus = createAsyncThunk<Offer, FavoriteStatusChangePayload, ThunkApi>(
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
    });
    builder.addCase(changeFavoriteStatus.fulfilled, (state, action) => {
      const replaceIndex = state.favorites.find((el) => el.id === action.payload.id)!;
      if(replaceIndex) {
        state.favorites = state.favorites.filter((el) => el.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.favorites = [];
    });
  }
});

export const favoritesReducers = favoritesSlice.reducer;

export {favoritesSlice, fetchFavorites, changeFavoriteStatus};
export type {FavoritesState};

