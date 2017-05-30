
import type { Action } from '../actions/types';
import { LIST_REQUEST, ADD_ANOTHER_LESION, SET_OR_UPDATE_LESION, CREATE_REQUEST, GET_REQUEST, lesion,CHANGE_VALUE_LESION ,SET_PHOTO_VALUE} from '../actions/request';

export type State = {
    list: array,
    item: object,
    list: array,
}

const initialState = {
  list: [],
  item: lesion,
  items: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === LIST_REQUEST) {
    return {
      ...state,
      list: action.payload,
    };
  }

  if (action.type === CREATE_REQUEST || action.type === GET_REQUEST) {
    return {
      ...state,
      items: [],
      item: action.payload,
    };
  }
  SET_PHOTO_VALUE

  if (action.type === SET_PHOTO_VALUE) {
    const newState = {
      ...state,
      item: {
        ...state.item,
        ...action.payload.value,
      },
    };
    return newState;
  }

  if (action.type === SET_OR_UPDATE_LESION) {
    var isFind = false;
    var newItems = [...state.items];
    for(var i=0;i<newItems.length;i++){
      itemInArray = newItems[i]
      console.log("itemInArray = ",itemInArray);
      if(itemInArray.lesionId == state.item.lesionId){
        isFind = true;
        itemInArray = {...state.item}
      }
    }

    if(!isFind){
      return {
        ...state,
        items: [...state.items, state.item],
      };
    }else{
      return {
        ...state,
        items: [...newItems],
      };
    }
  }
  if (action.type === CHANGE_VALUE_LESION) {
    // const valueObject = {};
    // valueObject[action.payload.fieldName] = action.payload.value;

    return {
      ...state,
      item: {
        ...state.item,
        [action.payload.fieldName]: action.payload.value
      }
    };
  }
  if (action.type === ADD_ANOTHER_LESION) {
    return {
      ...state,
      items: [...state.items, action.payload.lesion],
      item: action.payload.newLesion,
    };
  }
  return state;
}
