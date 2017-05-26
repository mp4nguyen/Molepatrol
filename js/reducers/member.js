import moment from 'moment'
import type { Action } from '../actions/types';
import { LIST_MEMBER, SET_MEMBER, CREATE_MEMBER, ADD_MEMBER, GET_MEMBER, SET_INFO, SET_BACK_ROUTE, CHANGE_VALUE_MEMBER,SET_FATHER_MEMBER } from '../actions/member';
import { USER_LOGIN } from '../actions/user';

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
    if(action.payload.relationshipss && action.payload.relationshipss[0].personId){
      //console.log("1 add more to members = ",members,action.payload.relationshipss);
      members = [...members,...action.payload.relationshipss]
    }
    return {
      ...state,
      list: members,
    };
  }

  if (action.type === SET_MEMBER) {
    console.log(" moment(action.payload.dob) = ",moment(action.payload.dob));
    let member = {
      signup: { username: '', password: '', email: '' },
      baseinfo: { fatherPersonId: state.fatherPersonId, personId: action.payload.personId,title: action.payload.title, firstName: action.payload.firstName, lastName: action.payload.lastName, dob: moment(action.payload.dob), gender: action.payload.gender, occupation: action.payload.occupation, email: action.payload.email },
      contact: { phone: action.payload.mobile, address: action.payload.address, suburb: action.payload.suburbDistrict, state: action.payload.stateProvince, postcode: action.payload.postcode, country: action.payload.country },
      gp: { firstName: action.payload.gPFirstName, lastName: action.payload.gPLastName, clinic: action.payload.ClinicName, contactNumber: action.payload.gPContact, medicareNo: action.payload.medicareNo, medicareRef: action.payload.medicareRef, medicareExpired: moment(action.payload.medicareExpired)},
    }
    console.log("member = ",member);
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
      contact: { phone: '', address: '', suburb: '', state: '', postcode: '', country: '' },
      gp: { firstName: '', lastName: '', clinic: '', contactNumber: '', medicareNo: '', medicareRef: '', medicareExpired: null},
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
