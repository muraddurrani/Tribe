import React from 'react'
import { Text } from 'react-native-elements'
import { Image, StyleSheet } from 'react-native'

import KeyboardGradientView from '../../../components/views/KeyboardGradientView'
import Card from '../../../components/atoms/Card'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

function index({ navigation }) {
  return (
    <KeyboardGradientView style = {styles.container}>
      <Image
        style = {styles.image}
        source = {require('../../../assets/images/Logo_Icon_White.png')}
      />
      <Card style = {styles.card}>
        <Text h2Style = {styles.header} h2> Reset your password</Text>
        <Text>An email has been sent to your email address to reset your password.</Text>
        <PrimaryButton
          title = "Go to Login"
          containerStyle = {styles.buttonContainer}
          buttonStyle = {styles.button}
          onPress = {() => navigation.popToTop()}
        />
      </Card>
    </KeyboardGradientView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    right: 15
  },
  header: {
    marginBottom: 5
  },
  card: {
    marginTop: '40%',
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 140,
    marginTop: 40
  },
  button: {
    width: 140
  }
})

export default index
