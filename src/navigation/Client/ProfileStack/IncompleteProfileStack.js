import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../../../screens/Client/ProfileStack/IncompleteProfileStack/ProfileScreen/index'
import CreateProfile0 from '../../../screens/Client/CCProfileStack/CreateProfile0/index'
import CreateProfile1 from '../../../screens/Client/CCProfileStack/CreateProfile1/index'
import CreateProfile2 from '../../../screens/Client/CCProfileStack/CreateProfile2/index'
import CompleteProfileStack from './CompleteProfileStack'

const Stack = createStackNavigator()

function IncompleteProfileStack() {
  return (
    <Stack.Navigator initialRouteName = "ProfileScreen" screenOptions = {{headerShown: false}}>
    <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} />
    <Stack.Screen name = "CP0" component = {CreateProfile0} />
    <Stack.Screen name = "CP1" component = {CreateProfile1} />
    <Stack.Screen name = "CP2" component = {CreateProfile2} />
    <Stack.Screen name = "CompleteProfile" component = {CompleteProfileStack} />
  </Stack.Navigator>
  )
}

export default IncompleteProfileStack
