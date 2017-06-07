
import type { Action } from '../types';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../drawer';

export type State = {
    drawerState: string,
    drawerDisabled: boolean
}

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }
  return state;
}
