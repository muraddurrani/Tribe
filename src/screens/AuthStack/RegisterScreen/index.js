import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import TertiaryButton from '../../../components/buttons/TertiaryButton'
import KeyboardGradientView from '../../../components/views/KeyboardGradientView'
import Card from '../../../components/atoms/Card'
import RegisterForm from './RegisterForm'
import colours from '../../../styles/colours'

function index({ navigation }) {
  return (
    <KeyboardGradientView style = {styles.container}>
      <Image
        style = {styles.logo}
        source = {require('../../../assets/images/Logo_Text_White.png')}
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
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 147,
    resizeMode: 'contain',
    marginTop: '10%',
    marginBottom: 30
  },
  card: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '90%',
    marginTop: 10
  },
  loginButton: {
    marginTop: 30
  },
  loginButtonStyle: {
    color: colours.gray0
  }
})

export default index
