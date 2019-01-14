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

  import Colors from '../../constants/Colors';

  import { Icon } from 'expo';

  import firebase from 'firebase'
  import { db } from '../../Firebase'

  import Rooms from "../../containers/SubscribedRoomsList"
  import AddRoom from "../../containers/AddRoom"

export default class RoomsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={ () => navigation.navigate('AddJob')}>
          <Icon.Ionicons
          name={'ios-add'}
          size={26}
          style={{ marginRight: 10 }}
          color={Colors.tabIconSelected}
        />
        </TouchableOpacity>
      ),
    }
    
  };
  constructor(props) {
    super(props)
    this.state = {
      rooms: []
    }
  }

  componentDidMount() {

    var self = this
    var uid = firebase.auth().currentUser.uid
    db.collection('rooms').where(`members.${uid}`, '==', true)
    .onSnapshot(function(querySnapshot) {
        var rooms = [];
        querySnapshot.forEach(function(doc) {
          console.log(doc.id)
          var room = {
            key: doc.id,
            ...doc.data()
          }
            rooms.push(room);
        });
        self.setState({
          rooms: rooms
        })
    });

    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error:null,
        })
        var setDoc = db.collection('users').doc(uid).update({
          location: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 0}
    )

    
  }

  _setContent() {
    Clipboard.setString('hello world');
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={styles.container}>
    {/* <FlatList
      data={this.state.rooms}
      renderItem={({item}) => <Button title={item.name} onPress={() => this.props.navigation.navigate('RoomMap', { room: item })} style={styles.item}></Button>}
    /> */}
    <Rooms></Rooms>
    <Button title="Join a room" onPress={() => this.props.navigation.navigate('JoinRoom')}></Button>
  </View>
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

