import {Offer} from '../../contracts/contaracts.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface FavoritesState {
  favorites: Offer[];
}

const initialState: FavoritesState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites(state, action:PayloadAction<Offer[] | []>) {
      state.favorites = action.payload;
    }
  }
});

export const favoritesReducers = favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;

export {favoritesSlice};
export type {FavoritesState};

