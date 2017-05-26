
import type { PromiseAction } from './types';
import { postRequest, getRequest ,postRequest2} from '../libs/requests';
import moment from 'moment'
export const LIST_MEMBER = 'LIST_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const CREATE_MEMBER = 'CREATE_MEMBER';
export const SET_INFO = 'SET_INFO';
export const SET_BACK_ROUTE = 'SET_BACK_ROUTE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const SET_MEMBER = 'SET_MEMBER';
export const CHANGE_VALUE_MEMBER = 'CHANGE_VALUE_MEMBER';
export const SET_FATHER_MEMBER = 'SET_FATHER_MEMBER';

const memberForm = {
  id: 0,
  gp: {
    firstName: '',
    lastName: '',
    clinic: '',
    contactNumber: '',
    state: '',
    country: '',
  },
  basic: {
    title: '',
    firstName: '',
    lastName: '',
    dob: new moment().format('YYYY-MM-DD'),
    gender: false,
    occupation: '',
    email: '',
  },
  contact: {
    phone: '',
    address: '',
    suburb: '',
    postcode: '',
    state: '',
    country: '',
  },
};

export function changeValueMember(page,fieldName,value): Action {
  var dispatchObject = {};
  var valueObject = {}
  valueObject[fieldName] = value
  dispatchObject[page]= valueObject
  console.log("actions.members.changeValueMember:...",dispatchObject);

  //return dispatch => dispatch({type: ADD_MEMBER,payload: dispatchObject});

  return {type: CHANGE_VALUE_MEMBER,payload: {page,fieldName,value}}

}

export function createMember(): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CREATE_MEMBER
    });
    resolve();
  });
}


export function signupOrCreateMemberOrUpdateMember(): Action {
  //this function is used to signup and make a new member if signup object is not null and personId is null
  //will create new member if signup object is null and personId is null
  //will update member if personId is not null
  return (dispatch,getState) => {
    let stateOrigin = getState();
    let state = Object.assign({},stateOrigin)

    //state.member.member.baseinfo.dob = state.member.member.baseinfo.dob.format("YYYY-MM-DDTHH:mm:ssZ")
    //state.member.member.gp.medicareExpired = state.member.member.gp.medicareExpired.format("YYYY-MM-DDTHH:mm:ssZ")
    console.log("stateOrigin = ",stateOrigin," state = ",state);

    return new Promise((resolve) => {
      if(!state.member.member.baseinfo.personId && state.member.member.signup.username){
        postRequest2('api/v1/signup', state.member.member).then((response) => {
          console.log("api/v1/signup = ",response);
            // dispatch({
            //   type: CREATE_MEMBER,
            //   payload: response.member,
            // });
        });
      }else if (!state.member.member.baseinfo.personId && !state.member.member.signup.username){
        postRequest2('api/v1/newMember', state.member.member).then((response) => {
          console.log("api/v1/newMember = ",response);
            // dispatch({
            //   type: CREATE_MEMBER,
            //   payload: response.member,
            // });
        });
      }else{
        postRequest2('api/v1/updateMember', state.member.member).then((response) => {
          console.log("api/v1/updateMember = ",response);
            // dispatch({
            //   type: CREATE_MEMBER,
            //   payload: response.member,
            // });
        });
      }

      resolve("OK");
    });


  }
}




export function getMembers(): Action {
  return dispatch => getRequest('BookingCtrls/getMembers')
    .then((response) => {
      dispatch({
        type: LIST_MEMBER,
        payload: response.members,
      });
    });
}
export function getMember(id): Action {
  return dispatch => getRequest(`BookingCtrls/getMember/${id}`)
    .then((response) => {
      dispatch({
        type: GET_MEMBER,
        payload: response.member,
      });
      return new Promise.resolve(response.member);
    });
}

export function setInfo(info): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SET_INFO,
      payload: info,
    });
    resolve();
  });
}


export function setBackRoute(route): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SET_BACK_ROUTE,
      payload: route,
    });
    resolve();
  });
}

export function setMember(member): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SET_MEMBER,
      payload: member,
    });
    resolve();
  });
}
