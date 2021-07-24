import React, { useState } from 'react'
import { StyleSheet, LogBox } from 'react-native'
import { Input, ListItem, Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import KeyboardScreenView from '../../../../components/views/KeyboardScreenView'
import ProfileIcon from '../../../../components/molecules/ProfileIcon'
import Header from '../../../../components/molecules/Header'
import DatePicker from '../../../../components/molecules/DatePicker'
import TimePicker from '../../../../components/molecules/TimePicker'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'
import colours from '../../../../styles/colours'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
 ])

function index({navigation, route}) {
  const {prevAppointment, ID, photo, name, service, startTime, endTime, location } = route.params
  const [date, setDate] = useState(startTime)
  const [start, setStart] = useState(startTime)
  const [end, setEnd] = useState(endTime)
  const [loc, setLoc] = useState(location)
  const [loading, setLoading] = useState(false)

  const createAppointment = async (timeStart, timeEnd) => {
    let docRef = ''

    if (prevAppointment) {
      await firestore().collection('Providers').doc(auth().currentUser.uid).collection('Appointments').doc(prevAppointment).delete()
      await firestore().collection('Clients').doc(ID).collection('Appointments').doc(prevAppointment).delete()
    }

    await firestore().collection('Providers').doc(auth().currentUser.uid).collection('AppointmentRequests').add({
      ID: ID,
      location: loc,
      service: service,
      timeStart,
      timeEnd
    }).then(doc => docRef = doc.id)

    await firestore().collection('Clients').doc(ID).collection('PendingAppointments').doc(docRef).set({
      ID: auth().currentUser.uid,
      location: loc,
      service: service,
      timeStart,
      timeEnd
    })
  } 

  return (
    <KeyboardScreenView style = {styles.container}>
      <Header icon title = "Create Appointment" onPress = {() => navigation.goBack()} />
      <ListItem style = {styles.list} containerStyle = {styles.listItem}>
        <ProfileIcon photo = {photo} size = {60} />
        <ListItem.Content>
          <ListItem.Title style = {{fontWeight: 'bold'}}>{name}</ListItem.Title>
          <ListItem.Subtitle>{service}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <DatePicker
        style = {styles.input}
        width = {320}
        label = "Select Date"
        placeholder = "Date"
        minDate = {new Date()}
        defaultValue = {startTime ? startTime.toDateString().substring(4) : ''}
        onSelect = {(val) => setDate(val)}
      />
      <TimePicker
        style = {styles.input}
        width = {320}
        label = "Select Start Time"
        placeholder = "Start"
        defaultValue = {startTime ? startTime.toLocaleString().substring(11, 16) : ''}
        onSelect = {(val) => setStart(val)}
      />
      <TimePicker
        style = {styles.input}
        width = {320}
        label = "Select End Time"
        placeholder = "End"
        defaultValue = {endTime ? endTime.toLocaleString().substring(11, 16) : ''}
        onSelect = {(val) => setEnd(val)}
      />
      <Input
        containerStyle = {styles.input}
        label = "Enter Location"
        placeholder = "Location"
        value = {loc}
        rightIcon = {<Icon name = 'map-pin'/>}
        onChangeText = {(text) => setLoc(text)}
      />

      <PrimaryButton
        title = "Send Invite"
        loading = {loading}
        containerStyle = {styles.buttonContainer}
        buttonStyle = {styles.button}
        disabled = {!date || !start || !end || !loc}
        onPress = {() => {
          setLoading(true)
          const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), start.getHours(), start.getMinutes(), 0, 0)
          const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.getHours(), end.getMinutes(), 0, 0)

          createAppointment(startTime, endTime)
          navigation.navigate('Appointments')
        }}
      />
    </KeyboardScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  list: {
    borderRadius: 5,
    margin: 5,
    marginTop: 20,
    width: '90%'
  },
  listItem: {
    borderRadius: 5,
    backgroundColor: colours.gray0,
    elevation: 3
  },
  input: {
    marginTop: 30
  },
  buttonContainer: {
    width: 160,
    marginTop: 30
  },
  button: {
    width: 160
  }
})

export default index
