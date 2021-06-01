import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as BALStateReducer from '../reducers/bal-state.reducer';

export const selectBALStateState = createFeatureSelector<BALStateReducer.State>(
  'balState'
);
