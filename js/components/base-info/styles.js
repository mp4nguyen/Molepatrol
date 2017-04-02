

const React = require('react-native');

const { Platform, Dimensions, StyleSheet } = React;
const deviceWidth = Dimensions.get('window').width;
export default {
  header: {
    width: Platform.OS === 'android' ? deviceWidth + 5 : undefined,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    elevation: 0,
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  btnHeader: {
    alignSelf: 'center',
  },
  imageHeader: {
    height: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputGrp: {
    marginBottom: 15,
    borderWidth: 1.5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    paddingLeft: 10,
    height: 40,
    color: '#FFF',
    lineHeight: 40,
    textAlignVertical: 'bottom',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  switchText: {
    color: '#fff',
    paddingLeft: 5,
    paddingTop: Platform.OS === 'android' ? 3 : 0,
  },
  aswitchText: {
    color: '#222',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  switch: {
    transform: Platform.OS === 'android' ? undefined : [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    alignSelf: 'flex-end',
    marginTop: -5,
    paddingTop: Platform.OS === 'android' ? 0 : 10,
    paddingBottom: 10,
  },
  switchOptionText: {
    fontSize: 11,
    paddingTop: 5,
    textAlignVertical: 'bottom',
  },
  switchGrid: {
    height: 40,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
};
