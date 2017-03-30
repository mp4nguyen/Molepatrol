
const React = require('react-native');

const { Dimensions, Platform } = React;
const primary = require('../../themes/variable').brandPrimary;

export default {
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  draw: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycle: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  activedCycle: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#0092C8',
  },
  line: {
    width: 30,
    height: 2,
    marginBottom: 3,
    marginTop: 2,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
};
