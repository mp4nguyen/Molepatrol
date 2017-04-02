
import type { PromiseAction } from './types';
import { postRequest, getRequest } from '../libs/requests';
import moment from 'moment'
export const LIST_MEMBER = 'LIST_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const CREATE_MEMBER = 'CREATE_MEMBER';
export const SET_INFO = 'SET_INFO';
export const SET_BACK_ROUTE = 'SET_BACK_ROUTE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const SET_MEMBER = 'SET_MEMBER';


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

export function addMember(member): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ADD_MEMBER,
      payload: member || memberForm,
    });
    resolve();
  });
}


export function createMember(member): Action {
  return dispatch => postRequest('BookingCtrls/createMember', member)
    .then((response) => {
      dispatch({
        type: CREATE_MEMBER,
        payload: response.member,
      });
    });
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
