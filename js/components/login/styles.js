
import theme from '../../themes/base-theme';
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
console.log(deviceWidth);
export default {
  logo: {
    flex: 1,
    margin: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  iosShadow: {
    resizeMode: 'contain',
    width: deviceWidth < 350 ? 200 : deviceWidth,
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
    color: '#FFF',
  },
  signinContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: deviceWidth,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    flexDirection: 'column',
    width: null,
    height: deviceHeight,
  },
  loginBtn: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontFamily: theme.fontFamily,
    fontWeight: 'bold',
    color: '#FFF',
  },
  otherLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
