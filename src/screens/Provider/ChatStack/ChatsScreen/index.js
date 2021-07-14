import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import ChatItem from './ChatItem'

function index() {
  const [chats, setChats] = useState(null)

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
      <FlatList
        data = {chats}
        renderItem = {render}
        keyExtractor = {(item, index) => index}
        showsVerticalScrollIndicator = {false}
      />
    </ScreenView>
  )
}

export default index
