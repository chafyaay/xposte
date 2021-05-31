import { UserAccount } from '__src/app/@shared/models/user-account';
import { Action } from '@ngrx/store';
import { Frontal } from '__src/app/@shared/models/Frontal';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FrontalActionTypes {
  SET_FRONTAL = '[Frontal] Set Frontal',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SetFrontal implements Action {
  readonly type = FrontalActionTypes.SET_FRONTAL;
  constructor(public payload: Frontal[]) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FrontalActions = SetFrontal;
