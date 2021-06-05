import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import LoginForm from './LoginForm'
import DetailsOverlay from './DetailsOverlay'
import theme from '../../../styles/theme'

function index({ navigation }) {

  const [show, setShow] = useState(false)

  return (
    <KeyboardView contentContainerStyle = {styles.container}>
      <Image
        containerStyle = {styles.imageContainer}
        style = {styles.image}
        source = {require('../../../assets/images/Logo_Ubuntu.png')}
      />
      <LoginForm />
      <View style = {styles.createAccView}>
        <Text>Don't have an account?</Text>
        <TertiaryButton
          containerStyle = {styles.signUpButton}
          title = "Sign up!"
          onPress = {() => navigation.navigate('Register')}
        />
      </View>
      <TertiaryButton
        containerStyle = {styles.detailsButton}
        title = "What is Tribe?"
        onPress = {() => setShow(true)}
      />
      <DetailsOverlay
        isVisible = {show}
        onPress = {() => setShow(false)}
      />
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: theme.spacing.spacing5
  },
  image: {
    height: 55,
    width: 180,
    resizeMode: 'contain'
  },
  forgotPassButton: {
    alignSelf: 'flex-end',
    width: 140
  },
  createAccView: {
    marginTop: theme.spacing.spacing1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  signUpButton: {
    width: 70
  },
  detailsButton: {
    marginTop: theme.spacing.spacing4
  }
})

export default index