import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import RegisterForm from './RegisterForm'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import theme from '../../../styles/theme'

function index({ navigation }) {
  return (
    <KeyboardView contentContainerStyle = {styles.container}>
      <Text style = {styles.header} h3>Create an Account</Text>
        <RegisterForm />
        <TertiaryButton
                title = "Back to Login"
                onPress = {() => navigation.goBack()}
              />
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginBottom: theme.spacing.spacing2
  }
})

export default index
