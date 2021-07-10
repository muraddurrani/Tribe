import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import CreateProfile1 from '../../screens/Client/CreateProfileStack/CreateProfile1/index'
import CreateProfile2 from '../../screens/Client/CreateProfileStack/CreateProfile2/index'
import CreateProfile3 from '../../screens/Client/CreateProfileStack/CreateProfile3/index'
import IncompleteProfileScreen from '../../screens/Client/CreateProfileStack/IncompleteProfileScreen'
import HomeTab from './HomeTab'

const Stack = createStackNavigator()

function CreateProfileStack(routes) {
  return (
    <Stack.Navigator initialRouteName={routes.initialRouteName} screenOptions={{headerShown: false}}>
      <Stack.Screen name="CP1" component={CreateProfile1} />
      <Stack.Screen name="CP2" component={CreateProfile2} />
      <Stack.Screen name="CP3" component={CreateProfile3} />
      <Stack.Screen name="IncompleteProfile" component={IncompleteProfileScreen} />
      <Stack.Screen name="Home" component={HomeTab} />
    </Stack.Navigator>
  )
}

export default CreateProfileStack
