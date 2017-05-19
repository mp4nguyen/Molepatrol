
import type { Action } from '../actions/types';
import { USER_LOGIN, USER_LOGOUT } from '../actions/user';
import { AsyncStorage } from 'react-native'
export type State = {
    user: object,
    token: object
}

const initialState = {
  user: null,
  token: null,
};

export default function (state:State = initialState, action:Action): State {
  console.log("reducers.user.js action = ",action);
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === USER_LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
}
