import {store} from './store.ts';
import {AxiosInstance} from 'axios';

type State = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

type ThunkApi = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export type {
  State,
  AppDispatch,
  ThunkApi
};

