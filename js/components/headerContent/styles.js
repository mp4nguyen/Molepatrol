
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
const deviceWidth = Dimensions.get('window').width;
export default {
  header: {
    width: Platform.OS === 'android' ? deviceWidth + 5 : undefined,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    elevation: 0,
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 0,
  },
  btnHeader: {
    alignSelf: 'center',
  },
  imageHeader: {
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
};
