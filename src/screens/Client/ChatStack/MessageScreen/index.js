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
import BottomOptions from '../../../../components/molecules/BottomOptions'

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

  const createAppointment = () => {
    firestore().collection('Clients').doc(auth().currentUser.uid).collection('Matches').doc(ID).get().
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
                onPress = {() => setShowApp(true)}/>
            </View>
          }
        />
        <MessageView messages = {messages} />
      <MessageInput onPress = {onSend} />
      <BottomOptions isVisible = {showApp} onPress = {() => setShowApp(false)}>
        <View style = {styles.buttonView}>
          <TertiaryButton
            title = "Create Appointment"
            style = {styles.button}
            titleStyle = {styles.buttonTitle}
            onPress = {() => {
              setShowApp(false)
              createAppointment()
            }}
          />
        </View>
      </BottomOptions>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20
  },
  buttonView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colours.gray0
  },
  button: {
    backgroundColor: colours.gray0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '400'
  }
})

export default index
