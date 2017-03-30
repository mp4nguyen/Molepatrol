

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    padding: 10,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: primary,
    paddingBottom: 20,
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
    marginTop: (deviceHeight < 500) ? (Platform.OS === 'android' ? 20 : 0) : (Platform.OS === 'android' ? ((deviceHeight / 6) - 45) : ((deviceHeight / 6) - 10)),
  },
  addBtn: {
    height: 50,
    borderRadius: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  wrap: {
    flex: 1,
  },
  timelineView: {
    paddingLeft: 30,
  },
  timelineContent: {
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 15,
  },
  borderNone: {
    paddingLeft: 15,
    paddingBottom: 15,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  timelineContentHeading: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  newsTypeView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  status: {
    fontSize: 14,
    lineHeight: 30,
  },
};
