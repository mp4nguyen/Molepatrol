
import type { Action } from './types';
import { postRequest,postRequest2 } from '../libs/requests';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD';
export const CREATE_USER = 'CREATE_USER';

export function checkAvailableAccount(accountInfo): Action {
  console.log("checkAvailableAccount: will check accunt = ",accountInfo);
  return (dispatch,getState) => {
    return new Promise((resolve,reject) => {
      postRequest2('/api/v1/checkAvailableAccount',accountInfo).then(res=>{
        console.log("checkAvailableAccount = ",res);
        if (res.isAvailable == false){
          reject(res.reason)
        }else{
          resolve("OK");
        }
      });
    });
  }
}

export function login(user): Action {

  postRequest2('/api/v1/loginAT',user).then(res=>{
  	console.log("res = ",res.data);
  });

  return dispatch => postRequest('BookingCtrls/login', user)
    .then((response) => {
      dispatch({
        type: USER_LOGIN,
        payload: response.account,
      });
    });
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
