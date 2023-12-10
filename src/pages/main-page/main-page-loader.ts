import {store} from '../../store/store.ts';
import {RequestStatus} from '../../constants/constants.ts';
import {fetchAllOffers} from '../../store/slices/offers.ts';

const mainPageLoader = () => {
  const {offers} = store.getState();
  if(offers.requestStatus === RequestStatus.Idle || (offers.requestStatus === RequestStatus.Fulfilled && offers.offers.length === 0)) {
    store.dispatch(fetchAllOffers());
  }
  return null;

};

export {mainPageLoader};
