import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, Icon, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

import colours from '../../../../../styles/colours'

function Bubble({doc, ID, timeStart, timeEnd, location, service}) {
  const [name, setName] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const navigation = useNavigation()

  const reschedule = () => {
    firestore().collection('Clients').doc(ID).get().
    then(snapshot => {
      const data = snapshot.data()
      navigation.navigate('CA2',
        {prevAppointment: doc, ID: ID, photo: data.profilePhoto, name: data.parentFullName, service: service, startTime: timeStart, endTime: timeEnd, location: location})
    })
  }

  const cancel = () => {
    firestore().collection('Providers').doc(auth().currentUser.uid).collection('Appointments').doc(doc).update( {cancelled: true })
    firestore().collection('Clients').doc(ID).collection('Appointments').doc(doc).update( {cancelled: true })
  }

  const options = [
    {
      title: 'Reschedule',
      onPress: () => reschedule()
    },
    {
      title: 'Cancel Appointment',
      onPress: () => cancel()
    }]

    const render = ({item}) => (
      <ListItem
        onPress = {() => item.onPress()}
        containerStyle = {{backgroundColor: colours.gray0, paddingVertical: 10}}
        style = {{borderBottomColor: colours.gray3, borderBottomWidth: 1}}
      >
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )

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
      <Icon name = 'more-vertical' color = {colours.gray6} containerStyle = {showOptions ? styles.pressed : styles.options} onPress = {() => setShowOptions(!showOptions)} />
      <Text h4>{name}</Text>
      <Text>{timeStart.toLocaleString().substring(11, 16)} - {timeEnd.toLocaleString().substring(11, 16)}</Text>
      <Text>{service}</Text>
      <View style = {styles.rowView}>
        <Icon name = "map-pin" color = {colours.gray6} size = {16} containerStyle = {styles.location}/>
        <Text>{location}</Text>
      </View>
      {showOptions && (
        <FlatList
          style = {styles.list}
          data = {options}
          keyExtractor = {(item, index) => index}
          renderItem = {render}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: 180,
    position: 'absolute',
    top: 46,
    right: 15,
    zIndex: 1,
    borderWidth: 1,
    borderColor: colours.gray3,
    borderBottomWidth: 0,
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: colours.gray0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colours.gray2
  },
  options: {
    position: 'absolute',
    padding: 3,
    right: 15,
    top: 15,
    zIndex: 1
  },
  pressed: {
    position: 'absolute',
    padding: 3,
    right: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
  },
  rightView: {
    position: 'absolute',
    right: 15,
    top: 15
  }
})

export default Bubble
