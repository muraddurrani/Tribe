import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../../screens/Provider/ProfileStack/ProfileScreen/index'

const Stack = createStackNavigator()

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName = "ProfileScreen" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack
