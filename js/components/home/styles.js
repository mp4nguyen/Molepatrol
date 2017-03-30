

const React = require('react-native');

const { Dimensions, Platform } = React;

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
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'flex-start',
    paddingLeft: 40,
  },
  mainText: {
    lineHeight: 40,
    fontSize: 14,
  },
  otherBtn: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    height: 40,
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
    lineHeight: 18,
    textAlignVertical: 'center',
  },
  mainIcon: {
    lineHeight: 35,
    height: 40,
    marginRight: 10,
  },
};
