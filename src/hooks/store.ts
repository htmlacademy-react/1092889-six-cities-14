import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from '../store/store-types.ts';
import {ActionCreatorsMapObject, AnyAction, bindActionCreators, ThunkDispatch} from '@reduxjs/toolkit';
import {useMemo} from 'react';

export type AppThunkDispatch = ThunkDispatch<State, unknown, AnyAction>;
const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch | AppThunkDispatch>();

const useActionCreators = <Action extends ActionCreatorsMapObject>(actions: Action) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
export {useAppSelector, useAppDispatch, useActionCreators};
