
import { SHOW_SPINNER, HIDE_SPINNER } from '../actions/spinner';

const initialState = {
  isShowed: false,
};

const ACTION_HANDLERS = {
  [SHOW_SPINNER]: (state, action) => ({
    isShowed: true,
  }),
  [HIDE_SPINNER]: (state, action) => ({
    isShowed: false,
  }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
