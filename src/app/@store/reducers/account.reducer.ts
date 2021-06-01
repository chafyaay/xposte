import { UserAccount } from 'src/app/@shared/models/user-account';
import * as fromActions from '../actions/account.action';

export interface State extends UserAccount {}

const initialState: State = {
  createdDate: undefined,
  email: undefined,
  firstName: undefined,
  id: undefined,
  lastName: undefined,
  phone: undefined,
  updatedDate: undefined,
  roles: undefined,
};

export function reducer(
  state = initialState,
  action: fromActions.AccountActions
): State {
  switch (action.type) {
    case fromActions.AccountActionTypes.SET_USER_ACCOUNT_SUCCESS: {
      const account = action.payload;
      return { ...state, ...account };
    }

    default: {
      return state;
    }
  }
}

export const getAccountCreatedDate = (state: State) => state.createdDate;
export const getAccountEmail = (state: State) => state.email;
export const getAccountFirstName = (state: State) => state.firstName;
export const getAccountId = (state: State) => state.id;
export const getAccountLastName = (state: State) => state.lastName;
export const getAccountLastPhone = (state: State) => state.phone;
export const getAccountRoles = (state: State) => state.roles;
export const getAccountUpdatedDate = (state: State) => state.updatedDate;
//
export const getAccountBasicInfo = (state: State) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    updatedDate,
    id,
    createdDate,
  } = state;
  return {
    firstName,
    lastName,
    email,
    phone,
    updatedDate,
    id,
    createdDate,
  };
};
