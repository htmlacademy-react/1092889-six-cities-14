import {store} from '../../store/store.ts';
import {fetchFavorites} from '../../store/slices/favorites.ts';
import {getToken} from '../../api/token.ts';

const layoutLoader = () => {
  if(getToken() !== ''){
    store.dispatch(fetchFavorites());
  }
  return null;
};

export {layoutLoader};
