import * as fromActions from '../actions/frontal.action';
import { Frontal } from 'src/app/@shared/models/Frontal';

export interface State {
  frontal: Frontal[];
  filtredFrontals: Frontal[];
}

const initialState: State = {
  frontal: [],
  filtredFrontals: [],
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
    case fromActions.FrontalActionTypes.FILTER_FRONTAL_LIST: {
      return {
        ...state,
        filtredFrontals: action.payload,
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
