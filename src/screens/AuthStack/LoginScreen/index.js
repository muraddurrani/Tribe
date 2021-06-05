import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import LoginForm from './LoginForm'
import DetailsOverlay from './DetailsOverlay'

function index({ navigation }) {

  const [show, setShow] = useState(false)

  return (
    <KeyboardView>
      <Image
        style = {styles.image}
        source = {require('../../../assets/images/Logo_Ubuntu.png')}
      />
      <LoginForm />
      <TertiaryButton
        containerStyle = {styles.forgotPassButton}
        title = "Forgot Password?"
        onPress = {() => navigation.navigate('ResetPassword')}
      />
      <View style = {styles.createAccView}>
        <Text>Don't have an account?</Text>
        <TertiaryButton
          containerStyle = {styles.signUpButton}
          title = "Sign up!"
          onPress = {() => navigation.navigate('Register')}
        />
      </View>
      <TertiaryButton title = "What is Tribe?" onPress = {() => setShow(true)}/>
      <DetailsOverlay
        isVisible = {show}
        onPress = {() => setShow(false)}
      />
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 55,
    width: 160,
    resizeMode: 'contain'
  },
  forgotPassButton: {
    width: 140
  },
  createAccView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  signUpButton: {
    width: 70
  }
})

export default index