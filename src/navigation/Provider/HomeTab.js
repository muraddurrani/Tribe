import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import ProfileStack from './ProfileStack'
import SettingsStack from './SettingsStack'
import ChatStack from './ChatStack'
import MatchStack from './MatchStack'
import HomeScreen from '../../screens/Provider/HomeScreen/index'

import colours from '../../styles/colours'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName = "Home" screenOptions = {{headerShown: false}}
      tabBarOptions = {{showLabel: false, keyboardHidesTabBar: true, activeBackgroundColor: colours.gray3, inactiveBackgroundColor: colours.gray2}}
    >
      <Tab.Screen name = "Home" component = {HomeScreen} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'home' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "Match" component = {MatchStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'puzzle-outline' type = 'material-community' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "Chat" component = {ChatStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'message-square' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "Profile" component = {ProfileStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'user' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "Settings" component = {SettingsStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'settings' color = {colours.gray5}/>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default HomeTab