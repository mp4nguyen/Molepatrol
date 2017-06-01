
import { combineReducers } from 'redux';

import drawer from './drawer';
import user from './user';
import cardNavigation from './cardNavigation';
import request from './request';
import member from './member';
import spinner from './spinner';
import nextPage from './nextPage';

export default combineReducers({
  drawer,
  cardNavigation,
  request,
  user,
  member,
  spinner,
  nextPage
});
