import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import ProfileStack from './ProfileStack'
import SearchStack from './SearchStack'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName = "Profile" screenOptions = {{headerShown: false}} tabBarOptions = {{showLabel: false}}>
      <Tab.Screen name = "Profile" component = {ProfileStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'user' color = 'gray'/>
        )
      }}/>
      <Tab.Screen name = "Search" component = {SearchStack} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'search' color = 'gray'/>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default HomeTab
