import { UserAccount } from 'src/app/@shared/models/user-account';
import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AccountActionTypes {
  SET_USER_ACCOUNT = '[Account] Set User Account',
  SET_USER_ACCOUNT_SUCCESS = '[Account] Set User Account Success',
  SET_USER_ACCOUNT_FAILURE = '[Account] Set User Account Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class SetUserAccount implements Action {
  readonly type = AccountActionTypes.SET_USER_ACCOUNT;
}
export class SetUserAccountSuccess implements Action {
  readonly type = AccountActionTypes.SET_USER_ACCOUNT_SUCCESS;

  constructor(public payload: UserAccount) {}
}
export class SetUserAccountFailure implements Action {
  readonly type = AccountActionTypes.SET_USER_ACCOUNT_FAILURE;

  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AccountActions =
  | SetUserAccount
  | SetUserAccountSuccess
  | SetUserAccountFailure;
