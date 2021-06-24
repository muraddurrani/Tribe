import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthStack from './AuthStack';
import {AuthContext} from './AuthProvider';

import CreateProviderProfileStack from './Provider/CreateProviderProfileStack';
import CreateClientProfileStack from './Client/CreateClientProfileStack';
import ClientHomeTab from './Client/ClientHomeTab';
import ProviderHomeTab from './Provider/ProviderHomeTab';
import LoadingScreen from '../screens/AuthStack/LoadingScreen/index';

function Routes() {
  const {user, setUser, userData, setUserData, accType, setAccType} =
    useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(null);

  const [profileComplete, setProfileComplete] = useState(null);

  //Renders the appropriate navigator for the user based on their account type, whether they have just signed up, and if they have completed their profile
  const roleSettings = (isSignUp, profileComplete) => ({
    Clients: isSignUp ? (
      <CreateClientProfileStack initialRouteName="CP0" />
    ) : profileComplete ? (
      <ClientHomeTab />
    ) : (
      <CreateClientProfileStack initialRouteName="IncompleteProfile" />
    ),
    Providers: isSignUp ? (
      <CreateProviderProfileStack initialRouteName="CP0" />
    ) : profileComplete ? (
      <ProviderHomeTab />
    ) : (
      <CreateProviderProfileStack initialRouteName="IncompleteProfile" />
    ),
  });

  // Checks that all necessary date to route the user has loaded
  const checkLoaded = () => {
    return (
      isSignUp != null &&
      accType != null &&
      profileComplete != null &&
      userData != null
    );
  };

  //Sets account type of new user in Firestore for future log-ins
  const handleSignUp = async user => {
    setIsSignUp(true);
    if (accType != null) {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .set({accType, profileComplete: false});
      setProfileComplete(false);
      firestore()
        .collection(accType)
        .doc(user.uid)
        .onSnapshot(doc => setUserData(doc.data()));
    }
  };

  //Fetches necessary user data for routing upon login
  const handleLogin = async (user, data) => {
    setIsSignUp(false);
    firestore()
      .collection(data.accType)
      .doc(user.uid)
      .onSnapshot(doc => setUserData(doc.data()));
    setAccType(data.accType);
    setProfileComplete(data.profileComplete);
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUser(user);

      if (user == null) {
        setProfileComplete(null);
        setUserData(null);
        setAccType(null);
        setIsSignUp(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            handleLogin(user, doc.data());
          } else {
            handleSignUp(user);
          }
        });
    }
  }, [accType, user]);

  return (
    <NavigationContainer>
      {user ? (
        checkLoaded() ? (
          roleSettings(isSignUp, profileComplete)[accType]
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
