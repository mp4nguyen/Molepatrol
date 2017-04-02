

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
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
  imageHeader: {
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 0,
  },
  headerimg: {
    alignItems: 'center',
  },
  btnHeader: {
  },
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  viewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainBtn: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    elevation: 0,
  },
  mainText: {
    fontSize: 14,
    marginBottom: Platform.OS === 'android' ? 10 : undefined,
  },
  otherBtn: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    height: 40,
    elevation: 0,
  },
  otherContainer: {
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
  },
  otherText: {
    padding: 5,
    fontSize: 13,
    height: 40,
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 10 : undefined,
  },
  mainIcon: {
    marginRight: 10,
  },
};
