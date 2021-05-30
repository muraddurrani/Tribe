import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import AuthStack from './AuthStack'
import HomeTab from './Client/HomeTab'
import ProfileStack from './Client/ProfileStack'
import { AuthContext } from './AuthProvider'

function Routes() {

  const { user, setUser } = useContext(AuthContext)
  const { isSignUp } = useContext(AuthContext)
  const { isClient } = useContext(AuthContext)
  const [initializing, setInitializing] = useState(true)

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, []);

  return (
    <NavigationContainer>
      {
        user
          ? isSignUp
            ? <ProfileStack />
            : <HomeTab />
          : <AuthStack />
      }
    </NavigationContainer> 
  )
}

export default Routes