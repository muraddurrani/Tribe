import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/AuthStack/LoginScreen/index'
import ResetPasswordScreen from '../screens/AuthStack/ResetPasswordScreen/index'
import ConfirmResetScreen from '../screens/AuthStack/ConfirmResetScreen/index'
import RegisterScreen from '../screens/AuthStack/RegisterScreen'
import ProfileScreen from '../screens/Client/HomeTab/ProfileScreen/index'
import Test from '../Test'

const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName = "Login" screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Login" component = {LoginScreen} />
      <Stack.Screen name = "ResetPassword" component = {ResetPasswordScreen} />
      <Stack.Screen name = "ConfirmReset" component = {ConfirmResetScreen} />
      <Stack.Screen name = "Register" component = {RegisterScreen} />
      <Stack.Screen name = "Profile" component = {ProfileScreen} />
      <Stack.Screen name = "Test" component = {Test} />
    </Stack.Navigator>
  )
}

export default AuthStack
