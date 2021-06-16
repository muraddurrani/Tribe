import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import LoadingScreen from '../../../screens/AuthStack/LoadingScreen/index'
import CompleteProfileStack from './CompleteProfileStack'
import IncompleteProfleStack from './IncompleteProfileStack'

function ProfileStack() {

  const [complete, setComplete] = useState(null)

  const fetchData = async () => {
    const doc = await firestore().collection('Clients').doc(auth().currentUser.uid).get()
    const data = doc.data()
    return data
  }

  useEffect(() => {
    fetchData().then(data => {
      if (data.childName) {
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

export default ProfileStack
