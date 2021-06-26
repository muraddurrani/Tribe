import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatListScreen from '../../screens/Provider/MessagingStack/ChatListScreen/index'
import MessageScreen from '../../screens/Provider/MessagingStack/MessageScreen/index'

const Stack = createStackNavigator()

function MessagingStack() {
  return (
    <Stack.Navigator initialRouteName = "ChatList" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "ChatList" component = {ChatListScreen} />
      <Stack.Screen name = "Message" component = {MessageScreen} />
    </Stack.Navigator>
  )
}

export default MessagingStack
