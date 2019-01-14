import React from 'react';
import firebase from 'firebase'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems, SafeAreaView,
  withNavigation
} from 'react-navigation';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RoomsScreen from '../screens/rooms/RoomsScreen'
import RoomTabNavigator from './RoomTabNavigator';

import LoginScreen from '../screens/auth/Login'
import SignUpScreen from '../screens/auth/SignUp'
import AuthLoading from '../screens/auth/AuthLoading'

import AddRoomScreen from '../screens/rooms/AddRoomScreen'
import JoinRoomScreen from '../screens/rooms/JoinRoomScreen'

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Button onPress={()=> alert('Settings to come')} title="Settings"></Button>
      <Button onPress={
        () => firebase.auth().signOut().then(() => props.navigation.navigate('Main'))
      } title="Logout"></Button>
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



const RoomsNavigator = createStackNavigator({
  Rooms: {
    screen: RoomsScreen,
    navigationOptions: () => ({
      title: `Rooms`,
      headerBackTitle: null
    }),
  },
  Room: {
    screen:RoomTabNavigator,
    navigationOptions: ({navigation}) => ({
      title: `Rooms`,
    }),
  },
  AddJob: AddRoomScreen,
  JoinRoom: JoinRoomScreen
}
,{
}
)

const MainStack = createDrawerNavigator({
  Rooms: RoomsNavigator
},
{
  contentComponent: withNavigation(CustomDrawerContentComponent)
})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainStack,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  AuthLoading
}, {
  initialRouteName: "AuthLoading"
}));