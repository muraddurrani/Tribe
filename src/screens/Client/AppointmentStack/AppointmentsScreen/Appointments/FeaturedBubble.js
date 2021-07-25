import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, Icon, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import BottomOptions from '../../../../../components/molecules/BottomOptions'
import TertiaryButton from '../../../../../components/buttons/TertiaryButton'

import colours from '../../../../../styles/colours'

function Bubble({doc, ID, timeStart, timeEnd, location, service}) {
  const [name, setName] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const navigation = useNavigation()

  const reschedule = () => {
    firestore().collection('Providers').doc(ID).get().
    then(snapshot => {
      const data = snapshot.data()
      navigation.navigate('CA2',
        {prevAppointment: doc, ID: ID, photo: data.profilePhoto, name: data.fullName, service: service, startTime: timeStart, endTime: timeEnd, location: location})
    })
  }

  const cancel = () => {
    firestore().collection('Clients').doc(auth().currentUser.uid).collection('Appointments').doc(doc).update( {cancelled: true })
    firestore().collection('Providers').doc(ID).collection('Appointments').doc(doc).update( {cancelled: true })
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
      <Icon name = 'more-vertical' color = {colours.gray0} containerStyle = {styles.options} onPress = {() => setShowOptions(true)} />
      <Text h4Style = {styles.text} h4>{name}</Text>
      <Text style = {styles.text}>{timeStart.toLocaleString().substring(11, 16)} - {timeEnd.toLocaleString().substring(11, 16)}</Text>
      <Text style = {styles.text}>{service}</Text>
      <View style = {styles.rowView}>
        <Icon name = "map-pin" color = {colours.gray0} size = {16} containerStyle = {styles.location}/>
        <Text style = {styles.text}>{location}</Text>
      </View>
      <BottomOptions isVisible = {showOptions} onPress = {() => setShowOptions(false)}>
        <View style = {styles.buttonView}>
          <TertiaryButton
            title = "Reschedule Appointment"
            style = {styles.button}
            titleStyle = {styles.buttonTitle}
            onPress = {() => {
              setShowOptions(false)
              reschedule()
            }}
          />
          <TertiaryButton
            title = "Cancel Appointment"
            style = {styles.button}
            titleStyle = {styles.buttonTitle}
            onPress = {() => {
              setShowOptions(false)
              cancel()
            }}
          />
        </View>
      </BottomOptions>
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
    backgroundColor: colours.primary,
    borderRadius: 10,
  },
  text: {
    color: colours.gray0
  },
  options: {
    position: 'absolute',
    padding: 3,
    right: 15,
    top: 15,
    zIndex: 1
  },
  rowView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    marginRight: 5
  },
  buttonView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colours.gray0
  },
  button: {
    backgroundColor: colours.gray0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '400'
  }
})
export default Bubble
