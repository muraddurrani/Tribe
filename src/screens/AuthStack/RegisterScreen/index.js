import React from 'react'
import { StyleSheet } from 'react-native'
import KeyboardView from '../../../components/atoms/KeyboardView'
import ScreenView from '../../../components/atoms/ScreenView'
import RegisterForm from './RegisterForm'
import TertiaryButton from '../../../components/atoms/TertiaryButton'
import theme from '../../../styles/theme'
import Header from '../../../components/atoms/Header'

function index({ navigation }) {
  return (
    <KeyboardView style = {styles.container}>
      <Header>Create account</Header>
      <ScreenView style = {styles.card} >
        <RegisterForm />
        <TertiaryButton
          title = "Back to Login"
          onPress = {() => navigation.goBack()}
        />
      </ScreenView>
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colours.primary
  },
  card: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center'
  }
})

export default index
