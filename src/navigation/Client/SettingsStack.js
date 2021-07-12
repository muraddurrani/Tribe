import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SettingsScreen from '../../screens/Client/SettingsStack/SettingsScreen/index'
import ChangePasswordScreen from '../../screens/Client/SettingsStack/ChangePasswordScreen/index'
import DeleteAccountScreen from '../../screens/Client/SettingsStack/DeleteAccountScreen/index'

const Stack = createStackNavigator()

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName = "Settings" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Settings" component = {SettingsScreen} />
      <Stack.Screen name = "ChangePassword" component = {ChangePasswordScreen} />
      <Stack.Screen name = "DeleteAccount" component = {DeleteAccountScreen} />
    </Stack.Navigator>
  )
}

export default SettingsStack
