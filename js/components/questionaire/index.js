

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
import {bg,logo} from '../../libs/images';
import { setLesion, addAnotherLesion,changeValueLesion } from '../../actions/request';
import {goToPage,setNextPageForSummary} from '../../actions/nextPage';
const primary = require('../../themes/variable').brandPrimary;
const {
  pushRoute,
  popRoute,
} = actions;
class FundInformation extends Component {

  static propTypes = {
    changeValueLesion:React.PropTypes.func,
    item: React.PropTypes.object,
    addNew: React.PropTypes.func,
    setLesion: React.PropTypes.func,
    submitLesson: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    goToPage: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    popToRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    nextPage: React.PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.newLesion = this.newLesion.bind(this);
    this.submitLesion = this.submitLesion.bind(this);

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
    this.props.changeValueLesion(field, value);
  }
  submitLesion() {

    this.props.setLesion().then(()=>{
      this.props.setNextPageForSummary();
      this.props.goToPage(this.props.nextPage);
    });

  }
  newLesion() {
    const { navigation, item } = this.props;
    this.props.setLesion().then(()=>{
      this.props.addNew({ ...item, ...this.state }).then(() => {
          this.props.goToPage('takepicture');
          // const index = _.findIndex(navigation.routes, { key: 'takepicture' });
          // for (let i = index; i < navigation.routes.length - 1; i++) {
          //   this.popRoute();
          // }
          //this.pushRoute('takepicture');
        }).catch(err => window.alert(err));
    });
  }
  render() {
    const {item } = this.props;
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content scrollEnabled={false}>
            <Header style={styles.header} >
              <Left>
                {
                  this.props.pageControl.isBack &&
                  <Button transparent onPress={() => this.popRoute()}>
                    <Icon active name="arrow-back" />
                  </Button>
                }
              </Left>
              <Body>
                <Text style={styles.textheader}>QUESTIONAIRE</Text>
              </Body>
              <Right>
              </Right>
            </Header>

            <View style={styles.container}>
              <Grid style={styles.grid}>
                <Col>
                  <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Is it new?</Text>
                </Col>
                <Col style={styles.aswitchContainer}>
                  <Grid>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('isNew', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isNew}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('isGrowing', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isGrowing}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('isShapeOrChangeColor', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isShapeOrChangeColor}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('isItchyOrBleeding', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isItchyOrBleeding}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('isTenderOrPainful', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isTenderOrPainful}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                    <Col>
                      <Switch
                        onValueChange={value => this.changeValue('doesItComeAndGo', value)}
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.doesItComeAndGo}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>YES</Text>
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
                    Another Lesion</Text>
                </Button>
              </Left>
              <Right style={{ marginLeft: 5 }}>
                <Button
                  rounded dark block large
                  style={styles.otherBtn}
                  onPress={this.submitLesion}
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
    changeValueLesion:(fieldName, value) => dispatch(changeValueLesion(fieldName, value)),
    addNew: lesion => dispatch(addAnotherLesion(lesion)),
    setLesion: () => dispatch(setLesion()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popToRoute: route => dispatch(popToRoute(route)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    goToPage: (page) => dispatch(goToPage(page)),
    setNextPageForSummary: ()=> dispatch(setNextPageForSummary('home')),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  item: state.request.item,
  nextPage: state.nextPage.questionaire,
  pageControl: state.pageControl.questionaire,
});

export default connect(mapStateToProps, bindAction)(FundInformation);
