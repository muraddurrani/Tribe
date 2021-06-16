import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import LoadingScreen from '../../../screens/AuthStack/LoadingScreen/index'
import CompleteProfileStack from './CompleteProfileStack'
import IncompleteProfleStack from './IncompleteProfileStack'

function ProfileRoutes() {

  const [complete, setComplete] = useState(null)

  const fetchData = async () => {
    const doc = await firestore().collection('Providers').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  useEffect(() => {
    fetchData().then(data => {
      if (data.description) {
        setComplete(true)
      } else {
        setComplete(false)
      }
    })
  }, [])

  if (complete == null) {
    return <LoadingScreen />
  } else if (complete) {
    return <CompleteProfileStack />
  } else {
    return <IncompleteProfleStack />
  }
}

export default ProfileRoutes
