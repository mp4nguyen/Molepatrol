
import type { Action } from './types';
import _ from 'lodash';
import { actions } from 'react-native-navigation-redux-helpers';
const {
  popRoute,
  pushRoute
} = actions;

export const SET_FOR_MEMBERS = 'SET_FOR_MEMBERS';

export const SET_FOR_TAKEPICTURE = 'SET_FOR_TAKEPICTURE';
export const SET_FOR_SELECTLESION = 'SET_FOR_SELECTLESION';
export const SET_FOR_QUESTIONARE = 'SET_FOR_QUESTIONARE';
export const SET_FOR_ALL = 'SET_FOR_ALL';
export const RESET = 'RESET';


function myPushRoute(route,key) {
  pushRoute({ key: route, index: 1 }, key);
}


export function goToPage(nextPage) {
  return (dispatch,getState)=>{
    var state = getState();
    console.log(" state = ",state);
    var navigation = state.cardNavigation;
    console.log(" navigation = ",navigation);
    const index = _.findIndex(navigation.routes, { key: nextPage });
    console.log("will go to page = ",nextPage," index = ",index);
    if(index == -1){
      console.log("go to nextPage..........");
      dispatch(pushRoute({ key: nextPage, index: 1 }, navigation.key))
    }else{
      for (let i = index; i < navigation.routes.length - 1; i++) {
        dispatch(popRoute(navigation.key));
      }
    }
  }
}


export function setNextPageForMembers(nextPage): Action {
  return ({type:SET_FOR_MEMBERS,payload:nextPage})
}

export function setNextPageForTakePicture(nextPage): Action {
  return ({type:SET_FOR_TAKEPICTURE,payload:nextPage})
}

export function setNextPageForSelectLesion(nextPage): Action {
  return ({type:SET_FOR_SELECTLESION,payload:nextPage})
}

export function setNextPageForQuestionare(nextPage): Action {
  return ({type:SET_FOR_QUESTIONARE,payload:nextPage})
}

export function setNextPageForAll(nextPage): Action {
  return ({type:SET_FOR_ALL,payload:nextPage})
}

export function resetSetPage(): Action {
  return ({type:RESET})
}
