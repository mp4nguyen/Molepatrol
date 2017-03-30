

const React = require('react-native');

const { Platform, Dimensions, StyleSheet } = React;

export default {
  header: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
  btnHeader: {
    alignSelf: 'center',
  },
  imageHeader: {
    height: 30,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    width: null,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputGrp: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 15,
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
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
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    lineHeight: 40,
    height: 40,
  },
  aswitchText: {
    color: '#222',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  switchContainer: {
    alignSelf: 'flex-end',
    paddingTop: 8,
  },
  aswitchContainer: {
    // alignSelf: 'flex-end'
  },
  switch: {
    transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'android' ? -2 : -5,
    paddingTop: Platform.OS === 'android' ? 25 : 10,
    paddingBottom: Platform.OS === 'android' ? 0 : 10,
  },
  switchOptionText: {
    fontSize: 11,
    paddingTop: 5,
    textAlignVertical: 'bottom',
  },
  submitBtn: {
    marginTop: 0,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
};
