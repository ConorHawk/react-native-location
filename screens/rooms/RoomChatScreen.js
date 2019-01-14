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

export default class RoomChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
      }
      
  componentDidMount() {
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View>
        <Text>Chat goes here</Text>
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

