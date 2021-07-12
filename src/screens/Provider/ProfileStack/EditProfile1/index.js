import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ParticularsForm from './ParticularsForm'

import KeyboardGradientView from '../../../../components/views/KeyboardGradientView'
import Card from '../../../../components/atoms/Card'
import colours from '../../../../styles/colours'

function index() {
  return (
    <KeyboardGradientView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image}/>
      <Text h2Style = {styles.header} h2>Edit your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Please provide your particulars</Text>
        <ParticularsForm />
      </Card>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 15
  },
  header: {
    marginTop: 100,
    color: colours.gray0
  },
  card: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '90%',
    marginTop: 10
  }
})
export default index
