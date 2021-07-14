import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ListItem, Icon, Text } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import colours from '../../../../styles/colours'

function ChatItem({item}) {
  const [data, setData] = useState({})
  const [elapsed, setElapsed] = useState('')
  const [subtitle, setSubtitle] = useState()
  const navigation = useNavigation()

  const getTimeElapsed = (seconds) => {
    const hrs = ((new Date() - (seconds * 1000)) / 36e5)
    if (hrs < (1/60)) {
      return 'Just now'
    } else if (hrs < 1) {
      return Math.round(hrs * 60) + 'm'
    } else if (hrs < 23) {
      return Math.round(hrs) + 'h'
    } else if (hrs < 168) {
      return Math.round(hrs / 24) + 'd'
    } else {
      return Math.round(hrs / 168) + 'w'
    }
  }

  useEffect(() => {
    firestore().collection('Providers').doc(item.ID).get().
      then(doc => setData(doc.data()))

    setElapsed(getTimeElapsed(item.lastUpdated.seconds))

    firestore().collection(item.msgRef).orderBy('createdAt', 'desc').limit(1).get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setSubtitle(snapshot.docs[0].data().text.substring(0, 30))
        } else {
          setSubtitle('Say hi!')
        }
      })

  }, [item])

  return (
    <ListItem
      containerStyle = {styles.listItem}
      onPress = {() => navigation.navigate('Message', {'ID': item.ID, 'msgRef': item.msgRef, fullName: data.fullName, profilePhoto: data.profilePhoto})}
    >
      <ProfileIcon photo = {data.profilePhoto} size = {50} />
      <ListItem.Content>
        <ListItem.Title style = {item.read ? styles.readText : styles.unreadText}>{data.fullName}</ListItem.Title>
        <ListItem.Subtitle style = {item.read ? styles.readText : styles.unreadText}>{subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style = {item.read ? styles.readText : styles.unreadText}>{elapsed}</Text>
      {!item.read && <Icon name = "circle" type = {'font-awesome'} size = {16} color = {colours.midpoint1}/>}
    </ListItem>
  )
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10
  },
  unreadText: {
    fontWeight: '700'
  },
  readText: {
    fontWeight: '400'
  }
})

export default ChatItem
