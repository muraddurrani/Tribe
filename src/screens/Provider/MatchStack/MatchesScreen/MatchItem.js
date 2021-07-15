import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ListItem, Icon, Text, Divider } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import { getAge } from '../../../../utilities/helper'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import colours from '../../../../styles/colours'

function MatchItem({item, index}) {
  const [data, setData] = useState({})
  const [age, setAge] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    firestore().collection('Clients').doc(item.ID).get().
      then(doc => {
        setData(doc.data())
        setAge(getAge(doc.data().childDOB.seconds))
      })

  }, [item])

  return (
    <ListItem
      style = {styles.container}
      containerStyle = {index % 2 == 0 ? styles.listItemEven : styles.listItemOdd}
      onPress = {() => navigation.navigate('MatchDetails', {ID: item.ID, age: age, data: data, attributes: item.attributes, frequency: item.frequency})}
    >
      <ProfileIcon photo = {data.profilePhoto} size = {70} style = {styles.profile} />
      <Divider orientation = "vertical" width = {1} color = {colours.gray0} />
      <ListItem.Content>
        <ListItem.Title style = {styles.header}>{data.childFullName}</ListItem.Title>
        <ListItem.Subtitle style = {styles.text}>Child of {data.parentFullName}</ListItem.Subtitle>
        <ListItem.Subtitle style = {styles.text}>{age} years old</ListItem.Subtitle>
      </ListItem.Content>
        <ListItem.Chevron size = {30} color = {colours.gray0}/>
    </ListItem>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginBottom: 5
  },
  listItemEven: {
    paddingVertical: 15,
    backgroundColor: colours.primary,
    borderRadius: 5
  },
  listItemOdd: {
    paddingVertical: 15,
    backgroundColor: colours.midpoint2,
    borderRadius: 5
  },
  profile: {
    borderWidth: 2,
    borderColor: colours.gray0
  },
  header: {
    color: colours.gray0,
    fontWeight: '700',
    marginBottom: 5
  },
  text: {
    color: colours.gray0
  }
})

export default MatchItem
