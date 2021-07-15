import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import Card from '../../../../components/atoms/Card'
import MatchItem from './MatchItem'

function index() {
  const [matches, setMatches] = useState([])

  const render = (item) => (
    <MatchItem
      item = {item.item} index = {item.index}
    />
  )

  useEffect(() => {
    const unsubscribe = firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingMatches').orderBy('createdAt', 'desc').
      onSnapshot(snapshot => {
        setMatches(snapshot.docs.map(doc => doc.data()))
      })

    return unsubscribe
  }, [])

  return (
    <ScreenView>
      <Header title = "Pending Matches" />
      {
        matches.length == 0
          ? (
            <Card style = {styles.card}>
              <Text h2 h2Style = {styles.header}>No pending matches!</Text>
              <Text>You don't have any pending matches.</Text>
              <Text>Check again soon!</Text>
            </Card>
          )
          : (
            <FlatList
              style = {styles.list}
              data = {matches}
              renderItem = {render}
              keyExtractor = {(item, index) => index}
              showsVerticalScrollIndicator = {false}
            />
          )
      }

    </ScreenView>
  )
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginTop: '45%',
    width: '90%',
    padding: 30,
    alignItems: 'center'
  },
  list: {
    marginTop: 20,
    alignSelf: 'center',
    width: '95%'
  },
  header: {
    marginBottom: 5
  }
})

export default index
