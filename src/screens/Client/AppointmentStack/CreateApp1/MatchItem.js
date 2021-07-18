import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import { mapObjectToSentence } from '../../../../utilities/helper'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import colours from '../../../../styles/colours'

function MatchItem({item}) {
  const [data, setData] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    firestore().collection('Providers').doc(item.ID).get().
      then(doc => setData(doc.data()))
  }, [item])

  return (
    <ListItem style = {styles.list} containerStyle = {styles.listItem}
      onPress = {() => navigation.navigate('CA2', {ID: item.ID, photo: data.profilePhoto, name: data.fullName, service: mapObjectToSentence(item.attributes[0])[0]})}
    >
      <ProfileIcon photo = {data.profilePhoto} size = {60} />
      <ListItem.Content>
        <ListItem.Title style = {{fontWeight: 'bold'}}>{data.fullName}</ListItem.Title>
        <ListItem.Subtitle>{mapObjectToSentence(item.attributes[0])}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron size = {24}/>
    </ListItem>
  )
}

const styles = StyleSheet.create({
  list: {
    borderRadius: 5,
    margin: 5
  },
  listItem: {
    borderRadius: 5,
    backgroundColor: colours.gray0,
    elevation: 3
  }
})

export default MatchItem
