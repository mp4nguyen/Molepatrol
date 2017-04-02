
import {Platform} from 'react-native';
import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: (Platform.OS === 'ios') ? 'login' : 'splashscreen',
      index: 0,
    },
  ],
};
module.exports = cardStackReducer(initialState);
