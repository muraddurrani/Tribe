import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MatchesScreen from '../../screens/Provider/MatchStack/MatchesScreen/index'
import MatchDetailsScreen from '../../screens/Provider/MatchStack/MatchDetailsScreen/index'

const Stack = createStackNavigator()

function MatchStack() {
  return (
    <Stack.Navigator initialRouteName = "Matches" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Matches" component = {MatchesScreen} />
      <Stack.Screen name = "MatchDetails" component = {MatchDetailsScreen} />
    </Stack.Navigator>
  )
}

export default MatchStack
