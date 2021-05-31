import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FrontalReducer from '../reducers/frontal.reducer';

export const selectFrontalState = createFeatureSelector<FrontalReducer.State>(
  'frontal'
);
