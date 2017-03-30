import { ADD_TOAST } from '../actions/toast';

export default function toastMessage(state = null, action) {
  switch (action.type) {
    case ADD_TOAST:
      return action.message;
    default:
      return state;
  }
}
