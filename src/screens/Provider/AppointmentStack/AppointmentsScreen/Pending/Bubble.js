import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import colours from '../../../../../styles/colours'

function Bubble({ID, time, date, location, service}) {
  const [name, setName] = useState('')

  useEffect(() => {
    let ismounted = true
    firestore().collection('Clients').doc(ID).get().
      then(doc => {
        if (ismounted) {
          setName(doc.data().parentFullName)
        }
      })
    return () => { ismounted = false}
  }, [])

  return (
    <View style = {styles.container}>
      <Text h4>{name}</Text>
      <Text>{date}, {time}</Text>
      <Text>{service}</Text>
      <View style = {styles.rowView}>
        <Icon name = "map-pin" color = {colours.gray6} size = {16} containerStyle = {styles.location}/>
        <Text>{location}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 15,
    backgroundColor: colours.gray0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colours.gray2,
  },
  options: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  text: {
    color: colours.gray6
  },
  rowView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    marginRight: 5
  }
})

export default Bubble
