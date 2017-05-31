

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

import {setCurrentLesion,removePhotoFromLesion,addAnotherLesion} from '../../actions/request'
import Lesion from './lesion';
import CustomTabBar from './CustomTabBar';

const bg = require('../../../images/BG.png');
const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;

const {
  reset,
  popRoute,
} = actions;

class Summary extends Component {
  static defaultProps = {
    readOnly: true,
  }
  static propTypes = {
    item: React.PropTypes.object,
    readOnly: React.PropTypes.bool,
    reset: React.PropTypes.func,
    createRequest: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setCurrentLesion: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.sendToRedimed = this.sendToRedimed.bind(this);
    this.cancel = this.cancel.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    //this.goToPage = this.goToPage.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  goToPage(page){
    console.log("will go to page = ",page," props = ",this.props);
    const { navigation } = this.props;
    const index = _.findIndex(navigation.routes, { key: page });
    for (let i = index; i < navigation.routes.length - 1; i++) {
      this.popRoute();
    }
  }

  onLesionChange(tab){
    console.log("Summary.js:onLesionChange.tabIndex = ",tab);
    if(tab.i < this.props.items.length){
      console.log("set lesion......");
      this.props.setCurrentLesion(tab.i);
    }else{
      console.log("new lesion.....");
      const { item } = this.props;
      this.props.addNew({ ...item}).then(() => {
        this.goToPage('takepicture');
      }).catch(err => window.alert(err));
    }

  }
  removePhoto(item){
    console.log("will remove the photo:",item);
    this.props.removePhotoFromLesion(item.lesionId,item.resourceIndex);

  }
  sendToRedimed() {
    const { createRequest, items, reset, navigation } = this.props;
    createRequest(items).then(() => {
      reset(navigation.key);
    }).catch(e => console.log(e));
  }
  cancel(){
    const { navigation } = this.props;
    const index = _.findIndex(navigation.routes, { key: 'home' });
    for (let i = index; i < navigation.routes.length - 1; i++) {
      this.popRoute();
    }
  }
  render() {
    var lesions = [
      {
        name: "Lesion 1"
      },
      {
        name: "Lesion 2"
      }
    ];

    const { item } = this.props;
    const { resource } = item;
    const resources = resource && resource.map((x, y) => (
      <View style={styles.slide} key={y}>
        <Image style={styles.newsPoster} source={{ uri: x }} />
      </View>
    ));

    //renderTabBar={() => <CustomTabBar someProp={'here'} />}
    /*
    <Left>
      <Button transparent onPress={() => this.popRoute()}>
        <Icon active name="arrow-back" />
      </Button>
    </Left>

    <Right>
      <Button transparent >
        <Icon active name="arrow-forward" />
      </Button>
    </Right>
    */
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content showsVerticalScrollIndicator={false}>
            <Header style={styles.header} >
              <Body>
                <Text style={styles.textheader}>SUMMARY</Text>
              </Body>
            </Header>
            <View>
              <ScrollableTabView style={styles.tabView} onChangeTab={this.onLesionChange.bind(this)}  >
                {
                  this.props.items.map((item,index)=>{
                    return <Lesion key={index} tabLabel={"Lesion "+ (index+1)} lesion = {item} removePhoto={this.removePhoto} goToPage={this.goToPage.bind(this)}/>
                  })
                }
                <Container tabLabel="+"/>
              </ScrollableTabView>
            </View>
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
                  onPress={this.sendToRedimed}
                  style={styles.CancelAndSubmitBtn}
                >
                  <Text style={styles.CancelAndSubmitText}>Submit</Text>
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
    reset: (key, route) => dispatch(reset([{ key: 'home' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
    setCurrentLesion: lesionId => dispatch(setCurrentLesion(lesionId)),
    removePhotoFromLesion: (lesionId,resourceIndex) => dispatch(removePhotoFromLesion(lesionId,resourceIndex))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  item: state.request.item,
  items: state.request.items,
});

export default connect(mapStateToProps, bindAction)(Summary);



/*

<View style={styles.wrapper}>
  <Swiper
    height={130}
    width={(deviceWidth + 5) * resource.length}
    loop
    dot={<View style={styles.swiperDot} />}
    activeDot={<View
      style={styles.swiperActiveDot}
      showsButtons
    />}
  >
    {resources}
  </Swiper>
</View>



<View style={styles.textContainer}>
  <Text style={styles.textheader}>SUMMARY</Text>
</View>
{this.props.createRequest &&

}


*/
