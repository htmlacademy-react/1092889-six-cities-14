import {store} from '../../store/store.ts';
import {RequestStatus} from '../../constants/constants.ts';
import {fetchFavorites} from '../../store/slices/favorites.ts';

const layoutLoader = () => {
  if(store.getState().favorites.requestStatus === RequestStatus.Idle){
    store.dispatch(fetchFavorites());
  }
  return null;
};

export {layoutLoader};
