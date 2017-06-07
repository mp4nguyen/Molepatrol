

import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actions } from 'react-native-navigation-redux-helpers';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Swiper from 'react-native-swiper';
import HeaderContent from '../headerContent';
import { Grid, Col } from 'react-native-easy-grid';

import {setCurrentLesion,removePhotoFromLesion,addAnotherLesion,setLesion,submitRequest} from '../../actions/request';
import {setNextPageForAll,goToPage,resetSetPage} from '../../actions/nextPage';
import {setQuestionareProps,setSelectLesionProps,setTakePictureProps} from '../../actions/pageControl';

import Lesion from './lesion';
import CustomTabBar from './CustomTabBar';

import {bg,logo} from '../../libs/images';
const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;

const {
  reset,
  popRoute,
  pushRoute
} = actions;

class Summary extends Component {
  static defaultProps = {
    readOnly: true,
  }
  static propTypes = {
    item: React.PropTypes.object,
    readOnly: React.PropTypes.bool,
    reset: React.PropTypes.func,
    submitRequest: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    goToPage: React.PropTypes.func,
    resetSetPage: React.PropTypes.func,
    setCurrentLesion: React.PropTypes.func,
    setNextPageForAll: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.backMyRequest = this.backMyRequest.bind(this);

    //this.goToPage = this.goToPage.bind(this);
  }

  componentWillMount(){
    this.props.setLesion();
    this.props.setNextPageForAll();
    this.props.setQuestionareProps('isBack',false);
    this.props.setSelectLesionProps('isBack',false);
    this.props.setTakePictureProps('isCancel',true);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  onLesionChange(tab){
    if(tab.i < this.props.items.length){
      //console.log("set lesion......");
      this.props.setCurrentLesion(tab.i);
    }else{
      //console.log("new lesion.....");
      const { item,resetSetPage } = this.props;
      resetSetPage();
      this.props.addNew({ ...item}).then(() => {
        this.props.goToPage('takepicture');
      }).catch(err => window.alert(err));
    }

  }
  removePhoto(item){
    //console.log("will remove the photo:",item);
    this.props.removePhotoFromLesion(item.lesionId,item.resourceIndex);

  }
  submit() {
    const { submitRequest, items, reset, navigation } = this.props;
    submitRequest(items).then(() => {
      this.props.goToPage('home');
      //reset(navigation.key);
    }).catch(e => console.log(e));
  }
  cancel(){
    this.props.goToPage(this.props.nextPage)
  }
  backMyRequest(){
    this.props.goToPage(this.props.nextPage)
  }
  renderHeaders(){
    return(
      <View>
        <ScrollableTabView style={styles.tabView} onChangeTab={this.onLesionChange.bind(this)}  renderTabBar={() => <CustomTabBar someProp={'here'} />}>
          {
            this.props.items.map((item,index)=>{
              return <Lesion key={index} tabLabel={"Lesion "+ (index+1)} lesion = {item} removePhoto={this.removePhoto} goToPage={this.props.goToPage.bind(this)}/>
            })
          }
          {
            this.props.pageControl.isNew&&<Container tabLabel="+"/>
          }
        </ScrollableTabView>
      </View>
    )
  }
  renderButtons(){
    if(this.props.pageControl.isNew){
      return(
        <View style={styles.buttonsContainer}>
          <Left style={{ marginRight: 5 }}>
            <Button
              rounded dark block large
              onPress={this.cancel}
              style={styles.CancelAndSubmitBtn}
            >
              <Text style={styles.CancelAndSubmitText}>Cancel</Text>
            </Button>
          </Left>
          <Right style={{ marginLeft: 5 }}>
            <Button
              rounded dark block large
              onPress={this.submit}
              style={styles.CancelAndSubmitBtn}
            >
              <Text style={styles.CancelAndSubmitText}>Submit</Text>
            </Button>
          </Right>
        </View>
      )
    }else{
      return(
        <View style={styles.buttonsContainer}>
          <Body style={{ marginRight: 5 }}>
            <Button
              rounded dark block large
              onPress={this.backMyRequest}
              style={styles.CancelAndSubmitBtn}
            >
              <Text style={styles.CancelAndSubmitText}>Back</Text>
            </Button>
          </Body>
        </View>
      )
    }


  }
  render() {

    const { item } = this.props;
    const { resource } = item;
    const resources = resource && resource.map((x, y) => (
      <View style={styles.slide} key={y}>
        <Image style={styles.newsPoster} source={{ uri: x }} />
      </View>
    ));

    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content showsVerticalScrollIndicator={false}>
            <Header style={styles.header} >
              <Body>
                <Text style={styles.textheader}>SUMMARY</Text>
              </Body>
            </Header>
            {
              this.renderHeaders()
            }
            {
              this.renderButtons()
            }
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    addNew: lesion => dispatch(addAnotherLesion(lesion)),
    reset: (key, route) => dispatch(reset([{ key: 'home' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setCurrentLesion: lesionId => dispatch(setCurrentLesion(lesionId)),
    removePhotoFromLesion: (lesionId,resourceIndex) => dispatch(removePhotoFromLesion(lesionId,resourceIndex)),
    setNextPageForAll: () => dispatch(setNextPageForAll('requestsummary')),
    goToPage: (page) => dispatch(goToPage(page)),
    resetSetPage: () => dispatch(resetSetPage()),
    setLesion: () => dispatch(setLesion()),
    submitRequest: (items) => dispatch(submitRequest(items)),
    setQuestionareProps: (propName,propValue) => dispatch(setQuestionareProps({propName,propValue})),
    setSelectLesionProps: (propName,propValue) => dispatch(setSelectLesionProps({propName,propValue})),
    setTakePictureProps: (propName,propValue) => dispatch(setTakePictureProps({propName,propValue})),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  item: state.request.item,
  items: state.request.items,
  nextPage: state.nextPage.summary,
  pageControl: state.pageControl.summary
});

export default connect(mapStateToProps, bindAction)(Summary);
