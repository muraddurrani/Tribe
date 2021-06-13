import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../../screens/Provider/ProviderHomeTab/ProfileScreen/index'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName = "Profile" screenOptions = {{headerShown: false}} tabBarOptions = {{showLabel: false}}>
      <Tab.Screen name = "Profile" component = {ProfileScreen} options = {{
        tabBarIcon: ({focused}) => (
          <Icon name = 'user' color = 'gray'/>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default HomeTab
