import {FavoriteStatusChangePayload, Offer} from '../../contracts/contaracts.ts';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ThunkApi} from '../store-types.ts';
import {
  RequestStatus,
  ServerRoutes
} from '../../constants/constants.ts';
import {logout} from './authentication.ts';

interface FavoritesState {
  favorites: Offer[];
  requestStatus: RequestStatus;
}

const initialState: FavoritesState = {
  favorites: [],
  requestStatus: RequestStatus.Idle,
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
      state.requestStatus = RequestStatus.Fulfilled;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
    });
    builder.addCase(fetchFavorites.pending, (state) => {
      state.requestStatus = RequestStatus.Pending;
    });
    builder.addCase(changeFavoriteStatus.fulfilled, (state, action) => {
      const replaceIndex = state.favorites.find((el) => el.id === action.payload.id)!;
      if(replaceIndex) {
        state.favorites = state.favorites.filter((el) => el.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
      state.requestStatus = RequestStatus.Fulfilled;
    });
    builder.addCase(changeFavoriteStatus.rejected, (state) => {
      state.requestStatus = RequestStatus.Rejected;
    });
    builder.addCase(changeFavoriteStatus.pending, (state) => {
      state.requestStatus = RequestStatus.Pending;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.favorites = [];
    });
  }
});

export const favoritesReducers = favoritesSlice.reducer;

export {favoritesSlice, fetchFavorites, changeFavoriteStatus};
export type {FavoritesState};

