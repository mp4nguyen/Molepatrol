
const React = require('react-native');

const { Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

export default {

  links: {
    paddingTop: Platform.OS === 'android' ? 8 : 15,
    paddingBottom: Platform.OS === 'android' ? 12 : 15,
    paddingLeft: Platform.OS === 'android' ? 0 : 10,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 0,
    borderBottomColor: 'transparent',
  },
  linkText: {
    paddingLeft: 15,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  drawerContent: {
    paddingTop: Platform.OS === 'android' ? 20 : 30,
    marginBottom: (Platform.OS === 'ios') ? -50 : -10,
  },
  viewWelCome: {
    margin: 20,
    alignItems: 'center',
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  welcomeText: {
    fontSize: 13,
    color: '#eee',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
};
