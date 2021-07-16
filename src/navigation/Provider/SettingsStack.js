import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SettingsScreen from '../../screens/Provider/SettingsStack/SettingsScreen/index'
import ChangePasswordScreen from '../../screens/Provider/SettingsStack/ChangePasswordScreen/index'
import DeleteAccountScreen from '../../screens/Provider/SettingsStack/DeleteAccountScreen/index'

const Stack = createStackNavigator()

function SettingsStack({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Settings") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName = "Settings" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Settings" component = {SettingsScreen} />
      <Stack.Screen name = "ChangePassword" component = {ChangePasswordScreen} />
      <Stack.Screen name = "DeleteAccount" component = {DeleteAccountScreen} />
    </Stack.Navigator>
  )
}

export default SettingsStack
