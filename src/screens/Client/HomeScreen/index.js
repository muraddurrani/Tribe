import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'

import GradientScrollView from '../../../components/views/GradientView'
import HomeHeader from './HomeHeader'
import ProfileTile from './ProfileTile'
import MessageTile from './MessageTile'
import MatchTile from './MatchTile'

function index() {
  const { user, userData } = useContext(AuthContext)
  const [chats, setChats] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const chatListener = firestore().collection('Clients').doc(user.uid).collection('Chats').where('read', '==', false).
      onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => {
          return doc.data()
        }))
      })

      const matchListener = firestore().collection('Clients').doc(user.uid).collection('Matches').where('seen', '==', false).
      onSnapshot(snapshot => {
        setMatches(snapshot.docs.map(doc => {
          return doc.data()
        }))
      })

    return chatListener, matchListener
  }, [])

  return (
    <GradientScrollView style = {{alignItems: 'center'}}>
      <HomeHeader title = "Home" />
      <ProfileTile photo = {userData.profilePhoto} name = {userData.parentFullName} />
      <MessageTile data = {chats} style = {styles.tile} />
      <MatchTile data = {matches} style = {styles.tile} />
    </GradientScrollView>
  )
}

const styles = StyleSheet.create({
  tile: {
    marginTop: 10
  }
})

export default index
