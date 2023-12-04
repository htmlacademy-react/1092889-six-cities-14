import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from '../store/store-types.ts';
import { ActionCreatorsMapObject, bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

const useActionCreators = <Action extends ActionCreatorsMapObject>(actions: Action) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
export {useAppSelector, useAppDispatch, useActionCreators};
