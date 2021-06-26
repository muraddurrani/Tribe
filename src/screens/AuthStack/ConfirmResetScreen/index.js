import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import KeyboardScrollView from '../../../components/views/KeyboardScrollView'
import Card from '../../../components/atoms/Card'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

function index({ navigation }) {
  return (
    <KeyboardScrollView style = {styles.container}>
      <Image style = {styles.image} source = {require('../../../assets/images/Logo_Icon_White.png')}/>
      <Card style = {styles.card}>
        <Text h2Style = {styles.header} h2>Reset your password</Text>
        <Text>An email has been sent to your email address to reset your password.</Text>
        <PrimaryButton
          containerStyle = {styles.button}
          title = "Back to Login"
          onPress = {() => navigation.popToTop()}
        />
      </Card>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginBottom: 15
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 20
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '95%'
  },
  button: {
    alignSelf: 'center',
    marginTop: 30
  }
})

export default index
