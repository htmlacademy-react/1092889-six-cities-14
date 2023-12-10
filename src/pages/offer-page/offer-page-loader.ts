import {Params} from 'react-router-dom';
import {store} from '../../store/store.ts';
import {fetchNearOffers, fetchOffer} from '../../store/slices/offers.ts';
import {fetchComments} from '../../store/slices/comments.ts';

const offerPageLoader = ({id}: Params) => {
  const {selectedOffer} = store.getState().offers;
  if (!selectedOffer) {
    store.dispatch(fetchOffer(id!));
  } else if(selectedOffer.id !== id!) {
    store.dispatch(fetchOffer(id!));
  }
  store.dispatch(fetchComments(id!));
  store.dispatch(fetchNearOffers(id!));
  return null;
};

export {offerPageLoader};
