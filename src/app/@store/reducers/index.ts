import { ActionReducerMap } from '@ngrx/store';

import * as formAccountReducer from './account.reducer';
import * as frontalReducer from './frontal.reducer';
import * as balStateReducer from './bal-state.reducer';

export interface AppState {
  account: formAccountReducer.State;
  frontal: frontalReducer.State;
  balState: balStateReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  account: formAccountReducer.reducer,
  frontal: frontalReducer.reducer,
  balState: balStateReducer.reducer,
};
