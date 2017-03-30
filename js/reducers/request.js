
import type { Action } from '../actions/types';
import { LIST_REQUEST, ADD_ANOTHER_LESION, SET_REQUEST_VALUE, CREATE_REQUEST, GET_REQUEST, lesion } from '../actions/request';

export type State = {
    list: array,
    item: object,
    list: array,
}

const initialState = {
  list: [],
  item: lesion,
  items: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === LIST_REQUEST) {
    return {
      ...state,
      list: action.payload,
    };
  }

  if (action.type === CREATE_REQUEST || action.type === GET_REQUEST) {
    return {
      ...state,
      items: [],
      item: action.payload,
    };
  }
  if (action.type === SET_REQUEST_VALUE) {
    const newState = {
      ...state,
      item: {
        ...state.item,
        ...action.payload.value,
      },
    };
    if (action.payload.finish) {
      return {
        ...newState,
        items: [...newState.items, newState.item],
      };
    }
    return newState;
  }
  if (action.type === ADD_ANOTHER_LESION) {
    return {
      ...state,
      items: [...state.items, action.payload.lesion],
      item: action.payload.newLesion,
    };
  }
  return state;
}
