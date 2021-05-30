import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ParticularsScreen from '../../screens/Client/ProfileStack/ParticularsScreen'
import ServiceCategoryScreen from '../../screens/Client/ProfileStack/ServiceCategoryScreen'
import HomeTab from '../../navigation/Client/HomeTab'

const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName = "Particulars" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Particulars" component = {ParticularsScreen} />
      <Stack.Screen name = "ServiceCategory" component = {ServiceCategoryScreen} />
      <Stack.Screen name = "HomeTab" component = {HomeTab} />
    </Stack.Navigator>
  )
}

export default AuthStack
