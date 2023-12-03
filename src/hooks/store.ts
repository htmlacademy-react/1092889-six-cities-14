import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from '../store/store-types.ts';
import {ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

const useActionCreators = <Action extends ActionCreatorsMapObject>(actions: Action): BoundActions<Action> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
export {useAppSelector, useAppDispatch, useActionCreators};
