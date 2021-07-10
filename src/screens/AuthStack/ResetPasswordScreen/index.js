import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import KeyboardGradientView from '../../../components/views/KeyboardGradientView'
import Card from '../../../components/atoms/Card'
import ForgotPasswordForm from './ResetPasswordForm'

function index() {
  return (
    <KeyboardGradientView style = {styles.container}>
      <Image
        style = {styles.image}
        source = {require('../../../assets/images/Logo_Icon_White.png')}
      />
      <Card style = {styles.card}>
        <Text h2Style = {styles.header} h2> Reset your password</Text>
        <Text>Provide your email address to reset your password.</Text>
        <ForgotPasswordForm />
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
    marginBottom: 5
  },
  card: {
    marginTop: '40%',
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  }
})

export default index
