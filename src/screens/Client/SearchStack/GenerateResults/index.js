import React, { useState, useEffect, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'

import { getAge, filterAsync } from '../../../../utilities/helper'
import { AuthContext } from '../../../../navigation/AuthProvider'
import LoadingScreen from '../LoadingScreen/index'

function index({ navigation, route }) {
  let query = route.params
  const { userData } = useContext(AuthContext)
  const [age, setAge] = useState()

  useEffect(() => {
    setAge(getAge(userData.childDOB.seconds))
    fetchInitialResults().then(arr => filterProviders(arr)).then(result => navigation.navigate('DisplayResults', result))
  }, [])

  async function filterProviders(arr) {
    let filteredArr = []

    for (const ID of arr) {
      const result = await checkProvider(ID)
      if (result) {
        filteredArr.push(result)
      }
    }

    return filteredArr
  }

  async function checkProvider(ID) {
    const doc = await firestore().collection('Providers').doc(ID).get()
    const responses = doc.data().Responses
    let match = true

    let attributes = {0: query[0]}

    for (let i = 1; i <= 4; i++) {
      let pass = false
      const clientChoices = query[i]
      const providerResponses = responses[i]
      let matchedResponses = {}

      for (const choice of Object.keys(clientChoices)) {
        if (_.has(providerResponses, choice)) {
          pass = true
          matchedResponses = {...matchedResponses, [choice]: clientChoices[choice]}
        }
      }

      if (pass) {
        attributes[i] = matchedResponses
      } else {
        match = false
        break
      }
    }

    if (match) {
      const supportedAge = responses[5]
      if (age <= 10) {
        if (!_.has(supportedAge, '0')) {
          match = false
        }
      }
      else if (age >= 10 && age <= 19) {
        if (!_.has(supportedAge, '1')) {
          match = false
        }
      }
      else if (age >= 19 && age <= 21) {
        if (!_.has(supportedAge, '2')) {
          match = false
        }
      }
    }

    if (match) {
      return {ID, attributes, frequency: Object.values(query[5])[0]}
    } else {
      return false
    }
  }

  async function fetchInitialResults() {
    let doc = await firestore().collection('SearchProviders').doc('0').collection('Answers').doc(Object.keys(query[0])[0]).get()
    let initArray = doc.data().IDs
    return initArray
  }

  return (
    <LoadingScreen />
  )
}

export default index