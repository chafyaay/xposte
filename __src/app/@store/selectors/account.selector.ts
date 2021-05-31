import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AccountReducer from '../reducers/account.reducer';

export const selectAccountState = createFeatureSelector<AccountReducer.State>(
  'account'
);

export const selectAccountBasicInfo = createSelector(
  selectAccountState,
  AccountReducer.getAccountBasicInfo
);

export const selectAccountRoles = createSelector(
  selectAccountState,
  AccountReducer.getAccountRoles
);
