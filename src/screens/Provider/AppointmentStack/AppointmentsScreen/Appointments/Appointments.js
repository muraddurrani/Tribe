import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import Bubble from './Bubble'
import FeaturedBubble from './FeaturedBubble'
import CancelledBubble from './CancelledBubble'
import colours from '../../../../../styles/colours'

function Appointments() {
  const [data, setData] = useState([])

  const header = (
    <View style = {styles.rowView}>
      <View style = {{...styles.header, width: '20%'}}>
        <Text style = {styles.label}>Date</Text>
      </View>
      <View style = {{...styles.header, width: '70%'}}>
        <Text style = {styles.label}>Appointment</Text>
      </View>
    </View>
  )

  const render = (item) => {

    const start = new Date(item.item.timeStart.seconds * 1000)
    const end = new Date(item.item.timeEnd.seconds * 1000)

    const date = start.toLocaleString().substring(4, 10)
    const day = start.toLocaleString().substring(0, 3)

    return (
      <View style = {styles.rowView}>
        <View style = {{width: '20%'}}>
          <Text h4>{date}</Text>
          <Text>{day}</Text>
        </View>
        {
          item.item.cancelled
            ? <CancelledBubble ID = {item.item.ID} timeStart = {start} timeEnd = {end} location = {item.item.location} service = {item.item.service} />
            : item.index == 0
              ? <FeaturedBubble doc = {item.item.doc} ID = {item.item.ID} timeStart = {start} timeEnd = {end} location = {item.item.location} service = {item.item.service} />
              : <Bubble doc = {item.item.doc} ID = {item.item.ID} timeStart = {start} timeEnd = {end} location = {item.item.location} service = {item.item.service} />
        }
      </View>
    )
  }

  useEffect(() => {
    const unsubscribe = firestore().collection('Providers').doc(auth().currentUser.uid).collection('Appointments').orderBy('timeStart', 'asc').where('timeStart', '>=', new Date()).
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
          ? <Text h3Style = {styles.placeholder} h3>No upcoming appointments</Text>
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
  },
  placeholder: {
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default Appointments
