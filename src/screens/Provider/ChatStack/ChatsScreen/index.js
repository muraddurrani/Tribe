import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import Card from '../../../../components/atoms/Card'
import ChatItem from './ChatItem'

function index() {
  const [chats, setChats] = useState([])

  const render = ({item}) => (
    <ChatItem
      item = {item}
    />
  )

  useEffect(() => {
    const unsubscribe = firestore().collection('Providers').doc(auth().currentUser.uid).collection('Chats').orderBy('lastUpdated', 'desc').
      onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => doc.data()))
      })

    return unsubscribe
  }, [])


  return (
    <ScreenView>
      <Header title = "Chats" />
      {
        chats.length == 0
          ? (
            <Card style = {styles.card}>
              <Text h2 h2Style = {styles.header}>No matches!</Text>
              <Text>You don't have any matches right now.</Text>
            </Card>
          )
          : (
            <FlatList
              data = {chats}
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
  header: {
    marginBottom: 5
  }
})

export default index
