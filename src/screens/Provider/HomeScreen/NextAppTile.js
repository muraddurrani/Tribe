import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

import HomeTile from '../../../components/molecules/HomeTile'
import colours from '../../../styles/colours'

function MessageTile({data, style}) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [day, setDay] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [service, setService] = useState('')
  const [app, setApp] = useState(false)
  
  useEffect(() => {
    if (data.length > 0) {
      const featured = data[0]
      const timeStart = new Date(featured.timeStart.seconds * 1000).toLocaleString()
      const timeEnd = new Date(featured.timeEnd.seconds * 1000).toLocaleString()
      setDate(timeStart.substring(4, 10))
      setDay(timeStart.substring(0, 3))
      setStart(timeStart.substring(11,16))
      setEnd(timeEnd.substring(11, 16))
      setService(featured.service)
      
      firestore().collection('Clients').doc(featured.ID).get().
        then(doc => {
          setName(doc.data().parentFullName)
        })
      setApp(true)      
    } else {
      setApp(false)
    }
  }, [data])

  return (
    <HomeTile
      icon = {<Icon name = "bell" color = {colours.gray7} />}
      title = "Next Appointment"
      style = {style}
    >
      {
        app
          ? (
            <View style = {styles.rowView}>
              <View style = {styles.dateView}>
                <Text h4>{date}</Text>
                <Text>{day}</Text>
              </View>
              <View>
                <Text>{name}</Text>
                <Text>{start} - {end}</Text>
                <Text>{service}</Text>
              </View>
            </View>
          )
          : (
            <Text style = {styles.text}>No upcoming appointments</Text>
          )
      }
    </HomeTile>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  dateView: {
    alignItems: 'flex-end',
    marginRight: 30
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 15
  }
})

export default MessageTile
