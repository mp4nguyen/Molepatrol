
import { combineReducers } from 'redux';

import drawer from './drawer';
import user from './user';
import cardNavigation from './cardNavigation';
import request from './request';
import member from './member';

export default combineReducers({
  drawer,
  cardNavigation,
  request,
  user,
  member,
});
