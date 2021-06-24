import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CreateProfile1 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile1/index'
import CreateProfile2 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile2/index'
import CreateProfile3 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile3/index'
import CreateProfile4 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile4/index'
import CreateProfile5 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile5/index'
import CreateProfile6 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile6/index'
import CreateProfile7 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile7/index'
import CreateProfile8 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile8/index'
import CreateProfile9 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile9/index'
import CreateProfile10 from '../../screens/Provider/CreateProviderProfileStack/CreateProfile10/index'
import IncompleteProfileScreen from '../../screens/Provider/CreateProviderProfileStack/IncompleteProfileScreen/index'
import ProviderHomeTab from './ProviderHomeTab'

const Stack = createStackNavigator()

function CreateProviderProfileStack(routes) {
  return (
      <Stack.Navigator initialRouteName = {routes.initialRouteName} screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "CP1" component = {CreateProfile1} />
        <Stack.Screen name = "CP2" component = {CreateProfile2} />
        <Stack.Screen name = "CP3" component = {CreateProfile3} />
        <Stack.Screen name = "CP4" component = {CreateProfile4} />
        <Stack.Screen name = "CP5" component = {CreateProfile5} />
        <Stack.Screen name = "CP6" component = {CreateProfile6} />
        <Stack.Screen name = "CP7" component = {CreateProfile7} />
        <Stack.Screen name = "CP8" component = {CreateProfile8} />
        <Stack.Screen name = "CP9" component = {CreateProfile9} />
        <Stack.Screen name = "CP10" component = {CreateProfile10} />
        <Stack.Screen name = 'IncompleteProfile' component = {IncompleteProfileScreen} />
        <Stack.Screen name = 'Home' component = {ProviderHomeTab} />
      </Stack.Navigator>
  )
}

export default CreateProviderProfileStack
