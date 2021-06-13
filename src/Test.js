import React from 'react'
import { View, ImageBackground, StyleSheet, Image } from 'react-native'
import { Text, Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardView from './components/atoms/KeyboardView'
import ScreenView from './components/atoms/ScreenView'
import PrimaryButton from './components/atoms/PrimaryButton'
import SecondaryButton from './components/atoms/SecondaryButton'
import TertiaryButton from './components/atoms/TertiaryButton'
import RegisterForm from './screens/AuthStack/RegisterScreen/RegisterForm'
import Header from './components/atoms/Header'

import theme from './styles/theme'

function Test() {
  return (
    <Header>Create an Account</Header>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
})

export default Test
