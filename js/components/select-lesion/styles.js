

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
    height: deviceHeight - 140,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  control: {
    width: deviceWidth,
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: (Platform.OS === 'ios') ? undefined : -30,
    backgroundColor: '#E79B61',
    borderBottomColor: 'transparent',
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
  btnHeader: {
    alignSelf: 'center',
  },
  switchView: {
    height: 50,
    margin: 20,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  headertext: {
    flex: 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sketch: {
    height: deviceHeight - 140,
    width: deviceWidth,
    backgroundColor: 'transparent',
  },
  buttonBar: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  icon: {
    color: '#000',
    fontSize: 30,
  },
};

