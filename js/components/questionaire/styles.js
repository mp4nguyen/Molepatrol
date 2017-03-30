

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  textContainer: {
    alignItems: 'center',
    margin: 30,
  },
  textheader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  mt20: {
    marginTop: 20,
  },
  center: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  switchText: {
    alignSelf: 'flex-start',
  },
  aswitchText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  switchContainer: {
    alignSelf: 'flex-end',
    width: 90,
  },
  aswitchContainer: {
    alignSelf: 'flex-end',
    width: 90,
  },
  switch: {
    transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    alignSelf: 'flex-start',
    marginTop: -3,
  },
  grid: {
    marginBottom: 15,
    justifyContent: 'center',
  },
  ifYesView: {
    paddingBottom: 5,
    marginBottom: 15,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  ifYesText: {
    fontSize: 13,
  },
  otherBtn: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
    height: 40,
  },
  otherContainer: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
  },
  otherText: {
    padding: 5,
    fontSize: 13,
    height: 40,
    lineHeight: 18,
    textAlignVertical: 'center',
  },
  yn: {
    fontSize: 10,
    marginTop: 8,
  },
  colwrap: {
    width: 20,
  },
};

