import React, {useContext, useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'
import CreateProviderProfileStack from './Provider/CreateProviderProfileStack'
import CreateClientProfileStack from './Client/CreateClientProfileStack'
import ClientHomeTab from './Client/ClientHomeTab'
import ProviderHomeTab from './Provider/ProviderHomeTab'
import LoadingScreen from '../screens/AuthStack/LoadingScreen/index'

function Routes() {
  const {user, setUser, userData, setUserData } = useContext(AuthContext)

  const [userDocument, setUserDocument] = useState(null)
  const [newAccount, setNewAccount] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [profileComplete, setProfileComplete] = useState(null)

  //Renders the appropriate navigator for the user based on their account type, whether they have just signed up, and if they have completed their profile
  const roleSettings = (newAccount, profileComplete) => ({
    Clients: newAccount ? (
      <CreateClientProfileStack initialRouteName="CP0" />
    ) : profileComplete ? (
      <ClientHomeTab />
    ) : (
      <CreateClientProfileStack initialRouteName="IncompleteProfile" />
    ),
    Providers: newAccount ? (
      <CreateProviderProfileStack initialRouteName="CP0" />
    ) : profileComplete ? (
      <ProviderHomeTab />
    ) : (
      <CreateProviderProfileStack initialRouteName="IncompleteProfile" />
    ),
  })

  //Returns whether all necessary user data has loaded or not.
  function checkUserLoaded(newAccount, accountType, profileComplete, userData) {
    return (newAccount != null && accountType != null && profileComplete != null && userData != null)
  }

  //Listens for authentication state change and updates the user accordingly.
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user)

      if (user) {
        console.log('IN Here')
        const unsubscribe = firestore().collection('Users').doc(user.uid).onSnapshot(doc => {
          if (doc.exists) {
            console.log('doc exists: ' + doc)
            setUserDocument(doc)
            unsubscribe()
          }
        })
      } else {
        setUserDocument(null)
        setNewAccount(null)
        setAccountType(null)
        setProfileComplete(null)
      }

    })

    return subscriber
  }, [])

  /**
   * If the user document has been fetched from firestore and exists, updates state with necessary information for routing.
   */
  useEffect(() => {
    if (userDocument != null) {
      const data = userDocument.data()
      setNewAccount(data.newAccount)
      setProfileComplete(data.profileComplete)
      setAccountType(data.accType)

      if ((data.newAccount) == true) {
        firestore().collection('Users').doc(user.uid).update({ newAccount: false })
      }
  
      firestore().collection(data.accType).doc(user.uid).onSnapshot(doc => setUserData(doc.data()))
    }
  }, [userDocument])

  return (
    <NavigationContainer>
      {user ? (
        checkUserLoaded(newAccount, accountType, profileComplete, userData) ? (
          roleSettings(newAccount, profileComplete)[accountType]
        ) : (
          <LoadingScreen />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default Routes;
