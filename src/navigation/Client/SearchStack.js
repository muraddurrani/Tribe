import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Search0 from '../../screens/Client/SearchStack/Search0/index'
import Search1 from '../../screens/Client/SearchStack/Search1/index'
import Search2 from '../../screens/Client/SearchStack/Search2/index'
import Search3 from '../../screens/Client/SearchStack/Search3/index'
import Search4 from '../../screens/Client/SearchStack/Search4/index'
import Search5 from '../../screens/Client/SearchStack/Search5/index'
import LoadingScreen from '../../screens/Client/SearchStack/LoadingScreen/index'
import SearchResult from '../../screens/Client/SearchStack/SearchResult/index'

const Stack = createStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName = "Search0" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Search0" component = {Search0} />
      <Stack.Screen name = "Search1" component = {Search1} />
      <Stack.Screen name = "Search2" component = {Search2} />
      <Stack.Screen name = "Search3" component = {Search3} />
      <Stack.Screen name = "Search4" component = {Search4} />
      <Stack.Screen name = "Search5" component = {Search5} />
      <Stack.Screen name = "Loading" component = {LoadingScreen} />
      <Stack.Screen name = "SearchResult" component = {SearchResult} />
    </Stack.Navigator>
  )
}

export default SearchStack
