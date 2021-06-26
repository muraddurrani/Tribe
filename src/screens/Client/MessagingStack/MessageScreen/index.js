import React, { useState, useCallback, useContext, useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { GiftedChat } from 'react-native-gifted-chat'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../../../navigation/AuthProvider'
import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import Header from '../../../../components/molecules/Header'

import colours from '../../../../styles/colours'

function index({navigation, route}) {

  let msgData = route.params
  const [messages, setMessages] = useState([])
  const { userData, user } = useContext(AuthContext)

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {_id, createdAt, text, user} = messages[0]
    firestore().collection(msgData.messageReference).doc().set({ _id, createdAt, text, user })
    firestore().collection('Clients').doc(user._id).collection('Messages').doc(msgData.providerID).update({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp()})
    firestore().collection('Providers').doc(msgData.providerID).collection('Messages').doc(user._id).update({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp()})
  }, [])

  useLayoutEffect(() => {
    const unsubscribe = firestore().collection(msgData.messageReference).orderBy('createdAt', 'desc').
      onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))))

    return unsubscribe
  }, [])

  return (
    <KeyboardGradientView>
      <Header title = {msgData.parentFullName}
        icon = {<Icon name = "arrow-left" color = {colours.gray0} size = {30} containerStyle = {{marginRight: 15}} onPress = {() => navigation.goBack()}/>}
      />
      <View style = {styles.card}>
        <GiftedChat
          showAvatarForEveryMessage
          messages={messages}
          onSend={messages => onSend(messages)}
          user={ userData.profilePhoto ? { _id: user.uid, name: userData.parentFullName, avatar: userData.profilePhoto} : { _id: user.uid, name: userData.parentFullName }}
        />
      </View>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    paddingHorizontal: 20
  }
})

export default index
