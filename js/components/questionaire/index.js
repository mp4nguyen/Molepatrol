

import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import { Grid, Col } from 'react-native-easy-grid';
import navigateTo from '../../actions/sideBarNav';
import { popToRoute } from '../../actions/route';
const bg = require('../../../images/BG.png');
import { setLesion, addAnotherLesion } from '../../actions/request';
const primary = require('../../themes/variable').brandPrimary;
const {
  pushRoute,
  popRoute,
} = actions;
class FundInformation extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    addNew: React.PropTypes.func,
    setValue: React.PropTypes.func,
    submitLesson: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    popToRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      isNew: false,
      isGrowing: false,
      isShapeOrChangeColor: false,
      isItchyOrBleeding: false,
      isTenderOrPainful: false,
      doesItComeAndGo: false,
    };
    this.changeValue = this.changeValue.bind(this);
    this.newLesion = this.newLesion.bind(this);
    this.submitLesson = this.submitLesson.bind(this);
    
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }
  popToRoute(route) {
    this.props.popToRoute(route);
  }
  changeValue(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }
  submitLesson() {
    const { setValue } = this.props;
    if (setValue) {
    setValue(this.state, true).then(this.pushRoute.bind(this, 'requestsummary'));
    } else {
      this.pushRoute('requestsummary');
    }
  }
  newLesion() {
    const { navigation, item } = this.props;
    this.props.addNew({ ...item, ...this.state })
      .then(() => {
        const index = _.findIndex(navigation.routes, { key: 'introduction' });
        for (let i = index; i < navigation.routes.length - 1; i++) {
          this.popRoute();
        }
      })
      .catch(err => window.alert(err));
  }
  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false}>
            <HeaderContent />
            <View style={styles.textContainer}>
              <Text style={styles.textheader}>
                QUESTIONAIRE
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
                        onValueChange={value => this.changeValue('isNew', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.isNew}
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
                        onValueChange={value => this.changeValue('isGrowing', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.isGrowing}
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
                        onValueChange={value => this.changeValue('isShapeOrChangeColor', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.isShapeOrChangeColor}
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
                        onValueChange={value => this.changeValue('isItchyOrBleeding', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.isItchyOrBleeding}
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
                        onValueChange={value => this.changeValue('isTenderOrPainful', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.isTenderOrPainful}
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
                        onValueChange={value => this.changeValue('doesItComeAndGo', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={this.state.doesItComeAndGo}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </View>
            <View style={styles.otherContainer}>
              <Left style={{ marginRight: 5 }}>
                <Button
                  rounded block large
                  onPress={this.newLesion}
                  style={styles.otherBtn}
                >
                  <Text style={styles.otherText}>
                    Another Lesson</Text>
                </Button>
              </Left>
              <Right style={{ marginLeft: 5 }}>
                <Button
                  rounded dark block large
                  style={styles.otherBtn}
                  onPress={this.submitLesson}
                >
                  <Text style={styles.otherText}>
                    Finish</Text>
                </Button>
              </Right>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    addNew: lesion => dispatch(addAnotherLesion(lesion)),
    setValue: (value, finish) => dispatch(setLesion(value, finish)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popToRoute: route => dispatch(popToRoute(route)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  item: state.request.item,
});

export default connect(mapStateToProps, bindAction)(FundInformation);
