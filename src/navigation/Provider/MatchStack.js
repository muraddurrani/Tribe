import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import MatchesScreen from '../../screens/Provider/MatchStack/MatchesScreen/index'
import MatchDetailsScreen from '../../screens/Provider/MatchStack/MatchDetailsScreen/index'

const Stack = createStackNavigator()

function MatchStack({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Matches") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName = "Matches" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Matches" component = {MatchesScreen} />
      <Stack.Screen name = "MatchDetails" component = {MatchDetailsScreen} />
    </Stack.Navigator>
  )
}

export default MatchStack
