import {getOffersMocks} from '../../mocks/offersMocks.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DetailedOffer, Offer} from '../../contracts/contaracts.ts';

interface OffersState {
  offers: Offer[] | DetailedOffer[] | DetailedOffer & Pick<Offer,'previewImage'>;
}

const initialState: OffersState = {
  offers: getOffersMocks(30) as Offer[]
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOffers(state, action: PayloadAction<Offer[]>){
      state.offers = action.payload;
    },
  }

});

export const offersReducer = offersSlice.reducer;
export const offersActions = offersSlice.actions;
export {offersSlice};
