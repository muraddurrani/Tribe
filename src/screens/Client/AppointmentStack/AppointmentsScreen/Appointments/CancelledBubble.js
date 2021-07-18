import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import colours from '../../../../../styles/colours'

function Bubble({ID, timeStart, timeEnd, location, service}) {
  const [name, setName] = useState('')

  useEffect(() => {
    let ismounted = true
    firestore().collection('Providers').doc(ID).get().
      then(doc => {
        if (ismounted) {
          setName(doc.data().fullName)
        }
      })
    return () => { ismounted = false}
  }, [])


  return (
    <View style = {styles.container}>
      <Text h4Style = {styles.cancelled} h4>(Cancelled)</Text>
      <Text h4Style = {styles.text} h4>{name}</Text>
      <Text style = {styles.text}>{timeStart.toLocaleString().substring(11, 16)} - {timeEnd.toLocaleString().substring(11, 16)}</Text>
      <Text style = {styles.text}>{service}</Text>
      <View style = {styles.rowView}>
        <Icon name = "map-pin" color = {colours.gray5} size = {16} containerStyle = {styles.location}/>
        <Text style = {styles.text}>{location}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: colours.gray1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colours.gray2
  },
  cancelled: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  text: {
    color: colours.gray5
  },
  rowView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    marginRight: 5
  },
  rightView: {
    position: 'absolute',
    right: 15,
    top: 15
  }
})
export default Bubble
