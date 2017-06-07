import {SET_MEMBERS_PROPS,SET_TAKEPICTURE_PROPS,SET_SELECTLESION_PROPS,SET_QUESTIONARE_PROPS,SET_SUMMARY_PROPS} from '../pageControl';

const initialState = {
  takepicture: {isBack:true,isNext:true,isCancel:false},
  selectlesion: {isBack:true,isNext:true},
  questionaire: {isBack:true,isNext:true},
  members: {},
  summary: {isNew:true},
};

export default function reducer(state = initialState, action) {

  if(action.type == SET_TAKEPICTURE_PROPS){
    var takepicture = {...state.takepicture,[action.payload.propName]:action.payload.propValue};
    return {...state,takepicture};
  }else if(action.type == SET_SELECTLESION_PROPS){
    var selectlesion = {...state.selectlesion,[action.payload.propName]:action.payload.propValue};
    return {...state,selectlesion}
  }else if(action.type == SET_QUESTIONARE_PROPS){
    var questionaire = {...state.questionaire,[action.payload.propName]:action.payload.propValue};
    return {...state,questionaire}
  }else if(action.type == SET_SUMMARY_PROPS){
    var summary = {...state.summary,[action.payload.propName]:action.payload.propValue};
    return {...state,summary}
  }else{
    return state;
  }

}
