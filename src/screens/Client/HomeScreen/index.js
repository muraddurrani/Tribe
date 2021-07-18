import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'

import GradientScrollView from '../../../components/views/GradientScrollView'
import HomeHeader from './HomeHeader'
import ProfileTile from './ProfileTile'
import MessageTile from './MessageTile'
import MatchTile from './MatchTile'
import NextAppTile from './NextAppTile'
import PendingAppTile from './PendingAppTile'

function index() {
  const { user, userData } = useContext(AuthContext)
  const [chats, setChats] = useState([])
  const [matches, setMatches] = useState([])
  const [nextApp, setNextApp] = useState([])
  const [pending, setPending] = useState([])

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

    const nextAppListener = firestore().collection('Clients').doc(user.uid).collection('Appointments').orderBy('timeStart', 'asc').
      where('timeStart', '>=', new Date()).where('cancelled', '==', false).limit(1).
        onSnapshot(snapshot => {
          if (snapshot) {
            setNextApp(snapshot.docs.map(doc => {
              return doc.data()
            }))
          }
        })

    const pendingListener = firestore().collection('Clients').doc(user.uid).collection('PendingAppointments').orderBy('timeStart', 'asc').
        onSnapshot(snapshot => {
          setPending(snapshot.docs.map(doc => {
            return doc.data()
          }))
        })

    return chatListener, matchListener, nextAppListener, pendingListener
  }, [])

  return (
    <GradientScrollView contentContainerStyle = {styles.container}>
      <HomeHeader title = "Home" />
      <ProfileTile photo = {userData.profilePhoto} name = {userData.parentFullName} />
      <MessageTile data = {chats} style = {styles.tile} />
      <MatchTile data = {matches} style = {styles.tile} />
      <PendingAppTile data = {pending} style = {styles.tile} />
      <NextAppTile data = {nextApp} style = {styles.tile}/>
    </GradientScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 30
  },
  tile: {
    marginTop: 10
  }
})

export default index
