import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ScreenView from '../../../../components/atoms/ScreenView'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
import theme from '../../../../styles/theme'
import LoadingScreen from '../LoadingScreen/index'
import ResultCard from './ResultCard'

function index({ navigation, route }) {

  let query = route.params

  const [childAge, setChildAge] = useState()
  const [loading, setLoading] = useState(true)
  const [matches, setMatches] = useState()

  async function filter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
  }

  const getAge = (seconds) => {
    const dobMS = seconds * 1000
    const age = new Date() - dobMS
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365))
  }

  const generateResults = async () => {
    let providers = await firestore().collection('SearchProviders').doc('0').collection('Answers').doc(query[0]).get().
      then(doc => doc.data().IDs)

    providers = await filter(providers, async provider => {
      const doc = await firestore().collection('Providers').doc(provider).get()
      const responses = doc.data().Responses
      let match = true

      for (let i = 1; i <= 4; i++) {
        let pass = false
        const choices = query[i]
        const response = responses[i]

        for (const choice of Object.keys(choices)) {
          if (_.has(response, choice)) {
            pass = true
            break
          }
        }

        if (pass == false) {
          match = false
          break
        }
      }
      return match
    })

    const age = await firestore().collection('Clients').doc(auth().currentUser.uid).get().
      then(doc => getAge(doc.data().childDOB.seconds))
    
    setChildAge(age)

    providers = await filter(providers, async provider => {
      const doc = await firestore().collection('Providers').doc(provider).get()
      const response = doc.data().Responses[5]

      let match = false
      if (age <= 10) {
        if (_.has(response, '0')) {
          match = true
        }
      }
      else if (age >= 10 && age <= 19) {
        if (_.has(response, '1')) {
          match = true
        }
      }
      else if (age >= 19 && age <= 21) {
        if (_.has(response, '2')) {
          match = true
        }
      }
      return match
    })

    providers = await Promise.all(providers.map(async provider => {
      const doc = await firestore().collection('Providers').doc(provider).get()
      return {id: provider, data: doc.data()}
    }))
    setMatches(providers)
    setLoading(false)
  }

  useEffect(() => {
    generateResults()
  }, [])

  async function sendMatch(providerID) {
    console.log(providerID)
    const clientID = auth().currentUser.uid
    const senderDoc = await firestore().collection('Clients').doc(clientID).get()
    const senderData = senderDoc.data()

    const providerDoc = firestore().collection('Providers').doc(providerID).collection('PendingMatches').doc(clientID)

    providerDoc.set({
      id: clientID,
      childName: senderData.childName,
      gender: senderData.childGender,
      age: childAge,
      parentName: senderData.parentName,
      service: query[0],
      sessionTypes: Object.values(query[1]),
      locations: Object.values(query[2]),
      days: Object.values(query[3]),
      times: Object.values(query[4]),
      frequency: Object.values(query[5]),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    if (senderData.image) {
      providerDoc.update({image: senderData.image})
    }
  }

  const render = ({item}) => (
      <ResultCard provider = {item.data} onPress = {() => sendMatch(item.id)}/>
  )

  if (loading) {
    return <LoadingScreen />
  }
  
  return (
    <ScreenView style = {styles.container}>
      <Text h2Style = {styles.header} h2>Search Results</Text>
      <FlatList
        style = {styles.list}
        contentContainerStyle = {styles.listContent}
        data = {matches}
        renderItem = {render}
        keyExtractor = {(item, index) => index}
        showsVerticalScrollIndicator = {false}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.gray1,
    padding: theme.spacing.spacing3,
  },
  header: {
    marginBottom: theme.spacing.spacing2
  },
  list: {
    width: '100%'
  },
  listContent: {
    alignItems: 'center'
  },
  card: {
    width: 320,
    backgroundColor: theme.colours.gray0,
    padding: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colours.gray2,
    marginBottom: theme.spacing.spacing3
  },
  carouselContainer: {
    height: 200,
    width: 220,
    alignSelf: 'center'
  },
  image: {
    height: 200,
    width: 200,
  },
  divider: {
    height: 2,
    backgroundColor: theme.colours.gray2,
    marginHorizontal: theme.spacing.spacing3,
    marginTop: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing3
  },
  name: {
    marginBottom: theme.spacing.spacing1
  },
  text: {
    lineHeight: 18,
    marginBottom: theme.spacing.spacing1
  },
  buttonContainer: {
    marginTop: theme.spacing.spacing3,
    alignSelf: 'center'
  }
})
export default index
