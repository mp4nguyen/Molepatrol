

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
  },
  preview: {
    alignItems: 'center',
    height: deviceHeight,
    width: deviceWidth + 5,
  },
  control: {
    width: deviceWidth,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 50 : 10,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 50,
    color: '#fff',
  },
};

