
import React, { Component } from 'react';
import { Image } from 'react-native';
import {connect} from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers'
const launchscreen = require('../../../images/launchscreen.png');

const {
  replaceAt
} = actions;

 class SplashPage extends Component {


   static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
    setTimeout (() => {
           this.props.replaceAt('splashscreen', { key: 'login' }, this.props.navigation.key);
       }, 1500);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Image source={launchscreen} style={{ flex: 1, height: null, width: null }} />
    );
  }

}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    popRoute: key => dispatch(popRoute(key))
  };
}


const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(SplashPage);
