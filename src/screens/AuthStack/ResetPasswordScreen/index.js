import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import ForgotPasswordForm from './ResetPasswordForm'
import theme from '../../../styles/theme'

function index() {
  return (
    <KeyboardView contentContainerStyle = {styles.container}>
      <Text style = {styles.header} h3>Reset your password</Text>
      <ForgotPasswordForm />
    </KeyboardView >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }, header: {
    marginHorizontal: theme.spacing.spacing3,
    paddingTop: theme.spacing.spacing3,
    paddingLeft: theme.spacing.spacing3,
    backgroundColor: theme.colours.gray1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
})
export default index
