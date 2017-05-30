

import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Swiper from 'react-native-swiper';
import HeaderContent from '../headerContent';
import { Grid, Col } from 'react-native-easy-grid';

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
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.sendToRedimed = this.sendToRedimed.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  onLesionChange(tabIndex){
    console.log("Summary.js:onLesionChange.tabIndex = ",tabIndex);
  }
  sendToRedimed() {
    const { createRequest, items, reset, navigation } = this.props;
    createRequest(items).then(() => {
      reset(navigation.key);
    }).catch(e => console.log(e));
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
    return (
      <Container>
        <Image source={bg} style={styles.background} >
          <Content showsVerticalScrollIndicator={false}>
            <Header style={styles.header} >
              <Left>
                <Button transparent onPress={() => this.popRoute()}>
                  <Icon active name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Text style={styles.textheader}>SUMMARY</Text>
              </Body>
              <Right>
                <Button transparent >
                  <Icon active name="arrow-forward" />
                </Button>
              </Right>
            </Header>
            <View>
              <ScrollableTabView style={styles.tabView} onChangeTab={this.onLesionChange.bind(this)}>
                {
                  this.props.items.map((item,index)=>{
                    return <Lesion key={index} tabLabel={"Lesion "+ index} lesion = {item}/>
                  })
                }
              </ScrollableTabView>
            </View>
            <View style={styles.container}>
              <Button
                rounded dark block large
                onPress={this.sendToRedimed}
                style={styles.otherBtn}
              >
                <Text style={styles.otherText}>
                  Send to REDIMED</Text>
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
    reset: (key, route) => dispatch(reset([{ key: 'home' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
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
