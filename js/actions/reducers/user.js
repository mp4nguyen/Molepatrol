
import type { Action } from '../types';
import { USER_LOGIN, USER_LOGOUT } from '../user';
import { AsyncStorage } from 'react-native'
export type State = {
    user: object,
    token: object
}

const initialState = {
  user: null,
  accessToken: null,
};

export default function (state:State = initialState, action:Action): State {

  if (action.type === USER_LOGIN) {
    return {
      ...state,
      user: action.payload.account,
      accessToken: action.payload.accessToken
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
