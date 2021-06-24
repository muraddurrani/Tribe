import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import ProfileStack from './ProfileStack'
import MatchStack from './MatchStack'
import MessagingStack from './MessagingStack'

import colours from '../../styles/colours'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName = "Profile" screenOptions = {{headerShown: false}}
      tabBarOptions = {{showLabel: false, keyboardHidesTabBar: true, activeBackgroundColor: colours.gray2, inactiveBackgroundColor: colours.gray1}}
    >
      <Tab.Screen name = "Messaging" component = {MessagingStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'message-square' color = {colours.gray5}/>
        )
      }}/>
      <Tab.Screen name = "PendingMatches" component = {MatchStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'handshake-o' color = {colours.gray5} type = 'font-awesome'/>
        )
      }}/>
      <Tab.Screen name = "Profile" component = {ProfileStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'user' color = {colours.gray5}/>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default HomeTab
