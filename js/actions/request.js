
import type { Action } from './types';
import { config } from '../global';
import _ from 'lodash';
import { postRequest, getRequest ,postRequest2} from '../libs/requests';
import {NativeModules} from 'react-native'
import RNFS from 'react-native-fs'

export const LIST_REQUEST = 'LIST_REQUEST';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const GET_REQUEST = 'GET_REQUEST';
export const SET_OR_UPDATE_LESION = 'SET_OR_UPDATE_LESION';
export const ADD_ANOTHER_LESION = 'ADD_ANOTHER_LESION';
export const CHANGE_VALUE_LESION = 'CHANGE_VALUE_LESION';
export const SET_PHOTO_VALUE = 'SET_PHOTO_VALUE';
export const SET_CURRENT_LESION = 'SET_CURRENT_LESION';
export const REMOVE_PHOTO_FROM_LESION = 'REMOVE_PHOTO_FROM_LESION';


export const lesionForm = {
  lesionId:0,
  personId: 0,
  gender: "",
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
      payload: { ...lesionForm, personId: id, gender },
    });
    resolve();
  });
}

function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

export function changeValueLesion(fieldName,value): Action {

    return {type: CHANGE_VALUE_LESION,payload: {fieldName,value}}
}

export function setPhoto(value): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SET_PHOTO_VALUE,
      payload: {value},
    });
    resolve();
  });
}

export function setLesion(): Action {
  return dispatch => new Promise((resolve) => {
    //console.log("setLesion............value = ",value," finish = ",finish);
    dispatch({
      type: SET_OR_UPDATE_LESION
    });
    resolve();
  });
}

export function removePhotoFromLesion(lesionId,resourceIndex):Action{
  return({
    type: REMOVE_PHOTO_FROM_LESION,
    payload:{lesionId,resourceIndex}
  });
}

export function setCurrentLesion(lesionId): Action{
  return({
    type: SET_CURRENT_LESION,
    payload:{lesionId}
  });
}

export function submitPhotos(value, finish): Action {
  return dispatch => new Promise((resolve) => {
    console.log(value,finish);
    const body = new FormData()
    //body.append('company','Redimed')
    let files = []
    let file = {}
    for(var i=0;i<value.resource.length;i++){
      let res = value.resource[i]
      console.log("res = ",res);
      file = {
        uri:res,             // e.g. 'file:///path/to/file/image123.jpg'
        name:`lesion_${i}_${new Date().getTime()}.jpg`,            // e.g. 'image123.jpg',
        type:'image/jpg'             // e.g. 'image/jpg'
      }
      //files.push(file)
      body.append(`lesion_${i}_${new Date().getTime()}`, file)
    }

    // if(value.resource.length > 0){
    //   RNFS.readFile(value.resource[0], "base64").then(image => {
    //     console.log("base64 = ",image)
    //
    //     postRequest2('/api/v1/uploadPhoto',{image}).then(res=>{
    //       console.log("uploadPhoto = ",res);
    //
    //     });
    //   })
    // }

    console.log("send body to server = ",body);
    const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

    postRequest2('/api/v1/uploadPhoto',body,config).then(res=>{
      console.log("uploadPhoto = ",res);
      resolve();
    });

  });
}

export function addAnotherLesion(lesion): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ADD_ANOTHER_LESION,
      payload: { newLesion: { ...lesionForm, personId: lesion.personId, gender: lesion.gender} },
    });
    resolve();
  });
}
