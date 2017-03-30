
import type { Action } from './types';
import { config } from '../global';
import _ from 'lodash';
import { postRequest, getRequest } from '../libs/requests';

export const LIST_REQUEST = 'LIST_REQUEST';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const GET_REQUEST = 'GET_REQUEST';
export const SET_REQUEST_VALUE = 'SET_REQUEST_VALUE';
export const ADD_ANOTHER_LESION = 'ADD_ANOTHER_LESION';

export const lesionForm = {
  userId: 0,
  resource: [],
  lesion: null,
  isFront: true,
  isNew: false,
  isGrowing: false,
  isShapeOrChangeColor: false,
  isItchyOrBleeding: false,
  isTenderOrPainful: false,
  doesItComeAndGo: false,
};
const uploadFile = (item, data, type, index) => new Promise((resolve) => {
  postRequest('containers/requests/upload', data)
    .then((res) => {
      console.log(console.log(data));
      const file = _.first(res.result.files.file);
      const fileUrl = `${config.resourceURL}${file.container}/download/${file.name}`;
      if (type === 'lesion') {
        item.lesion = fileUrl;
      } else {
        item.resource[index] = fileUrl;
      }
      resolve(item);
    }).catch(x => console.log(x));
});

const processItem = item => new Promise((resolve) => {
  const task = [];
  if (item.lesion) {
    const data = new FormData();
    data.append('file', {
      uri: item.lesion,
      type: 'image/jpeg',
      name: `lesion_${new Date().getTime()}.png`,
    });
    task.push(uploadFile(item, data, 'lesion'));
  }
  _.each(item.resource, (x, index) => {
    const data = new FormData();
    console.log(index, '---- ', x);
    data.append('file', {
      uri: x,
      type: 'image/jpeg',
      name: `photo_${new Date().getTime()}.png`,
    });
    task.push(uploadFile(item, data, 'resource', index));
  });
  
  Promise.all(task)
    .then(() => {
      resolve(item);
    });
});

export function createRequest(items): Action {
  return dispatch => new Promise((resolve) => {
    const task = [];
    _.each(items, (item) => {
      task.push(processItem(item));
    });
    Promise.all(task).then((listItems) => {
      const request = {
        listItems,
        type: 0,
        isPending: true,
        completedDate: null,
      };
      postRequest('BookingCtrls/createRequest', request)
        .then((response) => {
          dispatch({
            type: CREATE_REQUEST,
            payload: response.request.listItems[0],
          });
          resolve();
        })
        .catch(e => console.log('error', e));
    });
  });
}


export function getList(): Action {
  return dispatch => getRequest('BookingCtrls/getRequests')
    .then((response) => {
      dispatch({
        type: LIST_REQUEST,
        payload: response.requests,
      });
    });
}

export function getItem(id): Action {
  return dispatch => getRequest(`BookingCtrls/getRequest/${id}`)
    .then((response) => {
      dispatch({
        type: GET_REQUEST,
        payload: response.request,
      });
    });
}


export function newLesion(id, gender): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CREATE_REQUEST,
      payload: { ...lesionForm, userId: id, gender },
    });
    resolve();
  });
}

export function setLesion(value, finish): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SET_REQUEST_VALUE,
      payload: { value, finish },
    });
    resolve();
  });
}

export function addAnotherLesion(lesion): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ADD_ANOTHER_LESION,
      payload: { lesion, newLesion: { ...lesionForm, userId: lesion.userId, gender: lesion.gender } },
    });
    resolve();
  });
}
