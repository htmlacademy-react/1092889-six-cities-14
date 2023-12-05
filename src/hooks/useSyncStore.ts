import {Store, store} from '../store/store.ts';
import {useSyncExternalStore} from 'react';

const useSyncStore = () => {
  const storeForExternal = store as Store;
  return useSyncExternalStore(storeForExternal.subscribe,storeForExternal.getState);
};

export {useSyncStore};
