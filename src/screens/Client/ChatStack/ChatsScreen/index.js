import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import Card from '../../../../components/atoms/Card'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import ChatItem from './ChatItem'

function index({ navigation }) {
  const [chats, setChats] = useState([])

  const render = ({item}) => (
    <ChatItem
      item = {item}
    />
  )

  useEffect(() => {
    const unsubscribe = firestore().collection('Clients').doc(auth().currentUser.uid).collection('Chats').orderBy('lastUpdated', 'desc').
      onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => doc.data()))
    })

    firestore().collection('Clients').doc(auth().currentUser.uid).collection('Matches').where('seen', '==', false).get().
      then((snapshot) => {
        snapshot.forEach(doc => {
          firestore().collection('Clients').doc(auth().currentUser.uid).collection('Matches').doc(doc.id).update( { seen: true })
        })
      })

    return unsubscribe
  }, [])


  return (
    <ScreenView>
      <Header title = "Chats" />
      {
        chats.length == 0
          ? (
            <Card style = {styles.card} >
              <Text h2 h2Style = {styles.header}>No matches!</Text>
              <Text>You don't have any matches right now.</Text>
              <PrimaryButton
                title = "Find Matches"
                containerStyle = {styles.buttonContainer}
                buttonStyle = {styles.button}
                onPress = {() => console.log('hi')}
              />
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
  },
  buttonContainer: {
    marginTop: 30,
    width: 160
  },
  button: {
    width: 160
  }
})

export default index
