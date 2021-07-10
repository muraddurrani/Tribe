import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import colours from '../../../styles/colours'

function ClientDetails() {
  return (
    <View style = {styles.container}>
      <Text h2>For parents</Text>

      <View style = {styles.rowView}>
        <View style = {styles.textBox}>
          <Text h4>Create an account</Text>
          <Text>Set up your profile and tell us about your childs needs and preferences.</Text>
        </View>
        <Image source = {require('../../../assets/images/DetailsGraphic1.png')}/>
      </View>

      <View style = {{...styles.rowView, backgroundColor: colours.gray1}}>
      <Image source = {require('../../../assets/images/DetailsGraphic2.png')}/>
        <View style = {styles.textBox}>
          <Text h4>Find professionals</Text>
          <Text>Search for professionals from a variety of fields and match with those you like best.</Text>
        </View>
      </View>

      <View style = {styles.rowView}>
        <View style = {styles.textBox}>
          <Text h4>Get connected!</Text>
          <Text>Let Tribe facilitate all your communication and scheduling needs.</Text>
        </View>
        <Image source = {require('../../../assets/images/DetailsGraphic3.png')}/>
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

export default ClientDetails
