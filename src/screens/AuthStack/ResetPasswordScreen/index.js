import React from 'react'
import { Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import ForgotPasswordForm from './ResetPasswordForm'

function index({ navigation }) {
  return (
    <KeyboardView>
      <Text h3>Reset your password</Text>
      <ForgotPasswordForm />
    </KeyboardView >
  )
}

export default index
