

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const primary = require('../../themes/variable').brandPrimary;

export default {
  logo: {
    margin: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  iosShadow: {
    resizeMode: 'contain',
    width: deviceWidth < 350 ? 200 : deviceWidth,
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  signupHeader: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 50,
    backgroundColor: null,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'transparent',
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    color: '#FFF',
  },
  signupBtn: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  termsText: {
    alignSelf: 'center',
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
};
