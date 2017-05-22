
import type { Action } from '../actions/types';
import { LIST_MEMBER, SET_MEMBER, CREATE_MEMBER, ADD_MEMBER, GET_MEMBER, SET_INFO, SET_BACK_ROUTE, CHANGE_VALUE_MEMBER } from '../actions/member';
import { USER_LOGIN } from '../actions/user';
export type State = {
    list: array,
    item: object,
}

const initialState = {
  list: [],
  item: null,
  member: {
    signup: { username: '', password: '', email: '' },
    baseinfo: { title: 'Mr', firstName: '', lastName: '', dob: '', gender: false, occupation: '', email: '' },
    contact: { phone: '', address: '', suburb: '', state: '', postcode: '', country: '' },
    gp: { firstName: '', lastName: '', clinic: '', contactNumber: '', medicareNo: '', medicareRef: '', medicareExpired: '' },
  },
  backToRoute: 'login',
};

export default function (state:State = initialState, action:Action): State {
  console.log('reducers.member.js: action = ', action);
  if (action.type === LIST_MEMBER) {
    return {
      ...state,
      list: action.payload,
    };
  }

  if (action.type === CREATE_MEMBER || action.type === USER_LOGIN || action.type === SET_MEMBER) {
    return {
      ...state,
      item: action.payload,
    };
  }

  if (action.type === CHANGE_VALUE_MEMBER) {
    const valueObject = {};
    const pageObject = {};

    valueObject[action.payload.fieldName] = action.payload.value;

    const newPageValue = Object.assign({}, state.member[action.payload.page], valueObject);
    pageObject[action.payload.page] = newPageValue;
    const newMember = Object.assign({}, state.member, pageObject);

    return Object.assign({}, state, { member: newMember });
  }

  if (action.type === SET_INFO) {
    return {
      ...state,
      member: {
        ...state.member,
        ...action.payload,
      },
    };
  }

  if (action.type === SET_BACK_ROUTE) {
    return {
      ...state,
      backToRoute: action.payload,
    };
  }

  if (action.type === ADD_MEMBER || action.type === GET_MEMBER) {
    return {
      ...state,
      member: action.payload,
    };
  }
  return state;
}
