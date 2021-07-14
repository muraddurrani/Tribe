import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import ProfileStack from './ProfileStack'
import SettingsStack from './SettingsStack'
import ChatStack from './ChatStack'

import colours from '../../styles/colours'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName = "Profile" screenOptions = {{headerShown: false}}
      tabBarOptions = {{showLabel: false, keyboardHidesTabBar: true, activeBackgroundColor: colours.gray3, inactiveBackgroundColor: colours.gray2}}
    >
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