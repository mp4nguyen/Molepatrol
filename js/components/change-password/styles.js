

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: (Platform.OS === 'ios') ? undefined : -30,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  imageHeader: {
    height: 30,
    resizeMode: 'contain',
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  btnHeader: {
  },
  iosShadow: {
    flex: 1,
    width: deviceWidth - 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  aShadow: {
    flex: 1,
    resizeMode: 'contain',
    width: (deviceWidth / 3) + 8,
    height: (deviceHeight / 20),
    padding: 20,
    alignSelf: 'center',
  },
  needHelpContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 70,
  },
  needHelpHeader: {
    alignSelf: 'center',
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 50,
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
    color: '#FFF',
  },
  submitBtn: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
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
