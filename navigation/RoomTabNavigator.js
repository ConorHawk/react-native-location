import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import RoomMapScreen from '../screens/rooms/RoomMapScreen'
import RoomChatScreen from '../screens/rooms/RoomChatScreen'

const MapStack = createStackNavigator({
  RoomMap: RoomMapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Locate',
  headerMode: 'none',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
  RoomChat: RoomChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  headerMode: 'none',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  MapStack,
  ChatStack
});
