import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../contracts/contaracts.ts';
import {CITIES} from '../../constants/constants.ts';

interface CityState {
  city: City['name'];
  cities: City[];
}

const initialState: CityState = {
  city: CITIES[0].name,
  cities: CITIES
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>){
      state.city = action.payload;
    },
  }

});

export const cityReducer = citySlice.reducer;
export const cityActions = citySlice.actions;
export {citySlice};
export type {CityState};
