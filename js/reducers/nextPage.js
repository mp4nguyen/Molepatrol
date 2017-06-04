
import {SET_FOR_TAKEPICTURE,SET_FOR_SELECTLESION ,SET_FOR_QUESTIONARE,SET_FOR_ALL ,RESET,SET_FOR_MEMBERS} from '../actions/nextPage';

const initialState = {
  takepicture: 'selectlesion',
  selectlesion: 'questionaire',
  questionaire: 'requestsummary',
  members: 'myrequest'
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
    return {...initialState,members:action.payload}
  }else{
    return state;
  }

}
