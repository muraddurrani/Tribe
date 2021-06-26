import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import GradientScreenView from '../../../../components/views/GradientScreenView'
import Header from '../../../../components/molecules/Header'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'

import colours from '../../../../styles/colours'

function index({ navigation }) {

  const [chats, setChats] = useState(null)

  const fetchChats = async () => {
    return await firestore().collection('Providers').doc(auth().currentUser.uid).collection('Messages').orderBy('lastUpdated', 'desc').get()
  }

  useFocusEffect(
    useCallback(() => {
      fetchChats().then((snapshot) => {
        setChats(snapshot.docs.map(doc => doc.data()))
      })

      return () => {
        setChats(null)
      }
    }, [])
  )

  const render = ({item}) => (
    <ListItem
      bottomDivider
      onPress = {() => navigation.navigate('Message', item)}
    >
      <ProfileIcon photo = {item.clientProfile}/>
      <ListItem.Content>
        <ListItem.Title>{item.parentFullName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size = {24} />
    </ListItem>
  )

  return (
    <GradientScreenView>
    <Header title = "My Chats" />
    <View style = {styles.card}>
      <FlatList
        data = {chats}
        renderItem = {render}
        keyExtractor = {(item, index) => index}
      />
    </View>
  </GradientScreenView>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colours.gray0,
    borderTopLeftRadius: 30,
    paddingVertical: 30
  }
})

export default index
