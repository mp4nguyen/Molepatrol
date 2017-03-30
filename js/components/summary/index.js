

import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Left, Right, Body } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Swiper from 'react-native-swiper';
import HeaderContent from '../headerContent';
import { Grid, Col } from 'react-native-easy-grid';
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
  sendToRedimed() {
    const { createRequest, items, reset, navigation } = this.props;
    createRequest(items).then(() => {
      reset(navigation.key);
    })
      .catch(e => console.log(e));
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
          <Content scrollEnabled={false}>
            <HeaderContent />

            <View style={styles.wrapper}>
              <Swiper
                height={130}
                width={deviceWidth + resource.length}
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
              <Text style={styles.textheader}>
                SUMMARY
                                </Text>
            </View>
            <View style={styles.container}>
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
                        disabled
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isGrowing}
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
                        disabled
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isShapeOrChangeColor}
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
                        disabled
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isItchyOrBleeding}
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
                        disabled
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.isTenderOrPainful}
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
                        disabled
                        onTintColor={primary}
                        style={styles.switch}
                        thumbTintColor="#ccc"
                        tintColor="#aaa"
                        value={item.doesItComeAndGo}
                      />
                    </Col>
                    <Col style={styles.colwrap}>
                      <Text style={styles.yn}>NO</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </View>
            {this.props.createRequest &&
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
            }
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
