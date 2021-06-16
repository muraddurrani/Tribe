import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../../../screens/Provider/ProfileStack/IncompleteProfileStack/ProfileScreen/index'
import CreateProfile0 from '../../../screens/Provider/CPProfileStack/CreateProfile0/index'
import CreateProfile1 from '../../../screens/Provider/CPProfileStack/CreateProfile1/index'
import CreateProfile2 from '../../../screens/Provider/CPProfileStack/CreateProfile2/index'
import CreateProfile3 from '../../../screens/Provider/CPProfileStack/CreateProfile3/index'
import CreateProfile4 from '../../../screens/Provider/CPProfileStack/CreateProfile4/index'
import CreateProfile5 from '../../../screens/Provider/CPProfileStack/CreateProfile5/index'
import CreateProfile6 from '../../../screens/Provider/CPProfileStack/CreateProfile6/index'
import CreateProfile7 from '../../../screens/Provider/CPProfileStack/CreateProfile7/index'
import CreateProfile8 from '../../../screens/Provider/CPProfileStack/CreateProfile8/index'
import CreateProfile9 from '../../../screens/Provider/CPProfileStack/CreateProfile9/index'
import CompleteProfileStack from './CompleteProfileStack'

const Stack = createStackNavigator()

function IncompleteProfileStack() {
  return (
    <Stack.Navigator initialRouteName = "ProfileScreen" screenOptions = {{headerShown: false}}>
    <Stack.Screen name = "ProfileScreen" component = {ProfileScreen} />
    <Stack.Screen name = "CP0" component = {CreateProfile0} />
    <Stack.Screen name = "CP1" component = {CreateProfile1} />
    <Stack.Screen name = "CP2" component = {CreateProfile2} />
    <Stack.Screen name = "CP3" component = {CreateProfile3} />
    <Stack.Screen name = "CP4" component = {CreateProfile4} />
    <Stack.Screen name = "CP5" component = {CreateProfile5} />
    <Stack.Screen name = "CP6" component = {CreateProfile6} />
    <Stack.Screen name = "CP7" component = {CreateProfile7} />
    <Stack.Screen name = "CP8" component = {CreateProfile8} />
    <Stack.Screen name = "CP9" component = {CreateProfile9} />
    <Stack.Screen name = "CompleteProfile" component = {CompleteProfileStack} />
  </Stack.Navigator>
  )
}

export default IncompleteProfileStack
