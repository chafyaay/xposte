import { Action } from '@ngrx/store';
import { BALState } from 'src/app/@shared/models/State';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum BALStateActionTypes {
  SET_BALState = '[BALState] Set BALState',
}

export class SetBALState implements Action {
  readonly type = BALStateActionTypes.SET_BALState;
  constructor(public payload: BALState[]) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FrontalActions = SetBALState;
