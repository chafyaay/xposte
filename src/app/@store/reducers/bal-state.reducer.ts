import * as fromActions from '../actions/bal-state.action';
import { BALState } from 'src/app/@shared/models/State';

export interface State {
  balState: BALState[];
}

const initialState: State = {
  balState: [],
};

export function reducer(
  state = initialState,
  action: fromActions.FrontalActions
): State {
  switch (action.type) {
    case fromActions.BALStateActionTypes.SET_BALState: {
      const balStates = action.payload;
      return {
        ...state,
        balState: balStates,
      };
    }

    default: {
      return state;
    }
  }
}

//
export const getBALStates = (state: State) => {
  const { balState } = state;
  return {
    balState,
  };
};
