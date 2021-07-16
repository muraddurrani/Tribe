import React, { useLayoutEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import ChatsScreen from '../../screens/Client/ChatStack/ChatsScreen/index'
import MessageScreen from '../../screens/Client/ChatStack/MessageScreen/index'

const Stack = createStackNavigator()

function ChatStack({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName && routeName != "Chats") {
      navigation.setOptions({tabBarVisible: false})
    } else {
      navigation.setOptions({tabBarVisible: true})
    }
  }, [navigation, route])
  
  return (
    <Stack.Navigator initialRouteName = "Chats" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Chats" component = {ChatsScreen} />
      <Stack.Screen name = "Message" component = {MessageScreen} />
    </Stack.Navigator>
  )
}

export default ChatStack
