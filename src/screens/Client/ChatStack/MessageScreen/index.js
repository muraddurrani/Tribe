import React, { useState, useLayoutEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import MessageView from './MessageView'
import MessageInput from './MessageInput'

function index({ navigation, route }) {
  const {ID, msgRef, fullName, profilePhoto} = route.params
  const [messages, setMessages] = useState([])

  const onSend = (message) => {
    const newMsg = {
      text: message,
      createdAt: new Date(),
      userID: auth().currentUser.uid
    }
    setMessages([newMsg, ...messages])
    firestore().collection(msgRef).doc().set(newMsg)
    firestore().collection('Clients').doc(auth().currentUser.uid).collection('Chats').doc(ID).update({
      lastUpdated: new Date()
    })
    firestore().collection('Providers').doc(ID).collection('Chats').doc(auth().currentUser.uid).update({
      lastUpdated: new Date(), read: false
    })
  }
  
  useLayoutEffect(() => {
    const unsubscribe = firestore().collection(msgRef).orderBy('createdAt', 'desc').
      onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          text: doc.data().text,
          createdAt: new Date(doc.data().createdAt.seconds * 1000),
          userID: doc.data().userID
        })))
        firestore().collection('Clients').doc(auth().currentUser.uid).collection('Chats').doc(ID).update({ read: true })
      })

    return unsubscribe
  }, [])

  return (
    <ScreenView>
        <Header icon title = {fullName} profilePhoto = {profilePhoto} onPress = {() => navigation.goBack()} />
        <MessageView messages = {messages} />
      <MessageInput onPress = {onSend} />
    </ScreenView>
  )
}

export default index
