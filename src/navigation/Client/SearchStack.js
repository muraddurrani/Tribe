import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import Search1 from '../../screens/Client/SearchStack/Search1/index'
import Search2 from '../../screens/Client/SearchStack/Search2/index'
import Search3 from '../../screens/Client/SearchStack/Search3/index'
import Search4 from '../../screens/Client/SearchStack/Search4/index'
import Search5 from '../../screens/Client/SearchStack/Search5/index'
import Search6 from '../../screens/Client/SearchStack/Search6/index'
import Search7 from '../../screens/Client/SearchStack/Search7/index'
import GenerateResults from '../../screens/Client/SearchStack/GenerateResults/index'
import DisplayResults from '../../screens/Client/SearchStack/DisplayResults/index'

const Stack = createStackNavigator()

function SearchStack({navigation, route}) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Search1") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])

  return (
    <Stack.Navigator initialRouteName = "Search1" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Search1" component = {Search1} />
      <Stack.Screen name = "Search2" component = {Search2} />
      <Stack.Screen name = "Search3" component = {Search3} />
      <Stack.Screen name = "Search4" component = {Search4} />
      <Stack.Screen name = "Search5" component = {Search5} />
      <Stack.Screen name = "Search6" component = {Search6} />
      <Stack.Screen name = "Search7" component = {Search7} />
      <Stack.Screen name = "GenerateResults" component = {GenerateResults} />
      <Stack.Screen name = "DisplayResults" component = {DisplayResults} />
    </Stack.Navigator>
  )
}

export default SearchStack