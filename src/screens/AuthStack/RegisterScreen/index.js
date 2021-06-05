import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Image, Text } from 'react-native-elements'
import KeyboardView from '../../../components/atoms/KeyboardView'
import RegisterForm from './RegisterForm'

function index2() {
  return (
    <KeyboardView>
      <ScrollView>
        <Text h2>Create Account</Text>
        <RegisterForm />
      </ScrollView>
    </KeyboardView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 55,
    width: 160,
    resizeMode: 'contain'
  }
})

export default index2
