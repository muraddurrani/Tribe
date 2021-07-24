import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import HomeTile from '../../../components/molecules/HomeTile'
import colours from '../../../styles/colours'

function MessageTile({data, style}) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [day, setDay] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [service, setService] = useState('')
  const [mentions, setMentions] = useState(0)
  const [app, setApp] = useState(false)
  const navigation = useNavigation()
  
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
      setMentions(data.length - 1)
      
      firestore().collection('Providers').doc(featured.ID).get().
        then(doc => {
          setName(doc.data().fullName)
        })
      setApp(true)      
    } else {
      setApp(false)
    }
  }, [data])

  return (
    <HomeTile
      icon = {<Icon name = "calendar" color = {colours.gray7} />}
      title = "Pending Appointments"
      style = {style}
    >
      {
        app
          ? (
            <TouchableOpacity onPress = {() => navigation.navigate('Appointment', { screen: 'Appointments', params: {start: 1} })}>
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
                {
                  mentions > 0 && 
                    <View style = {styles.mentions}>
                      <Text>+{mentions}</Text>
                    </View> 
                }
              </View>
            </TouchableOpacity>
          )
          : (
            <Text style = {styles.text}>No pending appointments</Text>
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
  },
  mentions: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})

export default MessageTile
