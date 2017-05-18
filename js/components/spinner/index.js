

import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';


import { Container, Spinner, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import styles from './styles';


class SpinnerView extends Component {
  static propTypes = {
    showSpinner: React.PropTypes.bool,
  }

  render() {
    if (!this.props.showSpinner) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Spinner color="#fff" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  showSpinner: state.spinner.isShowed,
});

export default connect(mapStateToProps)(SpinnerView);
