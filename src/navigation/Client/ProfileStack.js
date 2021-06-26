import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../../screens/Client/ProfileStack/ProfileScreen/index'
import EditProfileScreen from '../../screens/Client/ProfileStack/EditProfileScreen/index'

const Stack = createStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName = "ProfileScreen" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} />
      <Stack.Screen name = "EditProfileScreen" component = {EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default SearchStack