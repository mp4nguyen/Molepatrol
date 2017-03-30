
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import styles from './styles';
class StepInfo extends Component {
  static propTypes = {
    text: React.PropTypes.string,
    active: React.PropTypes.string,
  }
  render() {
    const { text, active } = this.props;
    return (
        
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.draw}>
        <View style={active === '1' ? styles.activedCycle : styles.cycle} />
        <View style={styles.line} />
        <View style={active === '2' ? styles.activedCycle : styles.cycle} />
        <View style={styles.line} />
        <View style={active === '3' ? styles.activedCycle : styles.cycle} />
      </View>
    </View>);
  }
}
export default StepInfo;
