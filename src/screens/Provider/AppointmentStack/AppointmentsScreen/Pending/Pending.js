import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import Bubble from './Bubble'
import colours from '../../../../../styles/colours'

function Pending() {
  const [data, setData] = useState([])

  const header = (
      <View style = {{...styles.header}}>
        <Text style = {styles.label}>Pending Appointments</Text>
      </View>
  )

  const render = ({item}) => {

    const acceptRequest = async () => {
      let docRef = ''

      await firestore().collection('Providers').doc(auth().currentUser.uid).collection('Appointments').add({
        ID: item.ID,
        location: item.location,
        service: item.service,
        timeStart: new Date(item.timeStart.seconds * 1000),
        timeEnd: new Date(item.timeEnd.seconds * 1000),
        cancelled: false
      }).then(doc => docRef = doc.id)

      firestore().collection('Clients').doc(item.ID).collection('Appointments').doc(docRef).set({
        ID: auth().currentUser.uid,
        location: item.location,
        service: item.service,
        timeStart: new Date(item.timeStart.seconds * 1000),
        timeEnd: new Date(item.timeEnd.seconds * 1000),
        cancelled: false
      })

      firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingAppointments').doc(item.doc).delete()
      firestore().collection('Clients').doc(item.ID).collection('AppointmentRequests').doc(item.doc).delete()
    }

    const rejectRequest = async () => {
      firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingAppointments').doc(item.doc).delete()
      firestore().collection('Clients').doc(item.ID).collection('AppointmentRequests').doc(item.doc).delete()
    }

    const start = new Date(item.timeStart.seconds * 1000).toLocaleString()
    const end = new Date(item.timeEnd.seconds * 1000).toLocaleString()

    const date = start.substring(0, 10)
    const timeStart = start.substring(11, 16)
    const timeEnd = end.substring(11, 16)
    const time = timeStart + ' - ' + timeEnd

    return (
      <View style = {styles.rowView}>
        <View style = {{width: '20%', justifyContent: 'center'}}>
          <Icon name = 'check' color = 'green' containerStyle = {styles.icon} onPress = {() => acceptRequest()}/>
          <Icon name = 'x' color = {colours.midpoint3} containerStyle = {styles.icon} onPress = {() => rejectRequest()}/>
        </View>
        <Bubble time = {time} date = {date} ID = {item.ID} location = {item.location} service = {item.service}/>
      </View>

    )
  }

  useEffect(() => {
    const unsubscribe = firestore().collection('Providers').doc(auth().currentUser.uid).collection('PendingAppointments').orderBy('timeStart', 'asc').where('timeStart', '>=', new Date()).
      onSnapshot(snapshot => {
        setData(snapshot.docs.map(doc => ({
          doc: doc.id, ...doc.data()
        })))
      })

    return unsubscribe
  }, [])
  
  return (
    <View>
      {
        data.length == 0
          ? <Text h3Style = {styles.placeholder} h3>No pending appointments</Text>
          : <FlatList
              contentContainerStyle = {{paddingBottom: 70}}
              data = {data}
              keyExtractor = {(item, index) => index}
              renderItem = {render}
              ListHeaderComponent = {header}
              showsVerticalScrollIndicator = {false}
            />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    color: colours.gray5
  },
  header: {
    height: 30,
    marginBottom: 10
  },
  icon: {
    marginVertical: 10
  },
  placeholder: {
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default Pending
