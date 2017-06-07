
import {SET_FOR_TAKEPICTURE,SET_FOR_SELECTLESION ,SET_FOR_QUESTIONARE,SET_FOR_ALL ,RESET,SET_FOR_MEMBERS,SET_FOR_NEWMEMBER,SET_FOR_SUMMARY} from '../nextPage';

const initialState = {
  takepicture: 'selectlesion',
  selectlesion: 'questionaire',
  questionaire: 'requestsummary',
  members: 'myrequest',
  summary: 'home',
  newmember: 'home',
};



export default function reducer(state = initialState, action) {

  if(action.type == SET_FOR_TAKEPICTURE){
    return {...state,takepicture:action.payload}
  }else if(action.type == SET_FOR_SELECTLESION){
    return {...state,selectlesion:action.payload}
  }else if(action.type == SET_FOR_QUESTIONARE){
    return {...state,questionaire:action.payload}
  }else if(action.type == SET_FOR_ALL){
    return {...state,questionaire:action.payload,selectlesion:action.payload,takepicture:action.payload}
  }else if(action.type == RESET){
    return {...initialState}
  }else if(action.type == SET_FOR_MEMBERS){
    return {...state,members:action.payload}
  }else if(action.type == SET_FOR_SUMMARY){
    return {...state,summary:action.payload}
  }else if(action.type == SET_FOR_NEWMEMBER){
    return {...state,newmember:action.payload}
  }else{
    return state;
  }

}
