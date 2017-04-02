

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    padding: 20,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: primary,
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
  },
  addBtn: {
    marginTop: 10,
    margin: 20,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  item: {
    marginTop: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 14,
    marginBottom: Platform.OS === 'android' ? 10 : undefined,
  },
};
