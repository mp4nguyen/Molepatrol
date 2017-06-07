

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Content, Text, Icon, Thumbnail, InputGroup, Input, Left, Right, Button, Header, Body, Picker, Item } from 'native-base';


import { setInfo, changeValueMember } from '../../actions/member';
import HeaderContent from './../headerContent/';
import StepInfo from '../step-info';
import theme from '../../themes/base-theme';
import styles from './styles';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import _ from 'lodash';

import {bg,logo} from '../../libs/images';

const headerLogo = require('../../../images/header-logo.png');


const {
  pushRoute,
  popRoute,
} = actions;

class BaseInfo extends Component {
  static defaultProps = {
    canBack: true,
    basic: {
      title: 'Mr',
      firstName: '',
      lastName: '',
      dob: null,
      gender: false,
      occupation: '',
      email: '',
    },
  }
  static propTypes = {
    submitBaseInfo: React.PropTypes.func,
    canBack: React.PropTypes.bool,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    basic: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      basic: { ...props.basic },
      errors: {},
    };
    this.validate = this.validate.bind(this);
    this.validator = {
      dob: value => !value || _.isEmpty(value),
      title: value => !value || _.isEmpty(value),
      firstName: value => !value || _.isEmpty(value),
      lastName: value => !value || _.isEmpty(value),
    };
    this.changeValue = this.changeValue.bind(this);
    this.submitBaseInfo = this.submitBaseInfo.bind(this);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'signup');
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  changeValue(field, value) {
    this.props.changeValueMember('baseinfo', field, value);

    // this.setState({
    //   ...this.state,
    //   basic: {
    //     ...this.state.basic,
    //     [field]: value,
    //   },
    // });
  }
  validate() {
    const errors = {};
    let count = 0;
    _.each(_.keys(this.validator), (key) => {
      if (this.validator[key](this.props.baseinfo[key])) {
        count += 1;
        errors[key] = { error: true };
      }
    });
    this.setState({
      ...this.state,
      errors,
    });
    if (count > 0) {
      return Promise.reject('Error!');
    }
    return Promise.resolve();
  }
  submitBaseInfo() {
    const { submitBaseInfo } = this.props;
    this.pushRoute('contactinfo');

    // if (submitBaseInfo) {
    //   this.validate().then(() => {
    //     this.pushRoute('contactinfo')
    //     //submitBaseInfo({ basic: this.state.basic }).then(this.pushRoute.bind(this, 'contactinfo'));
    //   }).catch(e => alert(e));
    // } else {
    //   this.pushRoute('contactinfo');
    // }
  }

  onValueChange(value: string) {
    console.log(' value = ', value);
  }
  render() {
    const { basic } = this.state;

    let dobValue,genderValue;
    if(this.props.baseinfo.dob){
        dobValue = this.props.baseinfo.dob.format('DD/MM/YYYY');
    }

    if(this.props.baseinfo.gender=='MALE'){
      genderValue = false
    }else if (this.props.baseinfo.gender=='FEMALE'){
      genderValue = true
    }
    

    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Header style={styles.header} >
            <Left>
              <Button transparent onPress={() => this.popRoute()}>
                <Icon active name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right>
              <Button transparent onPress={this.submitBaseInfo} >
                <Icon active name="arrow-forward" />
              </Button>
            </Right>
          </Header>
          <Content scrollEnabled={false}>
            <View style={styles.content}>
              <Text style={styles.title}>
                BASIC INFO
              </Text>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="document" />
                <Picker
                  supportedOrientations={['portrait', 'landscape']}
                  iosHeader="Title"
                  mode="dropdown"
                  selectedValue={this.props.baseinfo.title}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  itemTextStyle={styles.itemTextStyle}
                  onValueChange={value => this.changeValue('title', value)}
                >
                  <Item label="Mr" value="Mr" />
                  <Item label="Mrs" value="Mrs" />
                  <Item label="Ms" value="Ms" />
                  <Item label="Miss" value="Miss" />
                </Picker>
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Firstname"
                  value={this.props.baseinfo.firstName}
                  onChange={target => this.changeValue('firstName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  placeholder="Lastname"
                  value={this.props.baseinfo.lastName}
                  onChange={target => this.changeValue('lastName', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>
              <InputGroup {...this.state.errors.dob} underline style={styles.inputGrp}>
                <Icon name="calendar" />
                <DatePicker
                  style={{ width: 200, borderWidth: 0 }}
                  date={dobValue}
                  mode="date"
                  placeholder="Date Of Birth *"
                  format="DD/MM/YYYY"
                  minDate="01/05/1900"
                  maxDate={new moment().format('DD/MM/YYYY')}
                  confirmBtnText="Select"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      marginLeft: 8,
                      borderColor: undefined,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    },
                    dateText: {
                      fontSize: 15,
                      color: '#fff',
                    },
                  }}
                  onDateChange={(date) => { this.changeValue('dob', moment(date,'DD/MM/YYYY')); }}
                />
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Grid style={styles.switchGrid}>
                  <Col style={styles.textContainer}>
                    <Icon name="male" style={styles.switchIcon} />
                    <Text style={styles.switchText}>Gender</Text>
                  </Col>
                  <Col style={styles.switchContainer}>
                    <Grid>
                      <Col>
                        <Text style={styles.switchOptionText} >MALE </Text>
                      </Col>
                      <Col>
                        <Switch
                          onValueChange={value => this.changeValue('gender', value?'FEMALE':'MALE')}
                          style={styles.switch}
                          thumbTintColor="#ccc"
                          tintColor="#aaa"
                          value={genderValue}
                        />
                      </Col>
                      <Col>
                        <Text style={styles.switchOptionText}>FEMALE</Text>
                      </Col>
                    </Grid>
                  </Col>
                </Grid>
              </InputGroup>
              <InputGroup underline style={styles.inputGrp}>
                <Icon name="star" />
                <Input
                  placeholder="Occupation"
                  value={this.props.baseinfo.occupation}
                  onChange={target => this.changeValue('occupation', target.nativeEvent.text)}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </InputGroup>

            </View>
          </Content>
          <StepInfo text="BASIC INFO" active="1" />
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    submitBaseInfo: info => dispatch(setInfo(info)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, signupRoute) => dispatch(navigateTo(route, signupRoute)),
    changeValueMember: (page, fieldName, value) => dispatch(changeValueMember(page, fieldName, value)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  baseinfo: state.member.member.baseinfo,
});

export default connect(mapStateToProps, bindAction)(BaseInfo);
