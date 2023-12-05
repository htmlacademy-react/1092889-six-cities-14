/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionCreatorsMapObject, AsyncThunk} from '@reduxjs/toolkit';
import type { TypedUseSelectorHook} from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch,State} from '../store/store-types.ts';


const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};


type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key]
}

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>;

export { useActionCreators, useAppDispatch, useAppSelector };
