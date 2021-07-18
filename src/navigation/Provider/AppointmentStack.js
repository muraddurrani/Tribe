import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import AppointmentsScreen from '../../screens/Provider/AppointmentStack/AppointmentsScreen/index'
import CreateApp1 from '../../screens/Provider/AppointmentStack/CreateApp1/index'
import CreateApp2 from '../../screens/Provider/AppointmentStack/CreateApp2/index'

const Stack = createStackNavigator()

function AppointmentStack({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Appointments") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName = "Appointments" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Appointments" component = {AppointmentsScreen} />
      <Stack.Screen name = "CA1" component = {CreateApp1} />
      <Stack.Screen name = "CA2" component = {CreateApp2} />
    </Stack.Navigator>
  )
}

export default AppointmentStack
