import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import ProfileStack from './ProfileStack'
import SettingsStack from './SettingsStack'
import SearchStack from './SearchStack'
import ChatStack from './ChatStack'
import AppointmentStack from './AppointmentStack'
import HomeScreen from '../../screens/Client/HomeScreen/index'

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
      <Tab.Screen name = "Search" component = {SearchStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'search' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "Appointment" component = {AppointmentStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'calendar' color = {colours.gray5}/>
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