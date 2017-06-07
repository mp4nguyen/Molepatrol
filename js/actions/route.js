

import type { Action } from './types';

export const PUSH_NEW_ROUTE = 'PUSH_NEW_ROUTE';
export const REPLACE_ROUTE = 'REPLACE_ROUTE';
export const REPLACE_OR_PUSH_ROUTE = 'REPLACE_OR_PUSH_ROUTE';
export const POP_ROUTE = 'POP_ROUTE';
export const RESET_ROUTE = 'RESET_ROUTE';
export const POP_TO_ROUTE = 'POP_TO_ROUTE';

export function replaceRoute(route:string, passProps:any):Action {
  //console.log("actions.route.js.replaceRoute: route = ",route," passProps = ",passProps);
  return {
    type: REPLACE_ROUTE,
    route,
    passProps,
  };
}

export function pushNewRoute(route:string, passProps:any):Action {
  //console.log("actions.route.js.pushNewRoute: route = ",route," passProps = ",passProps);
  return {
    type: PUSH_NEW_ROUTE,
    route,
    passProps,
  };
}

export function replaceOrPushRoute(route:string, passProps:any):Action {
  //console.log("actions.route.js.replaceOrPushRoute: route = ",route," passProps = ",passProps);
  return {
    type: REPLACE_OR_PUSH_ROUTE,
    route,
    passProps,
  };
}

export function popRoute(passProps:any):Action {
  //console.log("actions.route.js.popRoute:  passProps = ",passProps);
  return {
    type: POP_ROUTE,
    passProps,
  };
}

export function popToRoute(route:string, passProps:any):Action {
  //console.log("actions.route.js.popToRoute: route = ",route," passProps = ",passProps);
  return {
    type: POP_TO_ROUTE,
    route,
    passProps,
  };
}

export function resetRoute():Action {
  //console.log("actions.route.js.resetRoute:");
  return {
    type: RESET_ROUTE,
  };
}
