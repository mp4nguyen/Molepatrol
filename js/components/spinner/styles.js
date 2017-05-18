

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : 20,
    bottom: 0,
    right: 0,
    left: 0,
  },
};
