import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform ,Switch,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, Item, Input, Header, Left, Right, Body } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const primary = require('../../themes/variable').brandPrimary;

class Lesion extends Component {

  static propTypes = {
    goToPage: React.PropTypes.func,
    removePhoto: React.PropTypes.func,
    lesion: React.PropTypes.object,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  goToPage(page){
    this.props.goToPage(page);
  }

  componentWillMount(){
    console.log("lesion.js.componentWillMount: lesion = ",this.props.lesion);
  }

  renderPhotos(){
      var rows = [];
      var row = [];
      this.props.lesion.resource.forEach((res,index)=>{
        row.push({uri:res,resourceIndex:index,lesionId:this.props.lesion.lesionId})
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
                      <Image source={{uri:item.uri}} style={styles.channelImg}>
                        <View style={styles.swiperTextContent}>
                          <TouchableOpacity style={styles.newsPosterTypeView} onPress={() => this.props.removePhoto(item)}>
                            <Icon active  name="delete" style={{ fontSize: 30, width: 30, color: '#FFF' }}/>
                          </TouchableOpacity>
                        </View>
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
          <View style={styles.contentIconsContainer}>
            <Grid>
              <Col>
                <Button transparent style={styles.roundedButton} onPress={this.goToPage.bind(this,'takepicture')}>
                  <Icon name="add-a-photo" style={{ fontSize: 30, width: 30, color: '#FFF' }} />
                </Button>
              </Col>
              <Col>
                <Button transparent style={styles.roundedCustomButton} onPress={this.goToPage.bind(this,'selectlesion')}>
                  <Icon name="person" style={{ fontSize: 30,width:30 }} />
                </Button>
              </Col>
              <Col>
                <Button transparent style={styles.roundedButton} onPress={this.goToPage.bind(this,'questionaire')}>
                  <Icon name="question-answer" style={{ fontSize: 28, width: 30, color: '#FFF' }} />
                </Button>
              </Col>
            </Grid>
          </View>
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
