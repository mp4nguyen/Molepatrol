

import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import { Grid, Col } from 'react-native-easy-grid';
const bg = require('../../../images/BG.png');
const headerLogo = require('../../../images/header-logo.png');

const primary = require('../../themes/variable').brandPrimary;
const {
  popRoute,
} = actions;
class FundInformation extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
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
            <View style={styles.textContainer}>
              <Text style={styles.textheader}>
                FUND INFORMATION
                                </Text>
            </View>
            <View style={styles.container}>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is it new?</Text>
                </Col>
                <Col style={styles.aswitchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is it growing?</Text>
                </Col>
                <Col style={styles.aswitchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <View style={styles.ifYesView}>
                <Text style={styles.ifYesText}>If Yes, how quickly?</Text>
              </View>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is It Changing shape or colour?</Text>
                </Col>
                <Col style={styles.switchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is It itchy or bleeding?</Text>
                </Col>
                <Col style={styles.switchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is It tender or paintful?</Text>
                </Col>
                <Col style={styles.switchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Does it come and go or is it alway present?</Text>
                </Col>
                <Col style={styles.switchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
                    </Col>
                    <Col>
                      <Switch
                        disabled={true}
                        
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
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

export default connect(mapStateToProps, bindAction)(FundInformation);
