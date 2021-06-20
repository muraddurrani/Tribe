import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AuthStack from './AuthStack'
import CPProfileStack from './Provider/CreateProviderProfileStack'
import CCProfileStack from './Client/CreateClientProfileStack'
import ClientHomeTab from './Client/ClientHomeTab'
import ProviderHomeTab from './Provider/ProviderHomeTab'
import LoadingScreen from '../screens/AuthStack/LoadingScreen/index'
import { AuthContext } from './AuthProvider'

function Routes() {

  const { user, setUser, isSignUp, setIsSignUp, accType, setAccType } = useContext(AuthContext)

  const [profileComplete, setProfileComplete] = useState(null)

    const roleSettings = (isSignUp, profileComplete) => ({
      Clients: isSignUp
        ? <CCProfileStack initialRouteName = "CP0"/>
        : profileComplete
          ? <ClientHomeTab />
          : <CCProfileStack initialRouteName = "IncompleteProfile" />,
      Providers: isSignUp
        ? <CPProfileStack initialRouteName = "CP0"/>
        : profileComplete
          ? <ProviderHomeTab />
          : <CPProfileStack initialRouteName = "IncompleteProfile" />
    })

    const checkLoaded = () => {
      return (isSignUp != null && accType != null && profileComplete != null)
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(user => {
        setUser(user)

        if (user != null) {
          firestore().collection('Users').doc(user.uid).get().
            then(doc => {
              if (doc.exists) {
                setAccType(doc.data().accType)
                setIsSignUp(false)
                setProfileComplete(doc.data().profileComplete)
              } else {
                firestore().collection('Users').doc(user.uid).set({accType, profileComplete: false})
                setProfileComplete(false)
              }
            })
        }
      })
      return subscriber
    }, [accType])


  return (
    <NavigationContainer>
      {(
        user
          ? checkLoaded()
            ? roleSettings(isSignUp, profileComplete)[accType]
            : <LoadingScreen />
          : <AuthStack />
      )}
    </NavigationContainer> 
  )
}

export default Routes