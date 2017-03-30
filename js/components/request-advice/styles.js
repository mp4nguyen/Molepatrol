

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const primary = require('../../themes/variable').brandPrimary;

export default {
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',
  },
  wrapheader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  user: {
    fontWeight: 'bold',
    marginTop: 30,
  },
  wrapbutton: {
    flex: 1,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  addBtn: {
    height: 50,
    borderWidth: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  nextBtn: {
    marginTop: 30,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
};
