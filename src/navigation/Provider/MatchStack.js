import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PendingMatchesScreen from '../../screens/Provider/MatchStack/PendingMatchesScreen/index'
import ViewProfileScreen from '../../screens/Provider/MatchStack/ViewProfileScreen/index'

const Stack = createStackNavigator()

function MatchStack() {
  return (
    <Stack.Navigator initialRouteName = "PendingMatches" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "PendingMatches" component = {PendingMatchesScreen} />
      <Stack.Screen name = "ViewProfile" component = {ViewProfileScreen} />
    </Stack.Navigator>
  )
}

export default MatchStack
