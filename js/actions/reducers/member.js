import moment from 'moment'
import type { Action } from '../types';
import { LIST_MEMBER, SET_MEMBER, CREATE_MEMBER, ADD_MEMBER, UPDATE_MEMBER,GET_MEMBER, SET_INFO, SET_BACK_ROUTE, CHANGE_VALUE_MEMBER,SET_FATHER_MEMBER,RESET_MEMBER_TO_ZERO_FOR_CREATE,ADD_APPOINTMENT_TO_MEMBER} from '../member';
import { USER_LOGIN } from '../user';

export type State = {
    list: array,
    item: object,
}

const initialState = {
  list: [],
  item: null,
  member: {
    signup: { username: '', password: '', email: '' },
    baseinfo: { fatherPersonId:null , personId: null, title: 'Mr', firstName: '', lastName: '', dob: null, gender: 'MALE', occupation: '', email: '' },
    contact: { phone: '', address: '', suburb: '', state: '', postcode: '', country: '' },
    gp: { firstName: '', lastName: '', clinic: '', contactNumber: '', medicareNo: '', medicareRef: '', medicareExpired: null},
  },
  backToRoute: 'login',
  fatherPersonId: null
};

export default function (state:State = initialState, action:Action): State {


  if (action.type === ADD_APPOINTMENT_TO_MEMBER) {
    var item = {...state.item,appointments:[...state.item.appointments,action.payload]};
    var list = [...state.list];
    for(var i = 0;i<list.length;i++){
        if(list[i].patientId == item.patientId){
          list[i] = item;
        }
    }

    return {
      ...state,
      item,
      list
    };
  }

  if (action.type === RESET_MEMBER_TO_ZERO_FOR_CREATE) {
    return initialState;
  }

  if (action.type === SET_FATHER_MEMBER) {
    return {
      ...state,
      fatherPersonId: action.payload,
    };
  }

  if (action.type === LIST_MEMBER) {
    let members = [action.payload]
    // console.log("1 members = ",members);
    // console.log("1 will more to members = ",action.payload.relationshipss);
    if(action.payload.relationships && action.payload.relationships[0].personId){
      //console.log("1 add more to members = ",members,action.payload.relationshipss);
      members = [...members,...action.payload.relationships]
    }
    return {
      ...state,
      list: members,
    };
  }



  if (action.type === UPDATE_MEMBER) {
    //console.log(" moment(action.payload.dob) = ",moment(action.payload.dob));

    // let member = {
    //   signup: { username: '', password: '', email: '' },
    //   baseinfo: { fatherPersonId: state.fatherPersonId, personId: action.payload.personId,title: action.payload.title, firstName: action.payload.firstName, lastName: action.payload.lastName, dob: moment(action.payload.dob), gender: action.payload.gender, occupation: action.payload.occupation, email: action.payload.email },
    //   contact: { phone: action.payload.mobile, address: action.payload.address, suburb: action.payload.suburbDistrict, state: action.payload.stateProvince, postcode: action.payload.postcode, country: action.payload.country },
    //   gp: { firstName: action.payload.gPFirstName, lastName: action.payload.gPLastName, clinic: action.payload.clinicName, contactNumber: action.payload.gPContact, medicareNo: action.payload.medicareNo, medicareRef: action.payload.medicareRef, medicareExpired: moment(action.payload.medicareExpired)},
    // }
    // //console.log("member = ",member);
    // return {
    //   ...state,
    //   item: action.payload,
    //   member
    // };
    var isFind = false;
    var newItems = [...state.list];
    var newItem = {}
    for(var i=0;i<newItems.length;i++){
      itemInArray = newItems[i]
      //console.log("itemInArray = ",itemInArray);
      if(itemInArray.personId == action.payload.personId){
        isFind = true;
        newItem = Object.assign({},itemInArray,action.payload);
        newItems[i] = newItem
        //console.log("after itemInArray = ",itemInArray);
      }
    }

    if(isFind){
      return {...state,list: [...newItems],item:newItem};
    }else{
      return {...state,list: [...newItems,action.payload],item:action.payload};
    }
  }

  if (action.type === SET_MEMBER) {
    //console.log(" moment(action.payload.dob) = ",moment(action.payload.dob));
    let member = {
      signup: { username: '', password: '', email: '' },
      baseinfo: { fatherPersonId: state.fatherPersonId, personId: action.payload.personId,title: action.payload.title, firstName: action.payload.firstName, lastName: action.payload.lastName, dob: moment(action.payload.dob), gender: action.payload.gender, occupation: action.payload.occupation, email: action.payload.email },
      contact: { phone: action.payload.mobile, address: action.payload.address, suburb: action.payload.suburbDistrict, state: action.payload.stateProvince, postcode: action.payload.postcode, country: action.payload.country },
      gp: { firstName: action.payload.gPFirstName, lastName: action.payload.gPLastName, clinic: action.payload.clinicName, contactNumber: action.payload.gPContact, medicareNo: action.payload.medicareNo, medicareRef: action.payload.medicareRef, medicareExpired: moment(action.payload.medicareExpired)},
    }
    //console.log("member = ",member);
    return {
      ...state,
      item: action.payload,
      member
    };
  }

  if (action.type === CREATE_MEMBER ) {
    let member = {
      signup: { username: '', password: '', email: '' },
      baseinfo: {fatherPersonId: state.fatherPersonId,  personId: null, title: 'Mr', firstName: '', lastName: '', dob: null, gender: 'MALE', occupation: '', email: '' },
      contact: { phone: action.fatherProfile.mobile, address: action.fatherProfile.address, suburb: action.fatherProfile.suburbDistrict, state: action.fatherProfile.stateProvince, postcode: action.fatherProfile.postcode, country: action.fatherProfile.country },
      gp: { firstName: action.fatherProfile.gPFirstName, lastName: action.fatherProfile.gPLastName, clinic: action.fatherProfile.clinicName, contactNumber: action.fatherProfile.gPContact, medicareNo: action.fatherProfile.medicareNo, medicareRef: '', medicareExpired: moment(action.fatherProfile.medicareExpired)},
    }
    return {
      ...state,
      item: {},
      member
    };
  }

  if (action.type === CHANGE_VALUE_MEMBER) {
    const valueObject = {};
    const pageObject = {};

    valueObject[action.payload.fieldName] = action.payload.value;

    const newPageValue = Object.assign({}, state.member[action.payload.page], valueObject);
    pageObject[action.payload.page] = newPageValue;
    const newMember = Object.assign({}, state.member, pageObject);

    return Object.assign({}, state, { member: newMember });
  }

  if (action.type === SET_INFO) {
    return {
      ...state,
      member: {
        ...state.member,
        ...action.payload,
      },
    };
  }

  if (action.type === SET_BACK_ROUTE) {
    return {
      ...state,
      backToRoute: action.payload,
    };
  }

  if (action.type === ADD_MEMBER || action.type === GET_MEMBER) {
    return {
      ...state,
      member: action.payload,
    };
  }
  return state;
}
