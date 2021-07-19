import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import ScreenView from '../../../../components/views/ScreenView'
import Header from '../../../../components/molecules/Header'
import MessageView from './MessageView'
import MessageInput from './MessageInput'
import TertiaryButton from '../../../../components/buttons/TertiaryButton'
import colours from '../../../../styles/colours'
import { mapObjectToSentence } from '../../../../utilities/helper'

function index({ navigation, route }) {
  const {ID, msgRef, fullName, profilePhoto} = route.params
  const [messages, setMessages] = useState([])
  const [showApp, setShowApp] = useState(false)

  const onSend = (message) => {
    const newMsg = {
      text: message,
      createdAt: new Date(),
      userID: auth().currentUser.uid
    }
    setMessages([newMsg, ...messages])
    firestore().collection(msgRef).doc().set(newMsg)
    firestore().collection('Providers').doc(auth().currentUser.uid).collection('Chats').doc(ID).update({
      lastUpdated: new Date()
    })
    firestore().collection('Clients').doc(ID).collection('Chats').doc(auth().currentUser.uid).update({
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
        firestore().collection('Providers').doc(auth().currentUser.uid).collection('Chats').doc(ID).update({ read: true })
      })

    return unsubscribe
  }, [])

  const createAppointment = () => {
    firestore().collection('Providers').doc(auth().currentUser.uid).collection('Matches').doc(ID).get().
      then(doc => {
        setShowApp(false)
        navigation.navigate('Appointment', { screen: 'CA2', params: {ID: ID, photo: profilePhoto, name: fullName, service: mapObjectToSentence(doc.data().attributes[0])[0]}})
      })
  }

  return (
    <ScreenView>
        <Header icon title = {fullName} profilePhoto = {profilePhoto} onPress = {() => navigation.goBack()}
          rightIcon = {
            <View style = {styles.view}>
              <Icon
                name = 'calendar-plus-o'
                type = 'font-awesome'
                color = {colours.gray0}
                containerStyle = {showApp ? styles.iconPressed : styles.icon}
                onPress = {() => setShowApp(!showApp)}/>
              {
                showApp && <TertiaryButton title = "Create Appointment" style = {styles.appButton} titleStyle = {styles.title} onPress = {() => createAppointment()} />
              }
            </View>
          }
        />
        <MessageView messages = {messages} />
      <MessageInput onPress = {onSend} />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20
  },
  icon: {
    padding: 4,
  },
  iconPressed: {
    marginLeft: 20,
    padding: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  appButton: {
    backgroundColor: colours.gray0,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 33,
    borderWidth: 1,
    borderColor: colours.gray2,
    zIndex: 1
  },
  title: {
    fontWeight: '400'
  }
})

export default index
