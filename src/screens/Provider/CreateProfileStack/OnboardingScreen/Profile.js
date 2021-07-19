import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import colours from '../../../../styles/colours'

function Appointments() {
  return (
    <View style = {styles.container}>
      <View style = {styles.graphic}>
        <Icon name = 'user' color = {colours.primary} size = {70} containerStyle = {styles.icon}/>
        <Text h3Style = {styles.header} h3>Profile</Text>
      </View>
      <Text style = {styles.text}>Your profile displays your particulars, as well as the details of your service.</Text>
      <Text style = {styles.text}>Here, you can edit your personal information, change your profile picture, and revise your service details.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40
  },
  graphic: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  icon: {
    borderColor: colours.primary,
    borderWidth: 5,
    padding: 20,
    borderRadius: 60,
    marginBottom: 5
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 50
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'left'
  }
})

export default Appointments
