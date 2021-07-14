import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ChatsScreen from '../../screens/Client/ChatStack/ChatsScreen/index'
import MessageScreen from '../../screens/Client/ChatStack/MessageScreen/index'

const Stack = createStackNavigator()

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName = "Chats" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Chats" component = {ChatsScreen} />
      <Stack.Screen name = "Message" component = {MessageScreen} />
    </Stack.Navigator>
  )
}

export default ChatStack
