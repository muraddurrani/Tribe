import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ParticularsForm from './ParticularsForm'

import KeyboardScrollView from '../../../../components/views/KeyboardScrollView'
import Card from '../../../../components/atoms/Card'

function index() {
  return (
    <KeyboardScrollView style = {styles.container}>
      <Image source = {require('../../../../assets/images/Logo_Icon_White.png')} style = {styles.image} />
      <Text h1Style = {styles.header} h1>Create your profile</Text>
      <Card style = {styles.card}>
        <Text h4>Please provide your child's particulars</Text>
        <ParticularsForm />
      </Card>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  header: {
    marginTop: '20%'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  card: {
    paddingVertical: 40,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center'
  }
})

export default index
