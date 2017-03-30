

import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body} from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';

const bg = require('../../../images/BG.png');

const {
  popRoute,
} = actions;
class ChangePassword extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0,
      },
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false}>
            <HeaderContent />
            <Text style={styles.needHelpHeader}>
              CHANGE PASSWORD
                                </Text>
            <View style={styles.needHelpContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Old Password"
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="New Password"
                  secureTextEntry
                  placeholderTextColor="#FFF"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  placeholder="Confirm New Password"
                  secureTextEntry
                  placeholderTextColor="#FFF"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>
              <Button
                rounded dark block large
                style={styles.submitBtn}
                onPress={() => {}}
              >
                <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Submit</Text>
              </Button>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ChangePassword);
