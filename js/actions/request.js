
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
  patientId:0,
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


export function getList(member): Action {
  ////console.log(" ====> getList.member = ",member);
  return dispatch => postRequest2('/api/v1/getAppointments',member)
    .then((response) => {
      ////console.log(" /api/v1/getAppointments = ",response);

      dispatch({
        type: LIST_REQUEST,
        payload: response.appointments||[],
      });
    });
}

export function getItem(apptId): Action {
  ////console.log(" ======> getItem.apptId = ",apptId);
  return dispatch => new Promise((resolve) => {
    postRequest2('/api/v1/getAppointment',{apptId}).then((response) => {
      ////console.log(" /api/v1/getAppointment = ",response);
      dispatch({
        type: GET_REQUEST,
        payload: response,
      });
      resolve();
    });
  });



  // return dispatch => getRequest(`BookingCtrls/getRequest/${id}`)
  //   .then((response) => {
  //     dispatch({
  //       type: GET_REQUEST,
  //       payload: response.request,
  //     });
  //   });
}


export function newLesion(personId,patientId, gender): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CREATE_REQUEST,
      payload: { ...lesionForm, personId,patientId, gender },
    });
    resolve();
  });
}


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
    ////console.log("setLesion............value = ",value," finish = ",finish);
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

export function submitRequest(items): Action {
  return dispatch => new Promise((resolve) => {
    if(items.length > 0){
        /////////////////////
        var submitMoles = {
          personId : items[0].personId,
          patientId : items[0].patientId,
          lesions : []
        }
        const body = new FormData()
        //body.append('company','Redimed')
        let file = {}
        items.forEach((item,itemIndex)=>{
          let lesion = {
            lesionId:0,
            photos: [],
            lesion: null,
            isFront: item.isFront,
            isNew: item.isNew,
            isGrowing: item.isGrowing,
            isShapeOrChangeColor: item.isShapeOrChangeColor,
            isItchyOrBleeding: item.isItchyOrBleeding,
            isTenderOrPainful: item.isTenderOrPainful,
            doesItComeAndGo: item.doesItComeAndGo,
          };

          if(item.lesion){
            var imageId = `lesion_${item.personId}_${itemIndex}_body_${new Date().getTime()}`;
            var imageFile = `${imageId}.jpg`
            file = {
              uri:item.lesion,             // e.g. 'file:///path/to/file/image123.jpg'
              name:imageFile,       // e.g. 'image123.jpg',
              type:'image/jpg'             // e.g. 'image/jpg'
            }
            body.append(imageId, file)
            lesion.lesion = imageFile;
          }

          item.resource.forEach((res,resId)=>{
            var imageId = `lesion_${item.personId}_${itemIndex}_${resId}_${new Date().getTime()}`;
            var imageFile = `${imageId}.jpg`
            file = {
              uri:res,             // e.g. 'file:///path/to/file/image123.jpg'
              name:imageFile,            // e.g. 'image123.jpg',
              type:'image/jpg'             // e.g. 'image/jpg'
            }
            body.append(imageId, file)
            lesion.photos.push(imageFile);
          })

          submitMoles.lesions.push(lesion);
        });

        body.append('items', JSON.stringify(submitMoles))
        // if(value.resource.length > 0){
        //   RNFS.readFile(value.resource[0], "base64").then(image => {
        //     //console.log("base64 = ",image)
        //
        //     postRequest2('/api/v1/uploadPhoto',{image}).then(res=>{
        //       //console.log("uploadPhoto = ",res);
        //
        //     });
        //   })
        // }
        ////console.log("send body to server = ",body);
        const config = {
              headers: { 'content-type': 'multipart/form-data' }
          }

        postRequest2('/api/v1/uploadPhoto',body,config).then(res=>{
          ////console.log("uploadPhoto = ",res);
          resolve();
        });
        /////////////////////
    }
  });
}

export function addAnotherLesion(lesion): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ADD_ANOTHER_LESION,
      payload: { newLesion: { ...lesionForm, personId: lesion.personId,patientId: lesion.patientId, gender: lesion.gender} },
    });
    resolve();
  });
}
