

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  iosShadow: {
    flex: 1,
    width: deviceWidth < 350 ? 200 : deviceWidth,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  needHelpContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 120,
  },
  needHelpHeader: {
    alignSelf: 'center',
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 80,
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
    marginTop: (deviceHeight < 500) ? (Platform.OS === 'android' ? 20 : 0) : (Platform.OS === 'android' ? ((deviceHeight / 6) - 45) : ((deviceHeight / 6) - 10)),
  },
  inputGrp: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    color: '#FFF',
  },
  needHelpBtn: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  termsText: {
    alignSelf: 'center',
    marginTop: 20,
    paddingBottom: 100,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EFF',
  },
};
