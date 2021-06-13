import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import AuthStack from './AuthStack'
import CPProfileStack from './Provider/CPProfileStack'
import ProviderHomeTab from './Provider/ProviderHomeTab'
import Test from '../Test'
import { AuthContext } from './AuthProvider'

function Routes() {

  const { user, setUser, isSignUp, accType } = useContext(AuthContext)

  function onAuthStateChanged(user) {
    setUser(user)
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, []);

  return (
    <NavigationContainer>
      {(
        user
          ? accType == 'Clients'
            ? isSignUp
              ? <Test />
              : <Test />
            : isSignUp
              ? <CPProfileStack />
              : <ProviderHomeTab />
          : <AuthStack />
      )}
    </NavigationContainer> 
  )
}

export default Routes