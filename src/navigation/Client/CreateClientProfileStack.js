import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CreateProfile0 from '../../screens/Client/CCProfileStack/CreateProfile0/index'
import CreateProfile1 from '../../screens/Client/CCProfileStack/CreateProfile1/index'
import CreateProfile2 from '../../screens/Client/CCProfileStack/CreateProfile2/index'
import IncompleteProfileScreen from '../../screens/Client/CCProfileStack/IncompleteProfileScreen/index'
import ClientHomeTab from './ClientHomeTab'

const Stack = createStackNavigator()

function CCProfileStack(routes) {
  return (
      <Stack.Navigator initialRouteName = {routes.initialRouteName} screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "CP0" component = {CreateProfile0} />
        <Stack.Screen name = "CP1" component = {CreateProfile1} />
        <Stack.Screen name = "CP2" component = {CreateProfile2} />
        <Stack.Screen name = 'Home' component = {ClientHomeTab} />
        <Stack.Screen name = 'IncompleteProfile' component = {IncompleteProfileScreen} />
      </Stack.Navigator>
  )
}

export default CCProfileStack