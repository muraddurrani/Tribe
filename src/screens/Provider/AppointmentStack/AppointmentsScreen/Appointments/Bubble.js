import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
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
      <Icon name = 'more-vertical' color = {colours.gray6} containerStyle = {styles.options} onPress = {() => setShowOptions(true)} />
      <Text h4>{name}</Text>
      <Text>{timeStart.toLocaleString().substring(11, 16)} - {timeEnd.toLocaleString().substring(11, 16)}</Text>
      <Text>{service}</Text>
      <View style = {styles.rowView}>
        <Icon name = "map-pin" color = {colours.gray6} size = {16} containerStyle = {styles.location}/>
        <Text>{location}</Text>
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
