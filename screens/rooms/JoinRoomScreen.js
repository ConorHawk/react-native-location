import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button
  } from 'react-native';

import { db } from '../../Firebase'
import firebase from 'firebase'
  
export default class JoinJobScreen extends React.Component {
  static navigationOptions = {
    title: 'Join a room',
  };

  constructor(props) {
    super(props)
    this.state = {
        roomId: '',
        error: null
    }

  }

  joinRoom = () => {
    // Add a new document with a generated id.
    
    var self = this
    var uid = firebase.auth().currentUser.uid
    db.collection("rooms").doc(this.state.roomId).update({
        [`members.${uid}`]: true
    })
    .then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    //   self.props.navigation.navigate('Rooms')
        self.addRoomToUser(uid)
    })
    .catch(function(error) {
        console.log(error)
        // alert('Please enter a valid room id')
    });
  }

  addRoomToUser = (uid) => {
    var self = this
    console.log(uid)
    db.collection("users").doc(uid).update({
        [`rooms.${self.state.roomId}`]: true
    })
    .then(function(docRef) {
        self.props.navigation.navigate('Rooms')
    })
    .catch(function(error) {
        console.log(error)
        // alert('Please enter a valid room id')
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                placeholder="Enter room id"
                style={styles.textInput}
                onChangeText={(text) => this.setState({roomId: text})}
                value={this.state.roomId}
              />
              <Button
                disabled={!this.state.roomId}
                onPress={this.joinRoom}
                title="Join"
              />
              {this.state.error && <Text>{this.state.error}</Text>}
            </View>
    
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })
