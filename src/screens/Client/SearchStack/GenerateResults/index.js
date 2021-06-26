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
    generateResults().then(result => navigation.navigate('DisplayResults', {result, query}))
  }, [])

  async function generateResults() {
    let providers = await firestore().collection('SearchProviders').doc('0').collection('Answers').doc(Object.keys(query[0])[0]).get()
    providers = providers.data().IDs

    let attributesArray = []

    providers = await filterAsync(providers, async (provider) => {
      const doc = await firestore().collection('Providers').doc(provider).get()
      const responses = doc.data().Responses
      let match = true
      let matchedAttributes = {}


      for (let i = 1; i <= 4; i++) {
        let pass = false
        const choices = query[i]
        const providerResponse = responses[i]
        let matchedAnswers = []

        for (const choice of Object.keys(choices)) {
          if (_.has(providerResponse, choice)) {
            pass = true
            matchedAnswers.push(providerResponse[choice])
          }
        }

        if (pass == false) {
          match = false
          break
        } else {
          matchedAttributes[i] = matchedAnswers
        }
      }      

      if (match == true) {
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

      if (match == true) {
        attributesArray.push(matchedAttributes)
      }

      return match
    })

    return providers.map((provider, index) => {
      return {id: provider, data: attributesArray[index]}
    })
  }

  return (
    <LoadingScreen />
  )
}

export default index
