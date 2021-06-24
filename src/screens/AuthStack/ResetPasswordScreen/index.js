import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import ForgotPasswordForm from './ResetPasswordForm'

import KeyboardScrollView from '../../../components/views/KeyboardScrollView'
import Card from '../../../components/atoms/Card'

function index() {
  return (
    <KeyboardScrollView style = {styles.container}>
      <Image style = {styles.image} source = {require('../../../assets/images/Logo_Icon_White.png')}/>
      <Card style = {styles.card}>
        <Text h2>Reset your password</Text>
        <ForgotPasswordForm />
      </Card>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '95%'
  }
})
export default index
