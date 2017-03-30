
import type { Action } from './types';
import { postRequest } from '../libs/requests';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD';
export const CREATE_USER = 'CREATE_USER';

export function login(user): Action {
  return dispatch => postRequest('BookingCtrls/login', user)
    .then((response) => {
      dispatch({
        type: USER_LOGIN,
        payload: response.account,
      });
      console.log(response);
      return new Promise.resolve();
    }).catch(e=> console.log(e));
}

export function sendEmail(email): Action {
  return dispatch => postRequest('BookingCtrls/forgotPassword', { email })
    .then((response) => {
      dispatch({
        type: USER_FORGOT_PASSWORD,
        payload: response.account,
      });
    });
}

export function createUser(user): Action {
  return dispatch => postRequest('BookingCtrls/createUser', user)
    .then((response) => {
      dispatch({
        type: CREATE_USER,
        payload: response.user,
      });
    });
}
