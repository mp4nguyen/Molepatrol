

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
    width: null,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputGrp: {
    marginBottom: 15,
    borderWidth: 1.5,
    borderTopWidth: 0,
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
    textAlignVertical: 'center',
  },
  background: {
    flex: 1,
    width: deviceWidth + 5,
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
    marginTop: -5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  switchOptionText: {
    fontSize: 11,
    paddingTop: 5,
    textAlignVertical: 'bottom',
  },
};
