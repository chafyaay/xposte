import { UserAccount } from '__src/app/@shared/models/user-account';
import * as fromActions from '../actions/frontal.action';
import { Frontal } from '__src/app/@shared/models/Frontal';

export interface State {
  frontal: Frontal[];
}

const initialState: State = {
  frontal: [],
};

export function reducer(
  state = initialState,
  action: fromActions.FrontalActions
): State {
  switch (action.type) {
    case fromActions.FrontalActionTypes.SET_FRONTAL: {
      const frontals = action.payload;
      return {
        ...state,
        frontal: frontals,
      };
    }

    default: {
      return state;
    }
  }
}

//
export const getFrontal = (state: State) => {
  const { frontal } = state;
  return {
    frontal,
  };
};
