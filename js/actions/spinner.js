
import type { Action } from './types';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

export function showSpinner(): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: SHOW_SPINNER,
    });
    resolve();
  });
}

export function hideSpinner(): Action {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: HIDE_SPINNER,
    });
    resolve();
  });
}
