import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform ,Switch,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, Icon, Item, Input, Header, Left, Right, Body } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';

const primary = require('../../themes/variable').brandPrimary;

class Lesion extends Component {

  static propTypes = {
    lesion: React.PropTypes.object,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount(){
    console.log("lesion.js.componentWillMount: lesion = ",this.props.lesion);
  }

  renderPhotos(){
      var rows = [];
      var row = [];
      this.props.lesion.resource.forEach((res,index)=>{
        row.push(res)
        if(row.length == 2){
          rows.push(row);
          row = []
        }
      })

      if(row.length > 0){
        rows.push(row);
        row = []
      }

      return rows.map((row,rowIndex)=>{
        return (
          <Row key={rowIndex}>
            {
              row.map((item,itemIndex)=>{
                return (
                  <Col key ={itemIndex}>
                    <TouchableOpacity >
                      <Image source={{uri:item}} style={styles.channelImg}>
                      </Image>
                    </TouchableOpacity>
                  </Col>
                )
              })
            }
          </Row>
        )
      })
  }

  //<Image source={{ uri: this.props.lesion.lesion }} style={styles.bodyImg}/>

  render() {
    return (
      <Container>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <Grid>
              {
                this.renderPhotos()
              }
            </Grid>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps)(Lesion);


/*
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
            value={this.props.lesion.isGrowing}
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
            value={this.props.lesion.isShapeOrChangeColor}
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
            value={this.props.lesion.isItchyOrBleeding}
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
            value={this.props.lesion.isTenderOrPainful}
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
            value={this.props.lesion.doesItComeAndGo}
          />
        </Col>
        <Col style={styles.colwrap}>
          <Text style={styles.yn}>NO</Text>
        </Col>
      </Grid>
    </Col>
  </Grid>
</View>
*/
