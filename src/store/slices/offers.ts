import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../contracts/contaracts.ts';
import {ThunkApi} from '../store-types.ts';
import {REQUEST_STATUS} from '../../constants/constants.ts';

interface OffersState {
  offers: Offer[] ;
  requestStatus: REQUEST_STATUS;

}

const initialState: OffersState = {
  offers: [],
  requestStatus: REQUEST_STATUS.IDLE,
};

const fetchAllOffers = createAsyncThunk<Offer[], undefined, ThunkApi >(
  'fetchAllOffers',
  async (_arg, {extra: api}) => {
    const response = await api.get<Offer[]>('/offers');
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOffers(state, action: PayloadAction<Offer[]>){
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOffers.fulfilled,(state: OffersState, action: PayloadAction<Offer[]>) => {
      state.requestStatus = REQUEST_STATUS.FULFILLED;
      state.offers = action.payload;
    });
    builder.addCase(fetchAllOffers.pending,(state: OffersState) => {
      state.requestStatus = REQUEST_STATUS.PENDING;
    });
    builder.addCase(fetchAllOffers.rejected,(state: OffersState) => {
      state.requestStatus = REQUEST_STATUS.REJECTED;
    });
  }

});

export const offersReducer = offersSlice.reducer;
export const offersActions = offersSlice.actions;
export {offersSlice, fetchAllOffers};
export type {OffersState};
