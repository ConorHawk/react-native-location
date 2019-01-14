import React from 'react';
import {
    View,
  } from 'react-native';

import { db } from '../../Firebase'
import firebase from 'firebase'

import AddRoom from "../../containers/AddRoom"
  
export default class AddJobScreen extends React.Component {
  static navigationOptions = {
    title: 'Make a room',
  };

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

  }

  createRoom = () => {
    // Add a new document with a generated id.
    
    var self = this
    var uid = firebase.auth().currentUser.uid
    db.collection("rooms").add({
      name: self.state.name,
      owner: uid,
      members: {
        [uid]: true
      }
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      self.props.navigation.navigate('Rooms')
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <AddRoom></AddRoom>
            </View>
    
  }
}
