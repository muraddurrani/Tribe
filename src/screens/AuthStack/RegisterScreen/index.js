import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import RegisterForm from './RegisterForm'
import KeyboardScrollView from '../../../components/views/KeyboardScrollView'
import TertiaryButton from '../../../components/buttons/TertiaryButton'
import Card from '../../../components/atoms/Card'

import colours from '../../../styles/colours'

function index({ navigation }) {
  return (
    <KeyboardScrollView style = {styles.container}>
      <Image style = {styles.logo}
        source = {require('../../../assets/images/Logo_Ubuntu_White.png')}
      />
      <Text h1>Create an account</Text>
      <Card style = {styles.card}>
        <RegisterForm />
      </Card>
      <TertiaryButton
        title = "Back to Login"
        style = {styles.loginButton}
        titleStyle = {styles.loginButtonStyle}
        onPress = {() => navigation.goBack()}
      />
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 170,
    resizeMode: 'contain',
    marginTop: '15%',
    marginBottom: 35
  },
  card: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginTop: 10
  },
  loginButton: {
    position: 'absolute',
    bottom: 30
  },
  loginButtonStyle: {
    color: colours.gray0
  }
})

export default index
