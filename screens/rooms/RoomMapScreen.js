import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList
  } from 'react-native';

  import { MapView } from 'expo';
    import { Marker } from 'react-native-maps';
  import Colors from '../../constants/Colors';

  import { Icon } from 'expo';

  import firebase from 'firebase'
  import { db } from '../../Firebase'

export default class RoomScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          room: "test",
          users: []
        }
      }

  static navigationOptions = ({navigation}) => {
    return {headerMode: 'none'}

  };
  

  componentDidMount() {
    var self = this;
    // Grabs the params from the navigation and adds it to the local state
    const room = this.props.navigation.getParam('room', null)
    this.setState({room: room})

    if(this.state.room) {
        db.collection('users').where(`rooms.${room.id}`, '==', true)
        .onSnapshot(function(querySnapshot) {
            var users = [];
            querySnapshot.forEach(function(doc) {
                // console.log(doc)
              var user = {
                key: doc.id,
                ...doc.data()
              }
                users.push(user);
            });
            self.setState({
              users: users
            })
        });  
    }
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: -36.84934523891363,
      longitude: 174.78313883782803,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    {this.state.users.map(user => {
        return <Marker
        key={user.id}
        title={user.name}
        description={'A description'}
        coordinate={
          {
          latitude: user.location.latitude,
          longitude: user.location.longitude
        }
        }
      >
        <Image
          style={{borderRadius: 25, height:50, width:50, borderColor:'#fff', borderWidth:2}}
          source={{uri: user.profile_picture}}
        />
      </Marker>
  
    })}
    </MapView>
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

