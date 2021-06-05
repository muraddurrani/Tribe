import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import ScreenView from '../../../components/atoms/KeyboardView'
import PrimaryButton from '../../../components/atoms/PrimaryButton'

function index({ navigation }) {
  return (
    <ScreenView>
      <Text h3>Reset your password</Text>
      <Text>An email has been sent to your email address to reset your password.</Text>
      <PrimaryButton
        containerStyle = {styles.buttonContainer}
        title = "Return to Login"
        onPress = {() => navigation.popToTop()}
      />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 140
  }
})

export default index
