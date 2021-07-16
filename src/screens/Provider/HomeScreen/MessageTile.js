import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import HomeTile from '../../../components/molecules/HomeTile'
import ProfileIcon from '../../../components/molecules/ProfileIcon'
import colours from '../../../styles/colours'

function MessageTile({data, style}) {
  const [newMessage, setNewMessage] = useState(false)
  const [photo, setPhoto] = useState()
  const [name, setName] = useState('')
  const [mentions, setMentions] = useState(0)
  const navigation = useNavigation()
  
  useEffect(() => {
    if (data.length > 0) {
      setMentions(data.length - 1)
      const featured = data[0]
      firestore().collection('Clients').doc(featured.ID).get().
        then(doc => {
          setPhoto(doc.data().profilePhoto)
          setName(doc.data().parentFullName)
        })
      setNewMessage(true)      
    } else {
      setNewMessage(false)
    }
  }, [data])

  return (
    <HomeTile
      icon = {<Icon name = "message-square" color = {colours.gray7} />}
      title = "Messages"
      style = {style}
    >
      {
        newMessage
          ? (
            <ListItem style = {styles.itemContainer} containerStyle = {styles.item} onPress = {() => navigation.navigate('Chats')}>
              <ProfileIcon photo = {photo} size = {40}/>
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
              </ListItem.Content>
                {mentions > 0 && <Text>+{mentions} more</Text>}
            </ListItem>
          )
          : (
            <Text style = {styles.text}>No new messages</Text>
          )
      }
    </HomeTile>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  item: {
    backgroundColor: colours.gray1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 15
  }
})

export default MessageTile
