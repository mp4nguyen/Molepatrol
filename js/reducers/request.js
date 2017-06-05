
import type { Action } from '../actions/types';
import { LIST_REQUEST, ADD_ANOTHER_LESION, SET_OR_UPDATE_LESION, CREATE_REQUEST, GET_REQUEST, lesion,CHANGE_VALUE_LESION ,SET_PHOTO_VALUE,SET_CURRENT_LESION,REMOVE_PHOTO_FROM_LESION} from '../actions/request';

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

  if ( action.type === GET_REQUEST) {
    if(action.payload && action.payload.lesions.length>0){
      return {
        ...state,
        item: action.payload.lesions[0],
        items: action.payload.lesions,
      };
    }else {
      return {
        ...state,
        item: {},
        items: [],
      };
    }
  }


  if (action.type === CREATE_REQUEST ) {
    return {
      ...state,
      items: [],
      item: action.payload,
    };
  }


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


  if (action.type === SET_CURRENT_LESION) {
    return {
      ...state,
      item: {...state.items[action.payload.lesionId]},
    };
  }


  if (action.type === REMOVE_PHOTO_FROM_LESION) {
    // console.log("will remove resource = ",action.payload);
    // console.log(" state.item = ",state.item);
    var newItem = {...state.item}
    var newItems = [...state.items];
    newItem.resource.splice(action.payload.resourceIndex,1);
    //console.log("after remove = ",newItem);
    for(var i=0;i<newItems.length;i++){
      itemInArray = newItems[i]
      //console.log("itemInArray = ",itemInArray);
      if(itemInArray.lesionId == newItem.lesionId){
        //console.log("found ",state.item);
        newItems[i] = {...newItem}
        //console.log("after itemInArray = ",itemInArray);
      }
    }

    return {
      ...state,
      items: [...newItems],
      item: {...newItem}
    };

  }

  if (action.type === SET_OR_UPDATE_LESION) {
    var isFind = false;
    var newItems = [...state.items];
    for(var i=0;i<newItems.length;i++){
      itemInArray = newItems[i]
      //console.log("itemInArray = ",itemInArray);
      if(itemInArray.lesionId == state.item.lesionId){
        isFind = true;
        //console.log("found ",state.item);
        newItems[i] = {...state.item}
        //console.log("after itemInArray = ",itemInArray);
      }
    }

    //console.log("newItems = ",newItems);
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
    action.payload.newLesion.lesionId = state.items.length;
    console.log(" action.payload.newLesion = ",action.payload.newLesion);
    return {
      ...state,
      items: [...state.items, action.payload.newLesion],
      item: {...action.payload.newLesion},
    };
  }
  return state;
}
