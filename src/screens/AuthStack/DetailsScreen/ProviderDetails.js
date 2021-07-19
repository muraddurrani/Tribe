import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import colours from '../../../styles/colours'

function ProviderDetails() {
  return (
    <View style = {styles.container}>
      <Text h2>For professionals</Text>

      <View style = {styles.rowView}>
        <View style = {styles.textBox}>
          <Text h4>Create an account</Text>
          <Text>Set up your profile and tell us a bit about your service.</Text>
        </View>
        <Image source = {require('../../../assets/images/Details4.png')}/>
      </View>

      <View style = {{...styles.rowView, backgroundColor: colours.gray1}}>
      <Image source = {require('../../../assets/images/Details5.png')}/>
        <View style = {styles.textBox}>
          <Text h4>Match with clients</Text>
          <Text>Get connected with clients through Tribe’s matchmaking.</Text>
        </View>
      </View>

      <View style = {styles.rowView}>
        <View style = {styles.textBox}>
          <Text h4>Schedule appointments</Text>
          <Text>Tribe handles all communication and scheduling so you can focus on what you do best.</Text>
        </View>
        <Image source = {require('../../../assets/images/Details3.png')}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 20
  },
  rowView: {
    flexDirection: 'row',
    height: 180,
    alignItems: 'center'
  },
  textBox: {
    marginHorizontal: 10,
    width: 160
  },
  image: {
    width: 160,
    height: 160
  }
})

export default ProviderDetails
